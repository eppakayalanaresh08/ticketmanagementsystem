// import { StyleSheet, Text, View, StatusBar, Pressable, ActivityIndicator, Alert, TouchableOpacity, Linking, Image, TextInput, RefreshControl } from 'react-native';
// import React, { useState, useEffect, useCallback } from 'react';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { ScrollView } from 'react-native-gesture-handler';
// import { MaterialCommunityIcons, Ionicons, Octicons } from '@expo/vector-icons';
// import * as Updates from 'expo-updates';

// const Profile_Page = () => {
//     // const [loading, setLoading] = useState(false);
//     const [roleCheck, setRoleCheck] = useState('');
//     const [getProfiledata, setProfiledata] = useState({
//         address: {},
//     });
//     const [loading, setLoading] = useState(false);
//     const [refreshing, setRefreshing] = useState(false);
//     const navigation = useNavigation();

//     const [errorMsg, setErrorMsg] = useState(null);

//     const [updateAvailable, setUpdateAvailable] = useState(false);








//       const checkForUpdates = async () => {
//         setLoading(true);
//         try {
//           // Check if an update is available
//           const update = await Updates.checkForUpdateAsync();
//           if (update.isAvailable) {
//             setUpdateAvailable(true);
//             Alert.alert(
//               'Update Available',
//               'A new update is available. Do you want to update now?',
//               [
//                 {
//                   text: 'Update',
//                   onPress: async () => {
//                     await Updates.fetchUpdateAsync();
//                     Updates.reloadAsync();
//                   }
//                 },
//                 { text: 'Later' }
//               ]
//             );
//           } else {
//             Alert.alert('No updates available');
//           }
//         } catch (e) {
//           console.error('Error checking for updates:', e);
//         } finally {
//           setLoading(false);
//         }
//       };
    

//     // Function to format keys
//     const formatKey = (key) => {
//         return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
//     };

//     // Fetch data function
//     const fetchData = async () => {
//         setLoading(true);

//         const role = await AsyncStorage.getItem('rolecheck');
//         setRoleCheck(role);
//         try {
//             const jwtToken = await AsyncStorage.getItem('jwtToken');

//             const url = 'https://shubhansh7777.pythonanywhere.com/account/';

//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     Authorization: `Bearer ${jwtToken}`,
//                 }
//             });

//             if (!response.ok) {
//                 console.log(response.status, 'response');
//                 if (response.status === 401) {
//                     navigation.navigate('LoginPage');
//                 } else if (response.detail === 'Session expired. Please login again.') {
//                     navigation.navigate('LoginPage');
//                 }
//             }

//             const data = await response.json();
//             const dateObj = new Date(data.date_joined);
//             const year = dateObj.getFullYear().toString().slice(-2); // Extract last two digits of the year
//             const formattedDate = `${dateObj.toLocaleDateString('en-GB')} Time: ${dateObj.toLocaleTimeString('en-GB', {
//                 hour: '2-digit',
//                 minute: '2-digit'
//             })}`;
//             data.date_joined = formattedDate;

//             setProfiledata(data);
//             console.log(data, 'hjj');

//         } catch (error) {
//             // console.error(error);
//         } finally  {
//             // console.error(error);
//             setLoading(false);
        
//             setRefreshing(false); 
//         }

//     };

//     // Handle logout function
//     const handlerlogout = async () => {
//         try {
//             const jwtToken = await AsyncStorage.getItem('jwtToken');
//             const url = 'https://shubhansh7777.pythonanywhere.com/account/logout/';
//             const options = {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${jwtToken}`,
//                 },
//                 body: JSON.stringify({}),
//             };

//             const response = await fetch(url, options);

//             if (!response.ok) {
//                 const errorticket = await response.json();
//             }

//             const responseDatalogout = await response.json();
//             await AsyncStorage.removeItem('jwtToken');
//             await AsyncStorage.removeItem('rolecheck');
//             navigation.navigate('LoginPage');

//         } catch (error) {
//             // console.error('POST request failed:', error);
//         }
//     };

//     // Use callback to fetch data on focus
//     useFocusEffect(
//         useCallback(() => {
//             fetchData();
//         }, [])
//     );

