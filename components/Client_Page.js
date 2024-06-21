import { View, Text, TouchableOpacity, Modal, StyleSheet, Pressable, TextInput, ScrollView, FlatList, ActivityIndicator, TouchableWithoutFeedback, NetInfo, Alert, ToastAndroid, Dimensions, StatusBar } from 'react-native'

import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import { useFocusEffect } from '@react-navigation/native';
import Toast, { BaseToast } from 'react-native-toast-message';
import { BlurView } from 'expo-blur';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

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





const role = [
    'client',
    'manager'
]


const defaultState = "Please select state"; // Set default state
const defaultDistrict = "Please select district"; // Set default district


const Client_Page = () => {


    const [modalVisible, setModalVisible] = useState(false);
    const [textUsername, handleInputClientName] = useState('')
    const [branchName, handleInputBranchName] = useState('')

    const [openmodelAddressaddclient, setmodeladdressaddclient] = useState(false)
    const [textLocation, handleInputLocation] = useState('')
    const [textDistrict, handleInputDistrict] = useState('')
    const [textState, handleInputState] = useState('')
    const [textpincode, handleInputPinCode] = useState('')
    const [textDirection, handleInputDirection] = useState('')
    const [brachList, addBranchList] = useState({})
    const [selectedState, setSelectedState] = useState(defaultState);
    const [selectedDistrict, setSelectedDistrict] = useState(defaultDistrict);
    const [loading, setLoading] = useState(true);
    const [datagetbranch, setDatabranch] = useState([]);
    const [data2, setData2] = useState([])

    const [openmodelBranch, setModalBranchVisible] = useState(false)
    const [errorBranch, seterrorBranch] = useState({
        errorOrganization: '',
        errorUsernameBranch: '',

    })

    const handleStateChange = (value) => {
        setSelectedState(value);
        setSelectedDistrict(defaultDistrict); // Reset district when state changes
    };


    const [selectedBranch, setselectedBranch] = useState('infosys');

    const [addselectBranch, addsetselectedBranch] = useState('')
    const [openmodelBranchDelete, setModalBranchDelete] = useState(false)

    const [deleteIdbranch, setDeleteidSave] = useState('')
    const [roleCheck, setRoleCheck] = useState('');
    const [dataselectBranch, setSelectbranch] = useState([])
    const [selectedBranchclient, setselectedClientBranch] = useState('')
    // const [selectedState, setSelectedState] = useState('');





    const fetchData = async () => {

        setLoading(true);

        try {
            const role = await AsyncStorage.getItem('rolecheck');
            getrolecheck = role
            setRoleCheck(role)
            const jwtToken = await AsyncStorage.getItem('jwtToken');
            console.log(jwtToken)




            const [response1, response2] = await Promise.all([
                fetch('https://shubhansh7777.pythonanywhere.com/organization/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }),
                fetch(`https://shubhansh7777.pythonanywhere.com/organization/account/`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                })
            ]);

            if (!response1.ok || !response2.ok) {
                throw new Error('Network response was not ok');
            }

            const [responseData1, responseData2] = await Promise.all([
                response1.json(),
                response2.json()
            ]);


            function formatDate(dateString) {
                const date = new Date(dateString);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear().toString().slice(-2);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                return `${day}/${month}/${year} TIME: ${hours}:${minutes}`;
            }

            function capitalizeWords(str) {
                return str.replace(/\b\w/g, char => char.toUpperCase());
            }

            const formattedResponseData1 = responseData1.map(item => ({
                ...item,
                name: item.name.toUpperCase()
            }));



            const responseData2Formatted = responseData2.map(item => ({
                ...item,
                role: item.role.toUpperCase(),
                email: item.email.toUpperCase(),
                date_joined: formatDate(item.date_joined)
            }));


            setDatabranch(formattedResponseData1);
            setData2(responseData2Formatted);
            console.log(responseData2Formatted)

            // console.log(responseData2)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);


        }

        // setSelectbranch(data)
    };




    //UseEffect getmethod

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );


    // Add Branch Post Method

    const onhandleBranchSubmit = async () => {
        // setLoading(true);
        seterrorBranch({ errorOrganization: '', errorUsernameBranch: '' });

        const DetailsClient = {
            name: textUsername,
            username: branchName,
            // PhoneNo: textNumber,
            // ClientBranch: brachList
        }

        // console.log(DetailsClient)

        try {
            const jwtToken = await AsyncStorage.getItem('jwtToken');

            const response = await fetch('https://shubhansh7777.pythonanywhere.com/organization/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(DetailsClient), // Changed `postData` to `userDetails`
            });
            console.log(response)

            if (!response.ok) {
                const errorDatabranch = await response.json();
                // const { name = '', category = '', price = '' } = errorData.errors || {}; // Handle potential error structure
                seterrorBranch({ errorOrganization: errorDatabranch.name, errorUsernameBranch: errorDatabranch.username });

            }

            const databranch = await response.json();

            ToastAndroid.show('Successfully Added Client', ToastAndroid.SHORT);





            setDatabranch(prevData => [...prevData, databranch]);
            setModalBranchVisible(!openmodelBranch)



        } catch (error) {
            // console.error('Error:', error);
        } finally {
            setLoading(false);
            handleInputClientName('')
            handleInputBranchName('')

        }

    }


    // handleDeleteopen

    const handelDeletebranch = (itemvalue) => {
        setDeleteidSave(itemvalue)
        setModalBranchDelete(!openmodelBranchDelete);
    }

    // DeletecBranch
    const handleDeleteclientBranch = async () => {

        try {
            setLoading(true);
            const jwtTokenvalue = await AsyncStorage.getItem('jwtToken');
            const newValueId = parseInt(deleteIdbranch)
            // console.log(newValueId)

            // Make DELETE request to your API endpoint
            const response = await fetch(`https://shubhansh7777.pythonanywhere.com/organization/${newValueId}/`, {
                method: 'DELETE',
                // Add any necessary headers
                headers: {
                    // 'Accept': 'application/json',

                    'Content-Type': 'application/json',

                    // Add your authentication token if required
                    'Authorization': `Bearer ${jwtTokenvalue}`,
                },
            });

            if (!response.ok) {
                const dataDeleteError = await response.json();
                // console.log(dataDeleteError)

                // throw new Error('Failed to delete data');
            }

            const Deletedata = await response.json();
            console.log(Deletedata, 'Delelte data')
            setModalBranchDelete(!openmodelBranchDelete)


            setLoading(true)
            setDatabranch(prevData => prevData.filter(item => item.id !== newValueId));

            ToastAndroid.show('Successfully Deleted Client', ToastAndroid.SHORT);


        } catch (error) {
            setModalBranchDelete(!openmodelBranchDelete)
            const idBranchValue = deleteIdbranch
            setDatabranch(prevData => prevData.filter(item => item.id !== idBranchValue));

            ToastAndroid.show('Successfully Deleted Client', ToastAndroid.SHORT);


            // console.error('Error deleting data:', error);

        } finally {
            setLoading(false);
        }

        setLoading(false)


    }






    const [openModelbranchEdit, setopenModelbranchEdit] = useState(false)
    const [newEdititembranch, seteditbranchitem] = useState('')
    const [branchNametextedit, setbranchNametextEdit] = useState('')
    const [branchUsernameEdit, setbranchUsernameEdit] = useState('')


    //handelEditopenModel
    const handelEditopenModelBranch = async (Edititembranch) => {
        seteditbranchitem(Edititembranch.id)
        setopenModelbranchEdit(!openModelbranchEdit)
        setbranchNametextEdit(Edititembranch.name)
        setbranchUsernameEdit(Edititembranch.username)
    }

    const onhandleBranchEdit = async () => {

        try {
            const jwtToken = await AsyncStorage.getItem('jwtToken');
            const EditUpdatebranch = {
                name: branchNametextedit,
                usename: branchUsernameEdit,
            }

            const response = await fetch(`https://shubhansh7777.pythonanywhere.com/organization/${newEdititembranch}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(EditUpdatebranch)
            });

            if (!response.ok) {


                const erroreditDatabranch = await response.json();
                // console.log(erroreditDatabranch, 'newupdate')

                // throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseEditbranch = await response.json();


            console.log(responseEditbranch, 'new')
            await fetchData();
            setLoading(true)
            ToastAndroid.show('Successfully Edited Client', ToastAndroid.SHORT);


        } catch (error) {
            // console.error('new', error);
        }

        // Handle product submit
        setopenModelbranchEdit(!openModelbranchEdit); // Close modal
        setLoading(false)
    }



    const [firstName, setFirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [textEmail, handleInputEmail] = useState('')
    const [textNumber, handleInputNumber] = useState('')
    const [textpassword, handleInputPassword] = useState('')
    const [selectedrole, setselectedrole] = useState('')
    const [openEditopenClientmain, setmodelEditopenClientmain] = useState(false)


    const onhandleBranch = () => {
        const newBranch = {
            district: textDistrict,
            state: textState,
            city: textLocation,
            pincode: textpincode,
            location: textDirection,

        }


        addBranchList(newBranch)
        setmodeladdressaddclient(!openmodelAddressaddclient)
        setModalVisible(!modalVisible);

        // addBranchList(prevBranches => [...prevBranches, newBranch]);

    }



    const onhandleSubmitClient = async () => {
        const clientDetails = {
            first_name: firstName,
            last_name: lastName,
            email: textEmail,
            mobile: textNumber,
            password: textpassword,
            password_check: textpassword,
            role: selectedrole,
            address: brachList
        }



        try {
            const jwtToken = await AsyncStorage.getItem('jwtToken');

            const response = await fetch(`https://shubhansh7777.pythonanywhere.com/organization/account/${selectedBranch}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(clientDetails), // Changed `postData` to `userDetails`
            });
            console.log(response, 'response')

            if (!response.ok) {
                const errordatapost = await response.json();

                // throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setData2(prevData => [...prevData, data]);
            await fetchData()

            ToastAndroid.show('Successfully Added Branch', ToastAndroid.SHORT);

            setLoading(true);
        } catch (error) {
            // console.error('Error:', error);
        }

        setLoading(false);
        setModalVisible(!modalVisible)

    }


    const handleDeleteClientmain = async (idClientDelete) => {
        try {
            setLoading(true);
            const jwtToken = await AsyncStorage.getItem('jwtToken');

            // Make DELETE request to your API endpoint
            const response = await fetch(`https://shubhansh7777.pythonanywhere.com/organization/account/${selectedBranch}/${idClientDelete}/`, {
                method: 'DELETE',
                // Add any necessary headers
                headers: {
                    // 'Content-Type': 'application/json',

                    // Add your authentication token if required
                    'Authorization': `Bearer ${jwtToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete data');
            }


            setLoading(true)
            setData2(prevData => prevData.filter(item => item.id !== idClientDelete));

            fetchData()
            // Call fetchData to refresh the data
            // If the response is successful, show a success message
            Alert.alert('Success', 'Branch deleted successfully');
        } catch (error) {
            setData2(prevData => prevData.filter(item => item.id !== idClientDelete));
            Alert.alert('Success', 'Branch deleted successfully');

            // console.error('Error deleting data:', error);
            // If an error occurs, show an error message
            //   Alert.alert('Error','Failed to delete data');
        } finally {
            setLoading(false);
        }

        setLoading(false)
    }

    const onhandelChangebranch = async (itemValue) => {
        setselectedBranch(itemValue)
        setLoading(true)
        await fetchData()

        setLoading(false)

    }



    const [FirstNameeditclient, setFirstNameeditclient] = useState('')
    const [lastNameeditclient, setlastNameeditclient] = useState('')
    const [Emaileditclient, handleInputEmaileditclient] = useState('')
    const [Numbereditclient, handleInputNumbereditclient] = useState("")
    const [opensaveedit, setsaveeditopenClient] = useState('')

    const handleEditClientmain = (itemdata) => {
        setmodelEditopenClientmain(!openEditopenClientmain)
        setsaveeditopenClient(itemdata)
        setFirstNameeditclient(itemdata.first_name)
        setlastNameeditclient(itemdata.last_name)
        handleInputEmaileditclient(itemdata.email)
        handleInputNumbereditclient(String(itemdata.mobile))
    }


    const closeAddressmodelclient = () => {
        setmodeladdressaddclient(!openmodelAddressaddclient)
        // setModalVisible(!modalVisible);
        setModalVisible(!modalVisible);

    }

    const handelopenmodelAddressbranch = () => {
        setmodeladdressaddclient(!openmodelAddressaddclient);
        setModalVisible(!modalVisible);
    }

    const onhandleSubmitClientedit = async () => {
        console.log(opensaveedit,'opensaveedit')
        const userDetailsemloyee = {
            first_name: FirstNameeditclient,
            last_name: lastNameeditclient,
            email: Emaileditclient,
            mobile: parseInt(Numbereditclient),
            role: opensaveedit.role,
            organization: opensaveedit.organization,
            address: opensaveedit.address,
            is_active: true
        };
        // console.log(userDetailsemloyee, 'userDetailsemloyee')
        console.log(selectedBranchclient,'selectedBranchclient')

        try {
            const jwtToken = await AsyncStorage.getItem('jwtToken');
            console.log(`https://shubhansh7777.pythonanywhere.com/organization/account/${selectedBranchclient}/${opensaveedit.id}/`)

            const response = await fetch(`https://shubhansh7777.pythonanywhere.com/organization/account/${selectedBranchclient}/${opensaveedit.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(userDetailsemloyee)
            });

            if (!response.ok) {


                const erroreditDataclient = await response.json();
                // console.log(erroreditDataclient, 'newupdate')

                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseEditclient = await response.json();


            // console.log(responseEditclient, 'new')
            await fetchData();
            setLoading(true)
            ToastAndroid.show('Successfully updated Employee', ToastAndroid.SHORT);


        } catch (error) {
            console.error('new', error);
        }

        setmodelEditopenClientmain(!openEditopenClientmain)
        setLoading(false)




    }

    const onhandleEditmodelcloseclient = () => {
        setmodelEditopenClientmain(!openEditopenClientmain)

    }


    const data = datagetbranch.map(item => ({
        key: item.username,
        value: item.username
    }));



    const onhandelclientbranch = async (itemValue) => {
        setselectedClientBranch(itemValue)
        setLoading(true)
        await fetchData()

        setLoading(false)

    }


    let filterbranch;

    if (selectedBranchclient === '') {
        filterbranch = data2
    } else {
        filterbranch = data2.filter((eachBrach) => eachBrach.organization === selectedBranchclient)
    }

    // console.log(selectedBranchclient, 'branch')
    return (

        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="dark" />

            {openmodelBranch &&
                <BlurView intensity={230} style={[styles.absolute, { height: Dimensions.get('window').height }]} tint="light" />}

            {modalVisible &&
                <BlurView intensity={230} style={[styles.absolute, { height: Dimensions.get('window').height }]} tint="light" />}

            {openmodelAddressaddclient &&
                <BlurView intensity={230} style={[styles.absolute, { height: Dimensions.get('window').height }]} tint="light" />}


            {openEditopenClientmain &&
                <BlurView intensity={230} style={[styles.absolute, { height: Dimensions.get('window').height }]} tint="light" />}


            {openModelbranchEdit &&
                <>
                    <BlurView intensity={230} style={[styles.absolute, { height: Dimensions.get('window').height }]} tint="light" />
                </>}




            <Toast
                config={{
                    success: (props) => (
                        <BaseToast
                            {...props}
                            style={{
                                borderLeftColor: 'green',
                                top: 0, // Ensure it sticks to the top
                                left: 0,
                                right: 0,
                                zIndex: 100, // Ensure it is above other components
                            }}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            text1Style={{
                                fontSize: 15,
                                fontWeight: 'bold'
                            }}
                            text2Style={{
                                fontSize: 13,
                                color: 'green'
                            }}
                        />
                    ),
                }}
            />
            {loading ?
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <ActivityIndicator animating={loading} size="large" color="#0000ff" />

                </View>
                : <>
                    <ScrollView>






                        {/* View Branch Table */}
                        {/* <View style={{ marginTop: responsiveHeight(3) }}>
                            <Text style={{ fontSize: responsiveFontSize(2), marginLeft: responsiveHeight(2.5), fontWeight: 500 }}>Client</Text>
                        </View> */}

                        {/* <View style={styles.table}>
                            <View style={styles.row}>
                                <Text style={styles.cellhead}>Id</Text>

                                <Text style={styles.cellhead}>Organization Name</Text>
                                <Text style={styles.cellhead}>UserName</Text>

                                {('manager' === roleCheck || 'admin' === roleCheck) ? <Text style={styles.cellhead}>Action</Text> : ''}


                            </View>

                            {
                                datagetbranch.map((item) => (
                                    <View style={styles.row} key={item.id}>
                                        <Text style={styles.cell}>{item.id}</Text>

                                        <Text style={styles.cell}>{item.name}</Text>
                                        <Text style={styles.cell}>{item.username}</Text>

                                        {('admin' === roleCheck || 'manager' === roleCheck) ? <View style={[styles.cellAction, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                                            <TouchableOpacity
                                                onPress={() => handelEditopenModelBranch(item)}
                                                style={[{ minWidth: responsiveHeight(3), paddingVertical: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#52c41a', borderRadius: 5 }]}
                                            >
                                                <MaterialIcons name="edit" size={responsiveHeight(2)} color="#ffffff" />
                                            </TouchableOpacity>
                                            {'admin' === roleCheck &&
                                                <TouchableOpacity onPress={() => handelDeletebranch(item.id)} style={[{ minWidth: responsiveHeight(3), paddingVertical: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: responsiveHeight(2), backgroundColor: '#dc3545', borderRadius: 5 }]}>
                                                    <MaterialIcons name="delete" size={responsiveHeight(2)} color="#ffffff" />
                                                </TouchableOpacity>
                                            }
                                        </View> : ''}



                                    </View>




                                ))}


                        </View> */}


                        {/* Add Branch */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={openmodelBranch}
                            onRequestClose={() => {
                                // Alert.alert('Modal has been closed.');
                                (!openmodelBranch);
                            }}>
                            <View style={styles.centeredView}>
                                <ScrollView style={{ marginTop: responsiveHeight(25) }}>

                                    <View style={styles.modalView}>
                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.2), }}>ORGANIZATION NAME</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => handleInputClientName(data)}
                                                value={textUsername}
                                            />
                                            {errorBranch && <Text style={{ color: 'red', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>{errorBranch.errorOrganization}</Text>
                                            }
                                        </View>
                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.2) }}>USERNAME</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => handleInputBranchName(data)}
                                                value={branchName}
                                            />

                                            {errorBranch && <Text style={{ color: 'red', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>{errorBranch.errorUsernameBranch}</Text>
                                            }

                                        </View>



                                        {/* <Text style={styles.modalText}>Hello World!</Text> */}
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable
                                                style={[styles.button, styles.buttonSubmit]}
                                                onPress={onhandleBranchSubmit}>
                                                <Text style={styles.textStyle}>SUBMIT</Text>
                                            </Pressable>



                                            <Pressable
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => setModalBranchVisible(!openmodelBranch)}>
                                                <Text style={styles.textStyle}>CLOSE</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </Modal>

                        {/* Edit Branch */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={openModelbranchEdit}
                            onRequestClose={() => {
                                // Alert.alert('Modal has been closed.');
                                setopenModelbranchEdit(!openModelbranchEdit)
                            }}>
                            <TouchableWithoutFeedback onPress={() => setopenModelbranchEdit(!openModelbranchEdit)}>

                                <View style={styles.centeredView}>

                                    <ScrollView style={{ marginTop: responsiveHeight(25) }}>

                                        <View style={styles.modalView}>
                                            <View style={{ marginVertical: responsiveHeight(1) }}>
                                                <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>Organization Name</Text>
                                                <TextInput
                                                    style={styles.inputElement}
                                                    onChangeText={data => setbranchNametextEdit(data)}
                                                    value={branchNametextedit}
                                                />
                                                {errorBranch && <Text style={{ color: 'red', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>{errorBranch.errorOrganization}</Text>
                                                }
                                            </View>
                                            <View style={{ marginVertical: responsiveHeight(1) }}>
                                                <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>Username</Text>
                                                <TextInput
                                                    style={styles.inputElement}
                                                    onChangeText={data => setbranchUsernameEdit(data)}
                                                    value={branchUsernameEdit}
                                                    editable={false}
                                                />

                                                {errorBranch && <Text style={{ color: 'red', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>{errorBranch.errorUsernameBranch}</Text>
                                                }

                                            </View>



                                            {/* <Text style={styles.modalText}>Hello World!</Text> */}
                                            <View style={{ flexDirection: 'row' }}>
                                                <Pressable
                                                    style={[styles.button, styles.buttonSubmit]}
                                                    onPress={onhandleBranchEdit}>
                                                    <Text style={styles.textStyle}>Submit</Text>
                                                </Pressable>



                                                <Pressable
                                                    style={[styles.button, styles.buttonClose]}
                                                    onPress={() => setopenModelbranchEdit(!openModelbranchEdit)}>
                                                    <Text style={styles.textStyle}>Close</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </ScrollView>

                                </View>
                            </TouchableWithoutFeedback>

                        </Modal>

                        {/* delete branch */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={openmodelBranchDelete}
                            onRequestClose={() => {
                                // Alert.alert('Modal has been closed.');
                                setModalBranchDelete(!openmodelBranchDelete);
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>





                                    {/* <Text style={styles.modalText}>Hello World!</Text> */}
                                    <View style={{ flexDirection: 'row' }}>
                                        <Pressable
                                            style={[styles.button, styles.buttonSubmit]}
                                            onPress={handleDeleteclientBranch}>
                                            <Text style={styles.textStyle}>Delete</Text>
                                        </Pressable>



                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => setModalBranchDelete(!openmodelBranchDelete)}>
                                            <Text style={styles.textStyle}>Close</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>





                        {/*Drop down Select Branch */}
                        <View style={{ marginTop: responsiveHeight(2) }}>
                            <Text style={{ fontSize: responsiveFontSize(1.4), marginLeft: responsiveHeight(2.5), fontWeight: 500 }}> SELECT CLIENT </Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                            <View style={[styles.inputElementSelect, { marginVertical: responsiveHeight(1), marginHorizontal: responsiveHeight(2) }]}
                            >
                                <Picker
                                    style={{ fontSize: responsiveFontSize(4) }}
                                    selectedValue={selectedBranchclient}
                                    onValueChange={onhandelclientbranch}>

                                    <Picker.Item label="SELECT CLIENT" value='' style={{ fontSize: responsiveFontSize(1.3), height: responsiveHeight(3) }}
                                    />
                                    {datagetbranch.map((item, index) => (

                                        <Picker.Item key={index} label={item.name} value={item.username} style={{ fontSize: responsiveFontSize(1.2), height: responsiveHeight(4), marginVertical: responsiveHeight(2), marginBottom: responsiveHeight(2), fontWeight: 'bold' }} />

                                    ))}
                                </Picker>



                            </View>

                            {('manager' === roleCheck || 'admin' === roleCheck) ?
                                <TouchableOpacity onPress={() => setModalBranchVisible(true)} style={{ backgroundColor: '#0386D0', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: responsiveHeight(1.2), paddingHorizontal: responsiveHeight(0.6), marginVertical: responsiveHeight(3), marginHorizontal: responsiveHeight(3), borderRadius: responsiveHeight(1) }}>
                                    <Octicons name="organization" size={responsiveHeight(2)} color="white" />
                                    <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: responsiveFontSize(1.2), marginLeft: responsiveHeight(0.8), fontWeight: "500" }}>ADD CLIENT</Text>
                                </TouchableOpacity>

                                : ''

                            }

                        </View>
                        {/* <View>
                            <SelectList
                                data={dataselectBranch}
                                setSelected={onhandelChangebranch}
                                search={false}
                            />

                        </View> */}

                        {/* client table */}
                        <View style={styles.table}>
                            <View style={styles.row}>
                                <Text style={styles.cellhead}>ID</Text>

                                <Text style={styles.cellhead}>MOBILE NO</Text>
                                <Text style={styles.cellhead}>EMAIL</Text>
                                <Text style={styles.cellhead}>ROLE</Text>
                                <Text style={styles.cellhead}>DATE OF JOINED</Text>
                                {('manager' === roleCheck || 'admin' === roleCheck) ? <Text style={styles.cellhead}>ACTION</Text>

                                    : ''}
                            </View>
                            <View>
                                {filterbranch.length === 0 ?

                                    <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                        <Text style={{ fontWeight: '500' }}>No Available Branches</Text>
                                    </View>

                                    : <>


                                        {
                                            filterbranch.map((item, index) => (
                                                <View style={styles.row} key={index + 1}>
                                                    <Text style={styles.cell}>{index + 1}</Text>

                                                    <Text style={styles.cell}>{item.mobile}</Text>
                                                    <Text style={[styles.cell, { fontSize: responsiveFontSize(0.8), fontWeight: '500' }]}>{item.email}</Text>
                                                    <Text style={[styles.cell, { fontWeight: '800', fontSize: responsiveFontSize(0.8) }]}>{item.role}</Text>

                                                    <Text style={[styles.cell, { fontSize: responsiveFontSize(0.9) }]}>{item.date_joined}</Text>

                                                    {('admin' === roleCheck || 'manager' === roleCheck) ? <View style={[styles.cellAction, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>


                                                        <TouchableOpacity
                                                            onPress={() => handleEditClientmain(item)}
                                                            style={[{ minWidth: responsiveHeight(2.5), paddingVertical: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#52c41a', borderRadius: 5 }]}
                                                        >
                                                            <MaterialIcons name="edit" size={responsiveHeight(2)} color="#ffffff" />
                                                        </TouchableOpacity>
                                                        {'admin' === roleCheck &&
                                                            <TouchableOpacity onPress={() => handleDeleteClientmain(item.id)} style={[{ minWidth: responsiveHeight(2.5), paddingVertical: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: responsiveHeight(0.8), backgroundColor: '#dc3545', borderRadius: 5 }]}>
                                                                <MaterialIcons name="delete" size={responsiveHeight(2)} color="#ffffff" />
                                                            </TouchableOpacity>}









                                                        {/* 


                                                <TouchableOpacity onPress={() => handleDeleteClientmain(item.id)} style={[{ width: responsiveHeight(7), paddingVertical: 2, marginHorizontal: responsiveHeight(0.2), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#dc3545', borderRadius: 5, marginBottom: responsiveHeight(1) }]}>
                                                    <MaterialIcons name="delete" size={15} color="#ffffff" />
                                                    <Text style={{ color: '#ffffff', fontSize: responsiveFontSize(1.2) }}>Delete</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => handleEditClientmain(item)} style={[{ width: responsiveHeight(7), paddingVertical: 2, marginHorizontal: responsiveHeight(0.2), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#008CBA', borderRadius: 5 }]}>
                                                    <Feather name="edit" size={15} color="#ffffff" />
                                                    <Text style={{ color: '#ffffff', fontSize: responsiveFontSize(1.2) }}>Edit</Text>
                                                </TouchableOpacity> */}
                                                    </View> : ''}

                                                </View>
                                            ))}


                                    </>
                                }
                                {selectedBranchclient !== '' && <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                    {('manager' === roleCheck || 'admin' === roleCheck) ? <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: '#0386D0', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: responsiveHeight(1.2), paddingHorizontal: responsiveHeight(1), marginVertical: responsiveHeight(3), borderRadius: responsiveHeight(0.8) }}>
                                        {/* <Ionicons name="person-add-sharp" /> */}
                                        <MaterialIcons name="domain-add" size={responsiveHeight(2)} color="white" />
                                        {/* <SimpleLineIcons name="organization" size={responsiveHeight(2)} color="white" /> */}
                                        <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: responsiveFontSize(1), marginLeft: responsiveHeight(0.8), fontWeight: '600' }}>ADD BRANCH DETAILS</Text>
                                    </TouchableOpacity> : ''
                                    }
                                </View>}
                            </View>

                        </View>

                        {/* add  client */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                // Alert.alert('Modal has been closed.');
                                setModalVisible(!modalVisible);
                            }}>
                            <View style={styles.centeredView}>
                                <ScrollView style={{ marginTop: responsiveHeight(5) }}>

                                    <View style={styles.modalView}>
                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.2) }}>FIRST NAME</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => setFirstName(data)}
                                                value={firstName}
                                            />
                                        </View>
                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.2) }}> LAST NAME
                                            </Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => setlastName(data)}
                                                value={lastName}
                                            />
                                        </View>
                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.2) }}>EMAIL</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => handleInputEmail(data)}
                                                value={textEmail}
                                            />
                                        </View>
                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.2) }}>PHONE NUMBER</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => handleInputNumber(data)}
                                                value={textNumber}
                                                maxLength={10}
                                                keyboardType="number-pad"
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                            />
                                        </View>
                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.2) }}>PASSWORD</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => handleInputPassword(data)}
                                                value={textpassword}
                                            />
                                        </View>


                                        <View style={[styles.inputElementSelect, { marginVertical: responsiveHeight(1) }]}
                                        >
                                            <Picker
                                                style={{ fontSize: responsiveFontSize(4), height: responsiveHeight(5) }}
                                                selectedValue={selectedBranch}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    setselectedBranch(itemValue)
                                                }>
                                                <Picker.Item label="Select Role" value='' style={{ fontSize: responsiveFontSize(1.2) }}
                                                />
                                                {datagetbranch.map((item, index) => (
                                                    <Picker.Item key={index} label={item.name} value={item.username} style={{ fontSize: responsiveFontSize(1.2) }} />
                                                ))}
                                            </Picker>
                                        </View>

                                        <View style={[styles.inputElementSelect, { marginVertical: responsiveHeight(1) }]}
                                        >
                                            <Picker
                                                style={{ fontSize: responsiveFontSize(4), height: responsiveHeight(5) }}
                                                selectedValue={selectedrole}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    setselectedrole(itemValue)
                                                }>
                                                <Picker.Item label="Select Role" value='' style={{ fontSize: responsiveFontSize(1.5) }}
                                                />
                                                {role.map((item, index) => (
                                                    <Picker.Item key={index} label={item.toUpperCase()} value={item} style={{ fontSize: responsiveFontSize(1.2) }} />
                                                ))}
                                            </Picker>
                                        </View>


                                        <View style={{ marginVertical: responsiveHeight(1) }}>

                                            <TouchableOpacity style={[styles.inputElement, { width: responsiveHeight(30), height: responsiveHeight(4), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
                                                onPress={handelopenmodelAddressbranch}
                                            >
                                                <Entypo name="add-to-list" size={24} color="black" />
                                                <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.2), marginLeft: responsiveHeight(0.8) }}>ADD BRANCH</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {/* <Text style={styles.modalText}>Hello World!</Text> */}
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable
                                                style={[styles.button, styles.buttonSubmit]}
                                                onPress={onhandleSubmitClient}>
                                                <Text style={styles.textStyle}>SUBMIT</Text>
                                            </Pressable>



                                            <Pressable
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => setModalVisible(!modalVisible)}>
                                                <Text style={styles.textStyle}>CLOSE</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </Modal>


                        {/* address add */}
                        <Modal
                            animationType="slide"
                            // style={{
                            //     position: 'fixed',
                            // }}
                            transparent={true}
                            visible={openmodelAddressaddclient}
                            onRequestClose={() => {

                                setmodeladdressaddclient(!openmodelAddressaddclient);
                            }}>
                            <View style={styles.centeredView}>
                                <ScrollView style={{ marginTop: responsiveHeight(15) }} >

                                    <View style={styles.modalView}>
                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.2) }}>STATE</Text>
                                            <View style={[styles.inputElementSelect]}>
                                                <Picker
                                                    style={{ width: responsiveHeight(30), height: responsiveHeight(5), fontSize: responsiveFontSize(1) }}
                                                    selectedValue={textState}
                                                    onValueChange={(itemValue, itemIndex) =>
                                                        handleInputState(itemValue)
                                                    }>
                                                    <Picker.Item label="Select State" value='' style={{ fontSize: responsiveFontSize(1.3), fontWeight: '500' }} />
                                                    {statesInIndia.map((state, index) => (
                                                        <Picker.Item key={index} label={state.toUpperCase()} value={state} style={{ fontSize: responsiveFontSize(1.3) }} />
                                                    ))}
                                                </Picker>
                                            </View>
                                        </View>

                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.2) }}>DISTRICT</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => handleInputDistrict(data)}
                                                value={textDistrict}
                                            />
                                        </View>



                                        {/*                                         
                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>State</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => handleInputState(data)}
                                                value={textState}
                                            />
                                        </View> */}
                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.2) }}>CITY</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => handleInputLocation(data)}
                                                value={textLocation}
                                            />
                                        </View>


                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.2) }}>PINCODE</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => handleInputPinCode(data)}
                                                value={textpincode}
                                            />
                                        </View>
                                        <View style={{ marginVertical: responsiveHeight(1) }}>
                                            <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.2) }}>DIRECTION URL</Text>
                                            <TextInput
                                                style={styles.inputElement}
                                                onChangeText={data => handleInputDirection(data)}
                                                value={textDirection}
                                            />
                                        </View>



                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable
                                                style={[styles.button, styles.buttonSubmit]}
                                                onPress={() => onhandleBranch()}>
                                                <Text style={styles.textStyle}>SUBMIT</Text>
                                            </Pressable>


                                            <Pressable
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={closeAddressmodelclient}>
                                                <Text style={styles.textStyle}>CLOSE</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </ScrollView>

                            </View>
                        </Modal>


                        {/* client Edit  */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={openEditopenClientmain}
                            onRequestClose={() => {
                                // Alert.alert('Modal has been closed.');
                                setmodelEditopenClientmain(!openEditopenClientmain);
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ marginVertical: responsiveHeight(1) }}>
                                        <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>first Name</Text>
                                        <TextInput
                                            style={styles.inputElement}
                                            onChangeText={data => setFirstNameeditclient(data)}
                                            value={FirstNameeditclient}
                                        />
                                    </View>
                                    <View style={{ marginVertical: responsiveHeight(1) }}>
                                        <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}> last Name
                                        </Text>
                                        <TextInput
                                            style={styles.inputElement}
                                            onChangeText={data => setlastNameeditclient(data)}
                                            value={lastNameeditclient}
                                        />
                                    </View>
                                    <View style={{ marginVertical: responsiveHeight(1) }}>
                                        <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>Email</Text>
                                        <TextInput
                                            style={styles.inputElement}
                                            onChangeText={data => handleInputEmaileditclient(data)}
                                            value={Emaileditclient.toLocaleLowerCase()}
                                        />
                                    </View>
                                    <View style={{ marginVertical: responsiveHeight(1) }}>
                                        <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>Phone Number</Text>
                                        <TextInput
                                            style={styles.inputElement}
                                            onChangeText={data => handleInputNumbereditclient(data)}
                                            value={Numbereditclient}
                                        />
                                    </View>

                                    {/* 
                                    <View style={[styles.inputElementSelect, { marginVertical: responsiveHeight(1) }]}
                                    >
                                        <Picker
                                            style={{ fontSize: responsiveFontSize(4), height: responsiveHeight(5) }}
                                            selectedValue={selectedBranch}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setselectedBranch(itemValue)
                                            }>
                                            <Picker.Item label="Select Role" value='' style={{ fontSize: responsiveFontSize(1.5) }}
                                            />
                                            {datagetbranch.map((item, index) => (
                                                <Picker.Item key={index} label={item.username} value={item.username} style={{ fontSize: responsiveFontSize(1.5) }} />
                                            ))}
                                        </Picker>
                                    </View> */}

                                    {/* <View style={[styles.inputElementSelect, { marginVertical: responsiveHeight(1) }]}
                                    >
                                        <Picker
                                            style={{ fontSize: responsiveFontSize(4), height: responsiveHeight(5) }}
                                            selectedValue={selectedrole}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setselectedrole(itemValue)
                                            }>
                                            <Picker.Item label="Select Role" value='' style={{ fontSize: responsiveFontSize(1.5) }}
                                            />
                                            {role.map((item, index) => (
                                                <Picker.Item key={index} label={item} value={opensaveedit.organization} style={{ fontSize: responsiveFontSize(1.5) }} />
                                            ))}
                                        </Picker>
                                    </View> */}

                                    {/* <Text style={styles.modalText}>Hello World!</Text> */}
                                    <View style={{ flexDirection: 'row' }}>
                                        <Pressable
                                            style={[styles.button, styles.buttonSubmit]}
                                            onPress={onhandleSubmitClientedit}>
                                            <Text style={styles.textStyle}>Submit</Text>
                                        </Pressable>



                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            // () => setmodelEditopenClientmain(!openEditopenClientmain)
                                            onPress={onhandleEditmodelcloseclient}>
                                            <Text style={styles.textStyle}>Close</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </ScrollView>
                </>}

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
        height: responsiveHeight(4), width: responsiveHeight(30), borderColor: 'gray', borderWidth: 1, borderRadius: 5,
    },
    inputElementSelect: {
        minHeight: responsiveHeight(3), width: responsiveHeight(30), borderColor: 'gray', borderWidth: 1, borderRadius: 5
    },
    inputlable: {
        color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5)
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

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
        marginHorizontal: responsiveHeight(2)
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        marginTop: responsiveHeight(1),
        backgroundColor: '#2196F3',
    },
    buttonSubmit: {
        marginTop: responsiveHeight(1),
        backgroundColor: '#99CC00',
    },

    // 99CC00
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
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
        color: "white",
        fontSize: responsiveFontSize(1.1),
        textAlign: 'center',
        fontWeight: '500',
        borderColor: "black",
        flex: 1,
        backgroundColor: '#0083c2',
        paddingTop: responsiveHeight(0.5)


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
    cell: {
        flex: 1,

        borderWidth: 0.5,
        width: responsiveHeight(8),
        height: responsiveHeight(8),
        textAlign: "center",
        fontSize: 10,
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

    // absolute: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     bottom: 0,
    //     right: 0,
    //   },




    celltextdelete: {
        fontSize: responsiveFontSize(1),
        marginLeft: responsiveHeight(1.5)
    },

    // modelname:{
    //     color: 'gray', 
    //     fontWeight: 500,
    //     fontSize: responsiveFontSize(1.2),
    // }
});


export default Client_Page