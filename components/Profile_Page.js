
import { StyleSheet, Text, View, StatusBar, Pressable, ActivityIndicator, Alert, TouchableOpacity, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
// import { TouchableOpacity } from '@gorhom/bottom-sheet';

const Profile_Page = () => {
    const [roleCheck, setRoleCheck] = useState('');
    const [getProfiledata, setProfiledata] = useState({});
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation()


    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        const getLocation = async () => {

            try {

                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
            } catch (error) {
                setErrorMsg('Error getting location');
                // console.error(error);
            }
        };

        getLocation();
    }, []);

    const getDirections = async (latitude, longitude) => {
        try {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        } catch (error) {
            // console.error(error);
            Alert.alert('Failed to open directions');
        }
    };

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
    }




    // Function to format keys
    const formatKey = (key) => {
        return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    async function fetchData() {
        console.log('hjhj')

        const role = await AsyncStorage.getItem('rolecheck');
        setRoleCheck(role);
        try {
            const jwtToken = await AsyncStorage.getItem('jwtToken');

            const url = 'https://shubhansh7777.pythonanywhere.com/account/';

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });

            if (!response.ok) {

                console.log(response.status, 'response')
                if (response.status === 401) {
                    navigation.navigate('LoginPage')

                }
                // throw new Error(`HTTP error! status: ${response.status}`);
                else if (response.detail === 'Session expired. Please login again.') {
                    navigation.navigate('LoginPage')
                }

            }

            const data = await response.json();


            const dateObj = new Date(data.date_joined);
            const year = dateObj.getFullYear().toString().slice(-2); // Extract last two digits of the year
            const formattedDate = `${dateObj.toLocaleDateString('en-GB')} Time: ${dateObj.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit'
            })}`;

            data.date_joined = formattedDate;

            setProfiledata(data);

            // console.log(data); // Process the fetched data here
        } catch (error) {
            // console.error(error);
        }
        setLoading(false);
    }


    const handlerlogout = async () => {


        try {
            const jwtToken = await AsyncStorage.getItem('jwtToken');

            const url = 'https://shubhansh7777.pythonanywhere.com/account/logout/'; // Replace with your API endpoint

            const options = {
                method: 'POST', // Specify POST method
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({}), // Stringify the data object for the request body
            };

            const response = await fetch(url, options);

            if (!response.ok) {
                const errorticket = await response.json();

            }

            const responseDatalogout = await response.json();
            // console.log(responseDatalogout,'jwtToken')

            await AsyncStorage.removeItem('jwtToken');
            await AsyncStorage.removeItem('rolecheck');


            navigation.navigate('LoginPage')


            // console.log(ticketCreate,'ticketCreate')


        } catch (error) {
            // console.error('POST request failed:', error);

        }


    }


    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    // Extract and format data for display
    const dataArray = Object.entries(getProfiledata);

    // Separate out the address object if it exists
    const address = getProfiledata.address || {};
    const filteredData = dataArray.filter(([key]) => key !== "address");
    const stringifiedData = filteredData.map(([key, value]) => [formatKey(key), String(value)]);

    // Add address fields
    const addressEntries = Object.entries(address).map(([key, value]) => [formatKey(`${key}`), String(value)]);
    const allData = stringifiedData.concat(addressEntries);

    const handleredirectPassowrd = () => {
        navigation.navigate('Change Password')
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {loading ? (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator animating={loading} size="large" color="#0000ff" />
                </View>
            ) : (<ScrollView  >
                <View style={styles.modalView}>
                    {allData.map((item, index) => {
                        const [header, value] = item;
                        return (
                            <View key={index} style={styles.dataRow}>
                                {header && <Text style={styles.header}>{header.toUpperCase()}</Text>}
                                <Text style={styles.value}>: {value.toUpperCase()}</Text>
                            </View>
                        );
                    })}


                </View>

                <View style={{
                    flex: 1, flexDirection: 'row', marginLeft: responsiveHeight(4), marginBottom: responsiveHeight(3), borderBottomWidth: 1,
                    borderColor: '#eee',
                }}>
                    <Text style={[styles.header]}>Live Location</Text>
                    <TouchableOpacity onPress={() => getDirections(location.coords.latitude, location.coords.longitude)} >
                        <Text style={{ color: "#0386D0", fontSize: responsiveFontSize(1.4) }}>
                            :GetDirection</Text>
                    </TouchableOpacity>
                </View>



                <View style={styles.containerPassword}>

                    <Pressable style={styles.ChangePassword} onPress={() => handleredirectPassowrd()}>
                        <Text style={{ color: "#ffffff", fontSize: responsiveFontSize(1.2) }}>CHANGE  PASSWORD</Text>
                    </Pressable>
                </View>

                {/* <View style={styles.containerPassword}>

                    <Pressable style={styles.ChangePassword} onPress={async () => {
                        await AsyncStorage.clear();
                        navigation.navigate('LoginPage');
                    }}>
                        <Text style={{ color: "#ffffff", fontSize: responsiveFontSize(1.2) }}>Logout</Text>
                    </Pressable>
                </View> */}




            </ScrollView>)}





        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    modalView: {
        padding: 20,
    },
    dataRow: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    header: {
        fontWeight: 'bold',
        width: responsiveHeight(11),
        fontSize: responsiveFontSize(1.3),
    },
    value: {
        flexWrap: 'wrap',
        width: responsiveHeight(27),
        fontSize: responsiveFontSize(1)
    },
    containerPassword: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: responsiveHeight(2)
    },
    ChangePassword: {
        backgroundColor: '#0386D0',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        padding: responsiveHeight(1),
        borderRadius: responsiveHeight(0.5)

    }
});

export default Profile_Page;















// const styles = StyleSheet.create({
//     modalView: {
//         margin: responsiveHeight(2),
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: responsiveHeight(2),
//         // alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//           width: 0,
//           height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//       },
// })