//     // Pull-to-refresh function
//     const onRefresh = useCallback(() => {
//         setRefreshing(true);
//         fetchData();
//     }, []);

//     // Redirect to change password
//     const handleredirectPassowrd = () => {
//         navigation.navigate('Change Password');
//     };


//     if (loading) {
//         return (
//           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <ActivityIndicator size="large" color="#0000ff" />
//           </View>
//         );
//       }

//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView
//                 refreshControl={
//                     <RefreshControl
//                         refreshing={refreshing}
//                         onRefresh={onRefresh}
//                         tintColor="#8B78FF" // Customize refresh control color
//                     />
//                 }
//             >


//                 <View style={styles.profileContainer}>
//                     <View>
//                         <Image source="" />
//                     </View>

//                     <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: responsiveHeight(5) }}>
//                         <Image source={require('../assets/user.png')} style={styles.image} />
//                         <Text style={styles.nametext}>{getProfiledata.first_name} {getProfiledata.last_name}</Text>
//                         <Text style={styles.roleText}>{getProfiledata.role}</Text>
//                     </View>
//                     <View style={[{ marginHorizontal: responsiveHeight(0.5) }, styles.eachinputCard]}>
//                         <Text style={styles.InputText}>
//                             Your Email
//                         </Text>
//                         <View style={styles.inputElement}>
//                             <MaterialCommunityIcons name="email-outline" size={24} color="black" />
//                             <TextInput style={styles.inputinsideElement} value={getProfiledata.email} editable={false} />
//                         </View>
//                     </View>
//                     <View style={[{ marginHorizontal: responsiveHeight(0.5) }, styles.eachinputCard]}>
//                         <Text style={styles.InputText}>
//                             Phone Number
//                         </Text>
//                         <View style={styles.inputElement}>
//                             <Ionicons name="call-outline" size={24} color="black" />
//                             <TextInput style={styles.inputinsideElement} value={String(getProfiledata.mobile)} editable={false} />
//                         </View>
//                     </View>
//                     <View style={[{ flex: 1, flexDirection: 'row', width: '100%' }, styles.eachinputCard]}>
//                         <View style={styles.eachInputElement}>
//                             <Text style={styles.InputText}>
//                                 City
//                             </Text>
//                             <TextInput style={[styles.inputinsideElement, styles.inputElement]} value={getProfiledata.address.city || ''} editable={false} />
//                         </View>
//                         <View style={styles.eachInputElement}>
//                             <Text style={styles.InputText}>
//                                 District
//                             </Text>
//                             <TextInput style={[styles.inputinsideElement, styles.inputElement]} value={getProfiledata.address.district || ''} editable={false} />
//                         </View>
//                     </View>
//                     <View style={[{ flex: 1, flexDirection: 'row', width: '100%' }, styles.eachinputCard]}>
//                         <View style={styles.eachInputElement}>
//                             <Text style={styles.InputText}>
//                                 PinCode
//                             </Text>
//                             <TextInput style={[styles.inputinsideElement, styles.inputElement]} value={String(getProfiledata.address.pincode || '')} editable={false} />
//                         </View>
//                         <View style={styles.eachInputElement}>
//                             <Text style={styles.InputText}>
//                                 State
//                             </Text>
//                             <TextInput style={[styles.inputinsideElement, styles.inputElement]} value={getProfiledata.address.state || ''} editable={false} />
//                         </View>
//                     </View>
//                     <View style={styles.containerPassword}>
//                         <Pressable style={styles.ChangePassword} onPress={handleredirectPassowrd}>
//                             <Text style={{ color: "#8B78FF", fontSize: responsiveFontSize(1.2) }}>CHANGE PASSWORD</Text>
//                         </Pressable>




//                         <Pressable style={styles.ChangePassword} onPress={checkForUpdates}>
//                             <Text style={{ color: "#8B78FF", fontSize: responsiveFontSize(1.2) }}>Check for Updates</Text>
//                         </Pressable>

//                         {/* <Button title="Check for Updates" onPress={checkForUpdates} /> */}






//                     </View>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };










