import React, { useState, useEffect } from 'react';

import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet, Pressable, ScrollView, Alert, ActivityIndicator, ToastAndroid, Dimensions, KeyboardAvoidingView, StatusBar } from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Cols } from 'react-native-table-component';



const role = [
    'technician',
    'delivery_man'
]

const statesInIndia = [
    'andaman and nicobar islands',
    'andhra pradesh',
    'arunachal pradesh',
    'assam',
    'bihar',
    'chandigarh',
    'chhattisgarh',
    'dadra and nagar haveli',
    'daman and diu',
    'delhi',
    'goa',
    'gujarat',
    'haryana',
    'himachal pradesh',
    'jammu and kashmir',
    'jharkhand',
    'karnataka',
    'kerala',
    'ladakh',
    'lakshadweep',
    'madhya pradesh',
    'maharashtra',
    'manipur',
    'meghalaya',
    'mizoram',
    'nagaland',
    'odisha',
    'puducherry',
    'punjab',
    'rajasthan',
    'sikkim',
    'tamil nadu',
    'telangana',
    'tripura',
    'uttar pradesh',
    'uttarakhand',
    'west bengal'
];



const Technicains = () => {
    const [modaltechnicianVisible, setModaTechnicianlVisible] = useState(false)
    const [firstNametext, setfirstNametext] = useState('')
    const [lastnameText, setlastNameText] = useState('')
    const [texttechnicainName, handleInputTechnicainName] = useState('')
    const [texttechnicainEmail, handleInputTechnicainEamil] = useState('')
    const [textTechnicainPhoneNo, handleInputTechnicainPhoneNo] = useState('')
    const [selectedrole, setSelectedRole] = useState('');
    const [textpassword, handleInputrolePassword] = useState('')
    const [openmodelTechnicianDetails, setModalTechnicianDetailsVisiable] = useState(false)
    const [textDistrictrole, handleInputDistrictrole] = useState('')
    const [textStaterole, handleInputStaterole] = useState('')
    const [textLocationRole, handleInputLocationrole] = useState('')
    const [textpincoderole, handleInputPinCode] = useState('')
    const [updateroleadress, setUpdatehandlerole] = useState({})
    const [dataroletech, setDataroletech] = useState([]);
    const [loading, setLoading] = useState(true);
    const [roleCheck, setRoleCheck] = useState('');
    const [reloadFlag, setReloadFlag] = useState(false);
    const [geteditmodelEmployee, setEditmodelemployee] = useState(false)
    const [selectedState, setSelectedState] = useState('');



    const fetchData = async () => {

        try {

            const role = await AsyncStorage.getItem('rolecheck');

            setRoleCheck(role)

            const jwtToken = await AsyncStorage.getItem('jwtToken');

            // Make GET request with JWT token
            const response = await fetch('https://shubhansh7777.pythonanywhere.com/agent/account/', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            function formatDate(dateString) {
                const date = new Date(dateString);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear().toString().slice(-2);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                return `${day}/${month}/${year} Time: ${hours}:${minutes}`;
            }

            const responseDataEmployee = responseData.map(item => ({
                ...item,
                // role: item.role.replace('_', ' ').toUpperCase(),
                email: item.email.toUpperCase(),
                first_name: item.first_name.toUpperCase(),

                last_name: item.last_name.toUpperCase(),


                // date_joined: formatDate(item.date_joined),

            }));

            console.log(responseData,'responseData')
            setDataroletech(responseData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );


    const onhandletechdevlirySubmit = async () => {
        const userDetails = {
            first_name: firstNametext,
            last_name: lastnameText,
            email: texttechnicainEmail,
            mobile: textTechnicainPhoneNo,
            password: textpassword,
            role: selectedrole,
            password_check: textpassword,
            address: updateroleadress
        };

        console.log(userDetails);

        try {
            const jwtToken = await AsyncStorage.getItem('jwtToken');

            const response = await fetch('https://shubhansh7777.pythonanywhere.com/agent/account/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(userDetails), // Changed `postData` to `userDetails`
            });
            console.log(response)

            if (!response.ok) {
                const data = await response.json();
                console.log(data,)

                ToastAndroid.show('Please field All', ToastAndroid.SHORT);

                // throw new Error('Network response was not ok');
            }

            const newroletech = await response.json();
            setDataroletech(prevData => [...prevData, newroletech]);

            await fetchData()
            setModaTechnicianlVisible(!modaltechnicianVisible)
            ToastAndroid.show(newroletech.detail, ToastAndroid.SHORT);


        } catch (error) {
            console.error('Error:', error);
            // Handle errors
        }
        finally {
            setLoading(false);
            handleInputTechnicainName('')
            handleInputTechnicainEamil('')
            handleInputTechnicainPhoneNo('')
            handleInputrolePassword('')
            setSelectedRole('')
            handleInputDistrictrole('')
            handleInputStaterole('')
            handleInputLocationrole('')
            handleInputPinCode('')
            setSelectedState()
            setfirstNametext('')
            setlastNameText('')
        }

    };


    const onhandlerole = () => {
        const address = {
            city: textLocationRole,
            pincode: parseInt(textpincoderole),
            district: textDistrictrole,
            state: selectedState
        }

        setUpdatehandlerole(address)
        setModaTechnicianlVisible(!modaltechnicianVisible);

        setModalTechnicianDetailsVisiable(!openmodelTechnicianDetails)

    }

    const handleDeleteUser = async (idToDelete) => {
        try {
            setLoading(true);
            const jwtToken = await AsyncStorage.getItem('jwtToken');
            // const deleteid=`https://shubhansh7777.pythonanywhere.com/agent/account/${idToDelete}`
            // console.log(deleteid)

            // Make DELETE request to your API endpoint
            const response = await fetch(`https://shubhansh7777.pythonanywhere.com/agent/account/${idToDelete}/`, {
                method: 'DELETE',
                // Add any necessary headers
                headers: {
                    'Content-Type': 'application/json',

                    // Add your authentication token if required
                    'Authorization': `Bearer ${jwtToken}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                console.log(data)
                throw new Error('Failed to delete data');
            }

            // ToastAndroid.show('Successfully deleted', ToastAndroid.SHORT);
            setLoading(true);


            // No need to parse JSON for DELETE requests
            // const data = await response.json();
            setDataroletech(prevData => prevData.filter(item => item.id !== idToDelete));

            console.log(data)
            ToastAndroid.show('Successfully Deleted Account', ToastAndroid.SHORT);


            // fetchData(); // Call fetchData to refresh the data
            // If the response is successful, show a success message
            Alert.alert('Success', 'Data deleted successfully');
        } catch (error) {
            setDataroletech(prevData => prevData.filter(item => item.id !== idToDelete));
            ToastAndroid.show('Successfully Deleted Account', ToastAndroid.SHORT);

            // console.error('Error deleting data:', error);
            // If an error occurs, show an error message
            //   Alert.alert('Error','Failed to delete data');
        } finally {
            setLoading(false);
        }
    };

    const openAddressHandle = () => {
        setModalTechnicianDetailsVisiable(!openmodelTechnicianDetails)
        setModaTechnicianlVisible(!modaltechnicianVisible);
    }

    const onCloseTechnicains = () => {
        setModalTechnicianDetailsVisiable(!openmodelTechnicianDetails)
        setModaTechnicianlVisible(!modaltechnicianVisible);
    }



    const [textfirstnameEditEmployee, setfirstnameEditEmployee] = useState('')
    const [textlastnameEditEmployee, setlastnameEditEmployee] = useState('')

    const [textemaileditEmployee, settexteditemailEmployee] = useState("")
    const [textnumbereditEmployee, setEditnumberemployee] = useState("")
    const [getobjectSaveEmolyee, setobjectsaveEmpolyeeEdit] = useState({})

    const handelEditEmployee = (objectEmployee) => {
        console.log(objectEmployee)
        setobjectsaveEmpolyeeEdit(objectEmployee)
        setEditmodelemployee(!geteditmodelEmployee)
        setfirstnameEditEmployee(objectEmployee.first_name)
        setlastnameEditEmployee(objectEmployee.last_name)
        settexteditemailEmployee(objectEmployee.email)
        setEditnumberemployee(String(objectEmployee.mobile))
        // setshowingPasswordEditEmployee(objectEmployee.)
    }

    const onhandleEditEmployeeSubmit = async () => {
        const userDetailsemloyee = {
            first_name: textfirstnameEditEmployee,
            last_name: textlastnameEditEmployee,
            email: textemaileditEmployee,
            mobile: parseInt(textnumbereditEmployee),
            role: getobjectSaveEmolyee.role,
            address: getobjectSaveEmolyee.address
        };

        console.log(userDetailsemloyee,'userDetailsemloyee')

        try {
            const jwtToken = await AsyncStorage.getItem('jwtToken');

            const response = await fetch(`https://shubhansh7777.pythonanywhere.com/agent/account/${getobjectSaveEmolyee.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(userDetailsemloyee)
            });

            if (!response.ok) {


                const erroreditDataEmployee = await response.json();
                console.log(erroreditDataEmployee, 'newupdate')

                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseEditEmpolyee = await response.json();




            console.log(responseEditEmpolyee, 'new')
            await fetchData();
            setLoading(true)
            ToastAndroid.show('Successfully updated Employee', ToastAndroid.SHORT);


        } catch (error) {
            console.error('new', error);
        }

        // Handle product submit
        setEditmodelemployee(!geteditmodelEmployee)
        setLoading(false)



    }


    return (
        <SafeAreaView>
            <StatusBar style="dark" />



            {loading ? <ActivityIndicator animating={loading} size="large" color="#0000ff" /> :
                <>
                    {'admin' === roleCheck ? < View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => setModaTechnicianlVisible(true)} style={{ backgroundColor: '#0386D0', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: responsiveHeight(1.2), paddingHorizontal: responsiveHeight(0.6), marginVertical: responsiveHeight(3), marginHorizontal: responsiveHeight(3), borderRadius: responsiveHeight(1) }}>
                            <Ionicons name="person-add-sharp" size={responsiveHeight(2)} color="white" />
                            <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: responsiveFontSize(1.2), marginLeft: responsiveHeight(0.8),fontWeight:'600' }}>ADD EMPLOYEES</Text>
                        </TouchableOpacity>


                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modaltechnicianVisible}
                            onRequestClose={() => {
                                // Alert.alert('Modal has been closed.');
                                setModaTechnicianlVisible(!modaltechnicianVisible);
                            }}>
                            <View style={styles.centeredView}>
                                <ScrollView style={{ marginTop: responsiveHeight(15) }}>
                                    <View style={styles.modalView}>

                                        {/* <KeyboardAvoidingView> */}

                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.2) }}>FIRSTNAME</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => setfirstNametext(data)}
                                                value={firstNametext}
                                            />
                                        </View>
                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.2) }}>LASTNAME</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => setlastNameText(data)}
                                                value={lastnameText}
                                            />
                                        </View>
                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.2) }}>EMAIL</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => handleInputTechnicainEamil(data)}
                                                value={texttechnicainEmail}
                                            />
                                        </View>

                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.2) }}>PHONE NUMBER</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => handleInputTechnicainPhoneNo(data)}
                                                value={textTechnicainPhoneNo}
                                            />
                                        </View>
                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.2) }}>PASSWORD</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => handleInputrolePassword(data)}
                                                value={textpassword}
                                            />
                                        </View>

                                        <View style={[styles.inputElement, { marginVertical: responsiveHeight(1) }]}
                                        >
                                            <Picker
                                                style={{ fontSize: responsiveFontSize(4), height: responsiveHeight(5) }}
                                                selectedValue={selectedrole}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    setSelectedRole(itemValue)
                                                }>
                                                <Picker.Item label="SELECT ROLE" value='' style={{ fontSize: responsiveFontSize(1.2) }}
                                                />
                                                {role.map((roleitem, index) => (
                                                    <Picker.Item key={index} label={roleitem} value={roleitem} style={{ fontSize: responsiveFontSize(1.5) }} />
                                                ))}
                                            </Picker>
                                        </View>
                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <TouchableOpacity style={[styles.inputElement, { width: responsiveHeight(30), height: responsiveHeight(4), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
                                                // openAddressHandle
                                                // () => setModalTechnicianDetailsVisiable(true)
                                                onPress={openAddressHandle} >
                                                <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.2), marginLeft: responsiveHeight(0.8) }}>ADD ADDRESS</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable
                                                style={[styles.button, styles.buttonSubmit]}
                                                onPress={onhandletechdevlirySubmit}>
                                                <Text style={styles.textStyle}>SUBMIT</Text>
                                            </Pressable>

                                            <Pressable
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => setModaTechnicianlVisible(!modaltechnicianVisible)}>
                                                <Text style={styles.textStyle}>CLOSE</Text>
                                            </Pressable>
                                        </View>
                                        {/* </KeyboardAvoidingView> */}
                                    </View>
                                </ScrollView>

                            </View>

                        </Modal>


                        <Modal
                            animationType="slide"
                            // style={{
                            //     position: 'fixed',
                            // }}
                            transparent={true}
                            visible={openmodelTechnicianDetails}
                            onRequestClose={() => {

                                setModalTechnicianDetailsVisiable(!openmodelTechnicianDetails);
                            }}>
                            <View style={styles.centeredView}>
                                <ScrollView style={{ marginTop: responsiveHeight(15) }}>

                                    <View style={styles.modalView}>


                                    <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>State</Text>
                                            <View style={styles.inputElement}>
                                            <Picker
                                                 style={{width:responsiveHeight(30),height:responsiveHeight(5),fontSize:responsiveFontSize(1)}}
                                                selectedValue={selectedState}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    setSelectedState(itemValue)
                                                }>
                                                <Picker.Item label="Select State" value=''  style={{fontSize:responsiveFontSize(1.3),fontWeight:'500'}} />
                                                {statesInIndia.map((state, index) => (
                                                    <Picker.Item key={index} label={state} value={state} style={{fontSize:responsiveFontSize(1.3)}} />
                                                ))}
                                            </Picker>
                                            </View>
                                        </View>
                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>District</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => handleInputDistrictrole(data)}
                                                value={textDistrictrole}
                                            />
                                        </View>

                                     

                                        {/* <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>State</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => handleInputStaterole(data)}
                                                value={textStaterole}
                                            />
                                        </View> */}
                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>City</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => handleInputLocationrole(data)}
                                                value={textLocationRole}
                                            />
                                        </View>


                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>Pincode</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => handleInputPinCode(data)}
                                                value={textpincoderole}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity
                                                style={[styles.button, styles.buttonSubmit]}
                                                onPress={onhandlerole}>
                                                <Text style={styles.textStyle}>Submit</Text>
                                            </TouchableOpacity>


                                            <Pressable
                                                style={[styles.button, styles.buttonClose]}
                                                // () => setModalTechnicianDetailsVisiable(!openmodelTechnicianDetails)
                                                onPress={onCloseTechnicains}>
                                                <Text style={styles.textStyle}>Close</Text>
                                            </Pressable>
                                        </View>
                                    </View>

                                </ScrollView>
                            </View>
                        </Modal>








                        {/* Edit Employee */}

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={geteditmodelEmployee}
                            onRequestClose={() => {
                                // Alert.alert('Modal has been closed.');
                                setEditmodelemployee(!geteditmodelEmployee);
                            }}>
                            <View style={styles.centeredView}>
                                <ScrollView style={{ marginTop: responsiveHeight(15) }}>
                                    <View style={styles.modalView}>

                                        {/* <KeyboardAvoidingView> */}

                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>firstName</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => setfirstnameEditEmployee(data)}
                                                value={textfirstnameEditEmployee}
                                            />
                                        </View>

                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>lastName</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => setlastnameEditEmployee(data)}
                                                value={textlastnameEditEmployee}
                                            />
                                        </View>

                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>Email</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => settexteditemailEmployee(data)}
                                                value={textemaileditEmployee}
                                            />
                                        </View>

                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>Phone Number</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => setEditnumberemployee(data)}
                                                value={textnumbereditEmployee}
                                            />
                                        </View>

                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable
                                                style={[styles.button, styles.buttonSubmit]}
                                                onPress={onhandleEditEmployeeSubmit}>
                                                <Text style={styles.textStyle}>Submit</Text>
                                            </Pressable>

                                            <Pressable
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => setEditmodelemployee(!geteditmodelEmployee)}>
                                                <Text style={styles.textStyle}>Close</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </ScrollView>

                            </View>

                        </Modal>











                    </View> : null}
                    {openmodelTechnicianDetails &&
                        <BlurView intensity={230} style={[styles.absolute, { height: Dimensions.get('window').height }]} tint="light" />}

                    {modaltechnicianVisible && (
                        <BlurView intensity={230} style={[styles.absolute, { height: Dimensions.get('window').height }]} tint="light" />)}
                    {geteditmodelEmployee && (
                        <BlurView intensity={230} style={[styles.absolute, { height: Dimensions.get('window').height }]} tint="light" />)}
                    {/* geteditmodelEmployee */}
                    <View style={[styles.table, { marginTop: responsiveHeight(3) }]}>
                        <View style={styles.row}>
                            <Text style={styles.cellhead}>ID</Text>
                            <Text style={styles.cellhead}>NAME</Text>


                            <Text style={styles.cellhead}>MOBILE NO</Text>


                            <Text style={styles.cellhead}>EMAIL</Text>
                            <Text style={styles.cellhead}>ROLE</Text>
                            <Text style={styles.cellhead}>DATE OF JOINED</Text>
                            {('admin' === roleCheck) ? <Text style={styles.cellhead}>ACTION</Text>

                                : null}
                        </View>

                        {
                            dataroletech.map((item, index) => (
                                <View style={styles.row} key={index}>
                                    <Text style={styles.cell}>{index + 1}</Text>
                                    <Text style={[styles.cell,{fontSize:responsiveFontSize(0.9)}]}>{item.first_name} {item.last_name}</Text>

                                    <Text style={[styles.cell,]}>{item.mobile}</Text>
                                    <Text style={[styles.cell,{fontSize:responsiveFontSize(0.8)}]}>{item.email.toUpperCase()}</Text>
                                    <Text style={[styles.cell,{fontWeight:'800',fontSize:responsiveFontSize(0.8)}]}>{item.role.toUpperCase()}</Text>

                                    <Text style={styles.cell}>{item.date_joined}</Text>

                                    {('admin' === roleCheck) ? <View style={[styles.cellAction, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                                        <TouchableOpacity
                                            onPress={() => handelEditEmployee(item)}
                                            style={[{ minWidth: responsiveHeight(3), paddingVertical: 2, marginHorizontal: responsiveHeight(0.2), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#52c41a', borderRadius: 5 }]}
                                        >
                                            <MaterialIcons name="edit" size={15} color="#ffffff" />
                                        </TouchableOpacity>

                                        {'admin' === roleCheck &&
                                            <TouchableOpacity onPress={() => handleDeleteUser(item.id)} style={[{ minWidth: responsiveHeight(3), paddingVertical: 2, marginHorizontal: responsiveHeight(0.2), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#dc3545', borderRadius: 5 }]}>
                                                <MaterialIcons name="delete" size={15} color="#ffffff" />
                                            </TouchableOpacity>
                                        }
                                    </View> : null}

                                </View>
                            ))}


                    </View>


                </>
            }




        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {
        width: '80%',
        marginVertical: 10,
    },
    inputElement: {
        minHeight: responsiveHeight(4), width: responsiveHeight(30), borderColor: 'gray', borderWidth: 1, borderRadius: 5
    },
    inputlable: {
        color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5)
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        // position:'absolute'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        marginTop: responsiveHeight(1),
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

    inputElementRole: {
        height: responsiveHeight(4), width: responsiveHeight(30), borderColor: 'gray', borderWidth: 1, borderRadius: 5,
    },
    buttonSubmit: {
        marginTop: responsiveHeight(1),
        backgroundColor: '#99CC00',
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginHorizontal: responsiveHeight(2)
    },







    tableHeader: {
        backgroundColor: '#DCDCDC',
        // paddingHorizontal:30
    },

    table: {
        borderWidth: 0.1,
        borderColor: "#DCDCDC",
        marginBottom: 10,
        marginTop: 10,
        paddingHorizontal: 20,
        // padding:
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",

    },
    cellhead: {
        width: responsiveHeight(8),
        height: responsiveHeight(6),
        borderWidth: 0.5,
        color: "#ffffff",
        fontSize: responsiveFontSize(1),
        textAlign: 'center',
        fontWeight: '500',
        borderColor: "black",
        flex: 1,
        // backgroundColor: '#DCDCDC',
        backgroundColor: '#0083c2',
        paddingTop: responsiveHeight(0.5)


    },
    cell: {
        flex: 1,

        borderWidth: 0.5,
        width: responsiveHeight(8),
        height: responsiveHeight(8),
        textAlign: "center",
        fontSize: responsiveFontSize(1),
        color: "black",
        borderColor: "black",
        flexWrap: 'wrap',



    },

    cellid: {

        paddingTop: 10,
        borderWidth: 0.5,
        width: responsiveHeight(8),
        height: responsiveHeight(8),
        textAlign: "center",
        fontSize: 10,
        color: "black",
        borderColor: "black",
    },


    cellAction: {
        flex: 1,
        borderWidth: 0.5,
        height: responsiveHeight(8),
        flexDirection: 'row',
        textAlign: "center",
        fontSize: 10,
        borderColor: "black",
    },


    celltextdelete: {
        fontSize: responsiveFontSize(1),
        marginLeft: responsiveHeight(1.5)
    },


});




export default Technicains