import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Alert,
    Image,
    TextInput,
    RefreshControl,
    Pressable
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as Updates from 'expo-updates';

const Profile_Page = () => {
    const [roleCheck, setRoleCheck] = useState('');
    const [getProfiledata, setProfiledata] = useState({
        address: {},
    });
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const navigation = useNavigation();

    const checkForUpdates = async () => {
        setLoading(true);
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                setUpdateAvailable(true);
                Alert.alert(
                    'Update Available',
                    'A new update is available. Do you want to update now?',
                    [
                        {
                            text: 'Update',
                            onPress: async () => {
                                await Updates.fetchUpdateAsync();
                                Updates.reloadAsync();
                            }
                        },
                        { text: 'Later' }
                    ]
                );
            } else {
                Alert.alert('No updates available');
            }
        } catch (e) {
            console.error('Error checking for updates:', e);
        } finally {
            setLoading(false);
        }
    };

    const formatKey = (key) => {
        return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const role = await AsyncStorage.getItem('rolecheck');
            setRoleCheck(role);

            const jwtToken = await AsyncStorage.getItem('jwtToken');
            const url = 'https://shubhansh7777.pythonanywhere.com/account/';

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });

            if (!response.ok) {
                console.log(response.status, 'response');
                if (response.status === 401) {
                    navigation.navigate('LoginPage');
                } else if (response.detail === 'Session expired. Please login again.') {
                    navigation.navigate('LoginPage');
                }
                return;
            }

            const data = await response.json();
            const dateObj = new Date(data.date_joined);
            const formattedDate = `${dateObj.toLocaleDateString('en-GB')} Time: ${dateObj.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit'
            })}`;
            data.date_joined = formattedDate;

            setProfiledata(data);
            console.log(data, 'Profile data fetched successfully');

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

 

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData();
    }, []);

    const handleredirectPassowrd = () => {
        navigation.navigate('Change Password');
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#8B78FF"
                    />
                }
            >
                <View style={styles.profileContainer}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: responsiveHeight(5) }}>
                        <Image source={require('../assets/user.png')} style={styles.image} />
                        <Text style={styles.nametext}>{getProfiledata.first_name} {getProfiledata.last_name}</Text>
                        <Text style={styles.roleText}>{getProfiledata.role}</Text>
                    </View>

                    <View style={[{ marginHorizontal: responsiveHeight(0.5) }, styles.eachinputCard]}>
                        <Text style={styles.InputText}>Your Email</Text>
                        <View style={styles.inputElement}>
                            <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                            <TextInput style={styles.inputinsideElement} value={getProfiledata.email} editable={false} />
                        </View>
                    </View>

                    <View style={[{ marginHorizontal: responsiveHeight(0.5) }, styles.eachinputCard]}>
                        <Text style={styles.InputText}>Phone Number</Text>
                        <View style={styles.inputElement}>
                            <Ionicons name="call-outline" size={24} color="black" />
                            <TextInput style={styles.inputinsideElement} value={String(getProfiledata.mobile)} editable={false} />
                        </View>
                    </View>

                    <View style={[{ flex: 1, flexDirection: 'row', width: '100%' }, styles.eachinputCard]}>
                        <View style={styles.eachInputElement}>
                            <Text style={styles.InputText}>City</Text>
                            <TextInput style={[styles.inputinsideElement, styles.inputElement]} value={getProfiledata.address.city || ''} editable={false} />
                        </View>
                        <View style={styles.eachInputElement}>
                            <Text style={styles.InputText}>District</Text>
                            <TextInput style={[styles.inputinsideElement, styles.inputElement]} value={getProfiledata.address.district || ''} editable={false} />
                        </View>
                    </View>

                    <View style={[{ flex: 1, flexDirection: 'row', width: '100%' }, styles.eachinputCard]}>
                        <View style={styles.eachInputElement}>
                            <Text style={styles.InputText}>PinCode</Text>
                            <TextInput style={[styles.inputinsideElement, styles.inputElement]} value={String(getProfiledata.address.pincode || '')} editable={false} />
                        </View>
                        <View style={styles.eachInputElement}>
                            <Text style={styles.InputText}>State</Text>
                            <TextInput style={[styles.inputinsideElement, styles.inputElement]} value={getProfiledata.address.state || ''} editable={false} />
                        </View>
                    </View>

                    <View style={styles.containerPassword}>
                        <Pressable style={styles.ChangePassword} onPress={handleredirectPassowrd}>
                            <Text style={{ color: "#8B78FF", fontSize: responsiveFontSize(1.2) }}>CHANGE PASSWORD</Text>
                        </Pressable>

                        <Pressable style={styles.ChangePassword} onPress={checkForUpdates}>
                            <Text style={{ color: "#8B78FF", fontSize: responsiveFontSize(1.2) }}>Check for Updates</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};






const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },


    containerPassword: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        padding: responsiveHeight(2),
        // marginBottom: responsiveHeight(2),
        marginTop: responsiveHeight(2)
    },
    ChangePassword: {
        // backgroundColor: '#0386D0',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        padding: responsiveHeight(2),
        borderRadius: responsiveHeight(1),
        borderColor: '#8B78FF',
        borderWidth: responsiveHeight(0.2)


    },
    profileContainer: {
        marginHorizontal: responsiveHeight(3)
    },
    image: {
        height: responsiveHeight(12),
        width: responsiveHeight(12)
    },
    nametext: {
        color: '#262422',
        fontWeight: '600',
        marginTop: responsiveHeight(1)

    },
    roleText: {
        color: '#ABABAB',

    },
    InputText: {

        color: '#262422',
        fontWeight: '500',
        marginVertical: responsiveHeight(1),
        marginHorizontal: responsiveHeight(1)
    }
    , inputElement: {
        flexDirection: 'row',
        borderColor: '#ABABAB',
        borderWidth: responsiveHeight(0.1),
        paddingHorizontal: responsiveWidth(3),
        borderRadius: responsiveHeight(1),
        paddingVertical: responsiveHeight(1.2),
        // backgroundColor: '#F9F9F9',
    }

    ,
    eachInputElement: {
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    inputinsideElement: {
        marginLeft: responsiveHeight(1)
    },
    eachinputCard: {
        marginVertical: responsiveHeight(0.6)
    }


    // ABABAB
});

export default Profile_Page;















    // const checkForUpdates = async () => {
    //     // setLoading(true);
    //     try {
    //       // Check if an update is available
    //       const update = await Updates.checkForUpdateAsync();
    //       if (update.isAvailable) {
    //         Alert.alert(
    //           'Update Available',
    //           'A new update is available. Do you want to update now?',
    //           [
    //             {
    //               text: 'Update',
    //               onPress: async () => {
    //                 await Updates.fetchUpdateAsync();
    //                 Updates.reloadAsync();
    //               }
    //             },
    //             { text: 'Later' }
    //           ]
    //         );
    //       } else {
    //         Alert.alert('No updates available');
    //       }
    //     } catch (e) {
    //       console.error('Error checking for updates:', e);
    //     } finally {
    //     //   setLoading(false);
    //     }
    //   };
























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














// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Button, Alert, ActivityIndicator } from 'react-native';
// import * as Updates from 'expo-updates';

// export default function About() {
//   const [loading, setLoading] = useState(false);
//   const [updateAvailable, setUpdateAvailable] = useState(false);

//   const checkForUpdates = async () => {
//     setLoading(true);
//     try {
//       // Check if an update is available
//       const update = await Updates.checkForUpdateAsync();
//       if (update.isAvailable) {
//         setUpdateAvailable(true);
//         Alert.alert(
//           'Update Available',
//           'A new update is available. Do you want to update now?',
//           [
//             {
//               text: 'Update',
//               onPress: async () => {
//                 await Updates.fetchUpdateAsync();
//                 Updates.reloadAsync();
//               }
//             },
//             { text: 'Later' }
//           ]
//         );
//       } else {
//         Alert.alert('No updates available');
//       }
//     } catch (e) {
//       console.error('Error checking for updates:', e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Hi, this is Rakesh</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <Button title="Check for Updates" onPress={checkForUpdates} />
//       )}
//     </View>
//   );
// }
