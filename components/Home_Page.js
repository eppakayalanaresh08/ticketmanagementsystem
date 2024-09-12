
// import React, { useState, useEffect } from 'react';
// import { Button, Text, TouchableOpacity, View, StyleSheet, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

// import User_Page from './User_Page';
// import Client_Page from './Client_Page';
// import Technicains from './Technicains';
// import * as Location from 'expo-location';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';

// import registerNNPushToken from 'native-notify';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import { MaterialCommunityIcons } from '@expo/vector-icons';


// // import userLocationTracking from './LocationtrackingApp';


// // import useLocationTracking from './LocationtrackingApp';
// import UseLocationTracking from './LocationtrackingApp';


// import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
// import ProductPage from './ProductPage';
// import Assign_Ticket from './Assign_Ticket';
// import Profile_Page from './Profile_Page';
// import Locationagent from './Locationagnet';



// const ticketsData = [
//   {
//     id: 1,
//     name: 'Active Tickets',
//     count: 6
//   },
//   {
//     id: 2,
//     name: 'closed Tickets',
//     count: 6
//   },
//   {
//     id: 3,
//     name: 'Total Tickets',
//     count: 6
//   },
//   {
//     id: 4,
//     name: 'Not Assigend  Tickets',
//     count: 6
//   },
//   {
//     id: 5,
//     name: 'Assigned(Not Stared) Tickets',
//     count: 6
//   },
//   {
//     id: 6,
//     name: 'In Progress Tickets',
//     count: 0
//   }, {
//     id: 7,
//     name: 'Needs Verification Tickets',
//     count: 0
//   }
// ]

// const SubmenuItem = [
//   {
//     id: 1,
//     urlname: 'Create Ticket',
//     subname: 'Create Ticket'

//   },
//   {
//     id: 2,
//     urlname: 'Raised Ticket',
//     subname: 'Raised Ticket'

//   },
//   // {
//   //   id: 3,
//   //   urlname: 'Assign Tickets',
//   //   subname: 'Assign Tickets'


//   // }
//   ,
//   {
//     id: 3,
//     urlname: 'Verification Tickets',
//     subname: 'Verification Tickets'
//   },
//   {
//     id: 4,
//     urlname: 'Closed Tickets',
//     subname: 'Closed Tickets'
//   }

// ]



// const SubMenu = () => {
//   const navigation = useNavigation();


//   return (


//     <View style={{ marginLeft: responsiveHeight(2) }}>

//       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" translucent />

//       {
//         SubmenuItem.map((item) => (
//           <View style={{ padding: responsiveHeight(1.5) }} key={item.id}>
//             <TouchableOpacity onPress={() => navigation.navigate(item.urlname)}>
//               <Text style={{ fontWeight: '500' }}>{item.subname}</Text>
//             </TouchableOpacity>
//           </View>
//         ))
//       }
//     </View>
//   );
// };


// const Home_Page = () => {



//   const [loading, setLoading] = useState(true);
//   const [itemrolesave, setrolesave] = useState('')

//   const [gettickets, settickethome] = useState([])

//   // UseLocationTracking()


//   // useEffect(() => {


//   //   // Request permission to access location
//   //   (async () => {
//   //     let { status } = await Location.requestForegroundPermissionsAsync();
//   //     if (status !== 'granted') {
//   //       console.log('Permission to access location was denied');
//   //       return;
//   //     }

//   //     // Subscribe to location updates
//   //     Location.watchPositionAsync({ accuracy: Location.Accuracy.High, timeInterval: 5000 }, (location) => {
//   //       console.log(location.coords.latitude, location.coords.longitude)

//   //       // Send location data to server
//   //       sendLocationToServer(location.coords.latitude, location.coords.longitude);
//   //     });
//   //   })();
//   // }, []);

//   // const sendLocationToServer = async (latitude, longitude) => {

//   //   try {



//   //     const jwtToken = await AsyncStorage.getItem('jwtToken');
//   //     const agent_Id = await AsyncStorage.getItem('userId');

//   //     console.log(agent_Id,'agent_Id')


//   //     const locationData={
//   //       latitude,
//   //       longitude,
//   //       "agent": parseInt(agent_Id)
//   //     }

//   //      console.log(locationData,'locationData')

//   //     const response = await fetch('https://shubhansh7777.pythonanywhere.com/agent/location/', {
//   //       method: 'POST',
//   //       headers: {
//   //         Authorization: `Bearer ${jwtToken}`,
//   //        'Content-Type': 'application/json',

//   //       },
//   //       body: JSON.stringify(locationData),
//   //     });

//   //     if (!response.ok) {
//   //       // throw new Error('Network response was not ok');
//   //       const responseErrorlocation = await response.json();
//   //       console.log(responseErrorlocation,'bbhh')
//   //     }

//   //     const responseDatalocation = await response.json();
//   //     console.log(responseDatalocation,'responseDatalocation')
//   //     // console.log(responseData, 'newresponseSata')
//   //     setLoading(false);
//   //   } catch (error) {

//   //     console.error('Error fetching data:', error);
//   //     setLoading(false);
//   //   }


//   // };




//   const fetchData = async () => {




//     try {

//       const role = await AsyncStorage.getItem('rolecheck');
//       setrolesave(role)


//       const jwtToken = await AsyncStorage.getItem('jwtToken');

//       const response = await fetch('https://shubhansh7777.pythonanywhere.com/ticket/dashboard/', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       });

//       if (!response.ok) {
//         // throw new Error('Network response was not ok');
//         const responseError = await response.json();
//         if (responseError.detail === 'Session expired. Please login again.') {
//           navigation.replace('LoginPage')
//         }
//         // console.log(responseError.detail,'bbhh')
//       }

//       const responseData = await response.json();
//       // console.log(responseData, 'newresponseSata')
//       settickethome(responseData);
//       setLoading(false);
//     } catch (error) {

//       // console.error('Error fetching data:', error);
//       setLoading(false);
//     }


//     //    console.log(getrolecheck,'checkrole')
//     // setLoading(true);

//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       // fetchDataProduct();
//       fetchData()
//     }, [])
//   );


//   const handleOnPageTicket = (item) => {


//     if (itemrolesave === 'delivery_man' || itemrolesave === 'technician') {
//       navigation.navigate('MyTickets', { item })
//     }
//     else if (itemrolesave === 'admin' || itemrolesave === 'manager') {
//       if ('verification_ticket' === item) {
//         navigation.navigate('Verification Tickets')
//       }
//       else if ('close_ticket' === item) {
//         navigation.navigate('Closed Tickets')
//       } else if ('all_ticket' === item) {
//         navigation.navigate('View Tickets')
//       } else if ('assigned_ticket' === item) {
//         navigation.navigate('View Tickets', { item })

//       } else if ('open_ticket' === item) {
//         navigation.navigate('View Tickets', { item })
//       } else if ('active_ticket' === item) {
//         navigation.navigate('View Tickets', { item })

//       }
//     }




//   }





//   const ticketLabels = {
//     active_ticket: 'Active Tickets',
//     all_ticket: 'Total Tickets',
//     assigned_ticket: 'Assigned Tickets',
//     close_ticket: 'Closed Tickets',
//     open_ticket: 'Open Tickets',
//     verification_ticket: 'Verification Tickets',
//   };

//   const navigation = useNavigation();

//   // const Username = itemrolesave.replace(/\b\w/g, (char) => char.toUpperCase());
//   const [address, setAddress] = useState(null);

//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   let text = 'Waiting..';


//   return (
//     <SafeAreaView style={{ marginHorizontal: responsiveHeight(0.5), flex: 1 }}>
//       {loading ?
//         <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
//           <ActivityIndicator animating={loading} size="large" color="#0000ff" />
//         </View> : <>
//           <StatusBar />
//           <ScrollView>

//             <View style={{ marginLeft: responsiveHeight(2), marginBottom: responsiveHeight(5) }}>
//               <Text style={{ color: '#212529', fontWeight: '600', fontSize: responsiveFontSize(3), marginVertical: responsiveHeight(1), marginTop: responsiveHeight(3) }}>  {itemrolesave.charAt(0).toUpperCase() + itemrolesave.slice(1).toLowerCase()} Dashboard</Text>
//               <Text style={{ fontSize: responsiveFontSize(1.8), marginLeft: responsiveHeight(2) }}>Welcome back to our management system!</Text>
//             </View>

//             <View style={styles.containerCard}>


//               {Object.entries(gettickets)
//                 .filter(([key, value]) => value !== null)
//                 .map(([key, value]) => (
//                   <TouchableOpacity key={key} style={styles.containerEachcard} onPress={() => handleOnPageTicket(key)}>
//                     <Text style={styles.eachElementname}>{ticketLabels[key] || key}</Text>
//                     <Text>{value}</Text>
//                   </TouchableOpacity>
//                 ))}


//             </View>

//           </ScrollView>
//         </>}
//     </SafeAreaView>
//   );
// };



// const Drawer = createDrawerNavigator();



// const AppDrawer = () => {
//   const navigation = useNavigation();
//   const [showSubMenu, setShowSubMenu] = useState(false);
//   const [roleCheck, setRoleCheck] = useState('');
//   const [loading, setLoading] = useState(true)
//   // registerNNPushToken(21772, 'D9eOUSD7rCEiTi5bd5VV4d');

//   const fetchingdata = async () => {
//     setLoading(true)
//     const jwtToken = await AsyncStorage.getItem('jwtToken')
//     console.log(jwtToken)
//     const role = await AsyncStorage.getItem('rolecheck');
//     // getrolecheck = role
//     // Retrieve JWT token from AsyncStorage
//     setRoleCheck(role)
//     setLoading(false)
//   }


//   useFocusEffect(
//     React.useCallback(() => {
//       fetchingdata()
//     }, [])
//   );


//   const toggleSubMenu = () => {
//     setShowSubMenu(!showSubMenu);
//   };





//   const handleLogout = async () => {


//     try {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');

//       const url = 'https://shubhansh7777.pythonanywhere.com/account/logout/'; // Replace with your API endpoint

//       const options = {
//         method: 'POST', // Specify POST method
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${jwtToken}`,
//         },
//         body: JSON.stringify({}), // Stringify the data object for the request body
//       };

//       const response = await fetch(url, options);
//       console.log(response, 'response')

//       if (!response.ok) {
//         const errorticket = await response.json();
//         // console.log(errorticket,'errorticket')

//       } else if (response.status === 200) {

//         const responseDatalogout = await response.json();

//         await AsyncStorage.removeItem('jwtToken');
//         await AsyncStorage.removeItem('rolecheck');
//         await AsyncStorage.removeItem('username');
//         await AsyncStorage.removeItem('userId');


//         navigation.replace('LoginPage')

//       }




//       // console.log(ticketCreate,'ticketCreate')


//     } catch (error) {
//       // console.error('POST request failed:', error);

//     }

//     const appId = 21772;
//     const appToken = 'D9eOUSD7rCEiTi5bd5VV4d';




//     try {
//       const subidusername = await AsyncStorage.getItem('username');
//       const response = await fetch(`https://app.nativenotify.com/api/app/indie/sub/${appId}/${appToken}/${subidusername}`, {
//         method: 'DELETE'
//       });
//       const data = await response.json(); // Assuming response is JSON
//       console.log('Subscription deleted successfully:', data);
//       // return data; // Return data if needed
//     } catch (error) {
//       // console.error('Error deleting subscription:', error);
//       // throw error; // Rethrow the error if necessary
//     }









//   };


//   const CustomDrawerContent = (props) => (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       {('client' === roleCheck || roleCheck === 'admin' || roleCheck === 'manager') && <DrawerItem label="Tickets" onPress={toggleSubMenu} />}
//       {('client' === roleCheck || roleCheck === 'admin' || roleCheck === 'manager') && showSubMenu && <SubMenu />}
//       <DrawerItem label="Logout" onPress={handleLogout} />
//     </DrawerContentScrollView>
//   );


//   return (

//     <Drawer.Navigator
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: 'black',
//         },
//         headerTintColor: 'white',
//       }}
//     >
//       <Drawer.Screen name="Tickets" component={Home_Page} options={{ drawerLabel: 'Home' }} headerScreen='' />
//       {(roleCheck === 'manager' || roleCheck === 'admin') && <Drawer.Screen name="Users" component={User_Page} options={{ drawerLabel: 'Users' }} />}
//       {roleCheck === 'admin' && <Drawer.Screen name="Client" component={Client_Page} options={{ drawerLabel: 'Client' }} />}
//       {(roleCheck === 'manager' || roleCheck === 'admin') && <Drawer.Screen name="Employees" component={Technicains} options={{ drawerLabel: 'Employees' }} />}
//       {(roleCheck === 'manager' || roleCheck === 'admin') && <Drawer.Screen name="Products" component={ProductPage} options={{ drawerLabel: 'Products' }} />}
//       {(roleCheck !== 'manager' && roleCheck !== 'admin') && <Drawer.Screen name="MyTickets" component={Assign_Ticket} options={{ drawerLabel: 'MyTickets' }} />}
//       <Drawer.Screen name="Profile" component={Profile_Page} options={{ drawerLabel: 'Profile' }} />

//     </Drawer.Navigator>
//   )
// }



// export default AppDrawer;

// const styles = StyleSheet.create({
//   containerCard: {
//     flexDirection: 'row',
//     flexWrap: 'wrap'
//   },
//   containerEachcard: {
//     backgroundColor: '#ffffff',
//     height: responsiveHeight(13),
//     width: responsiveWidth(35),
//     margin: responsiveHeight(2.5),
//     padding: responsiveHeight(2),
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: responsiveHeight(1),


//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 4,
//   },
//   eachElementname: {
//     textAlign: 'center',
//     fontWeight: '500'
//   }
// });





import React, { useState, useEffect, useCallback } from 'react';
import Assign_Ticket from './Assign_Ticket';
import Profile_Page from './Profile_Page';
import { Text, View, StyleSheet, ActivityIndicator, Image, TouchableOpacity, RefreshControl, ScrollView, SafeAreaView, Alert, Button, Modal } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import * as Updates from 'expo-updates';
function Home() {


  const [loading, setLoading] = useState(true);
  const [itemrolesave, setrolesave] = useState('')

  const [getTickets, settickethome] = useState({})
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [nameList, setNameList] = useState({})
  const navigation = useNavigation();

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(true);

  // eas update --branch preview --message "newupdateversi0"

  // useEffect(() => {
  //   async function checkForUpdates() {
  //     try {
  //       const update = await Updates.checkForUpdateAsync();
  //       if (update.isAvailable) {
  //         await Updates.fetchUpdateAsync();
  //         Alert.alert(
  //           'Update Available',
  //           'A new update is available. Restart the app to apply the update.',
  //           [
  //             { text: 'Restart', onPress: () => Updates.reloadAsync() }
  //           ]
  //         );
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }

  //   checkForUpdates();
  // }, []);

  


  // useEffect(() => {
  //   async function checkForUpdates() {
  //     try {
  //       const update = await Updates.checkForUpdateAsync();
  //       if (update.isAvailable) {
  //         await Updates.fetchUpdateAsync();
  //         // Notify the user that an update is available and prompt to restart
  //         Alert.alert(
  //           'Update available',
  //           'A new update is available. Restart the app to apply the update.',
  //           [
  //             { text: 'Cancel', style: 'cancel' },
  //             { text: 'Restart', onPress: () => Updates.reloadAsync() }
  //           ]
  //         );
  //       }
  //     } catch (e) {
  //       // Handle or log the error
  //       console.error(e);
  //     }
  //   }

  //   checkForUpdates();
  // }, []);





  
  async function checkForUpdates() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await AsyncStorage.setItem('updatePromptShown', 'true');
        setUpdateAvailable(true);

      }
    } catch (e) {
      console.error(e);
    }
  };




  useEffect(() => {

    checkForUpdates();
  }, []);



  





  async function initializeUpdateCheck() {
    // console.log('jkjjhn')
    const updatePromptShown = await AsyncStorage.getItem('updatePromptShown');
    console.log(updatePromptShown, 'updatePromptShown')
    if (updatePromptShown === 'true') {
      // console.log('kj')
      setUpdateAvailable(true);

    } else {
      checkForUpdates();

    }
  }












  useEffect(() => {
    setCurrentDate(new Date());
    
  }, []);




  const getDayOfWeek = (date) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  };

  const getMonth = (date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[date.getMonth()];
  };

  const getDayOfMonth = (date) => {
    return date.getDate();
  };





  const fetchingdata = async () => {


    try {

      const role = await AsyncStorage.getItem('rolecheck');
      setrolesave(role)



      const jwtToken = await AsyncStorage.getItem('jwtToken');
      console.log(jwtToken, 'hj')

      const response = await fetch('https://shubhansh7777.pythonanywhere.com/ticket/dashboard/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        // throw new Error('Network response was not ok');
        const responseError = await response.json();
        console.log(responseError, 'responseError')
        if (responseError.detail === 'Session expired. Please login again.') {
          navigation.replace('LoginPage')
        } else if (responseError.detail === 'Invalid token or session expired. Please login again.') {
          navigation.replace('LoginPage')
        }
      }

      const responseData = await response.json();
      // console.log(responseData, 'newresponseSata')
      settickethome(responseData);
      console.log(responseData.status, 'responseData')
      setLoading(false);

      const response2 = await fetch('https://shubhansh7777.pythonanywhere.com/account/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response2.ok) {
        const responseError = await response2.json();
        if (responseError.detail === 'Session expired. Please login again.') {
          navigation.replace('LoginPage');
          return; // Exit early if session is expired
        }
        throw new Error('Failed to fetch data from the second API');
      }

      const responseData2 = await response2.json();
      // Handle the data from the second API
      console.log(responseData2, 'responseData2');
      setNameList(responseData2)
      setLoading(false);
      setRefreshing(false);

    } catch (error) {

      // console.error('Error fetching data:', error);
      setLoading(false);
    }




  };






  useFocusEffect(
    React.useCallback(() => {
      fetchingdata()
    }, [])
  );




  const handleUpgrade = async () => {
    setIsUpdating(true);
    // setLoading(true);
    setUpdateAvailable(false);
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
      await AsyncStorage.removeItem('updatePromptShown');
      setUpdateAvailable(false);

    } catch (e) {
      console.error(e);
      setIsUpdating(false);

      // setLoading(false);

    }
  };





  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchingdata()
    checkForUpdates();
    initializeUpdateCheck();


  }, []);


  const handleLogout = async () => {


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
      console.log(response, 'response')

      if (!response.ok) {
        const errorticket = await response.json();
        // console.log(errorticket,'errorticket')

      } else if (response.status === 200) {

        const responseDatalogout = await response.json();

        await AsyncStorage.removeItem('jwtToken');
        await AsyncStorage.removeItem('rolecheck');
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('userId');


        navigation.replace('LoginPage')

      }


    } catch (error) {

    }

    const appId = 21772;
    const appToken = 'D9eOUSD7rCEiTi5bd5VV4d';




    try {
      const subidusername = await AsyncStorage.getItem('username');
      const response = await fetch(`https://app.nativenotify.com/api/app/indie/sub/${appId}/${appToken}/${subidusername}`, {
        method: 'DELETE'
      });
      const data = await response.json(); // Assuming response is JSON

    } catch (error) {

    }

  }



  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }




  // if (isUpdating) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }






  const handleOnPageTicket = async (item) => {
    console.log(itemrolesave, 'hh')

    if (itemrolesave === 'delivery_man' || itemrolesave === 'technician') {
      navigation.navigate('MyTickets', { item })
    }
    else if (itemrolesave === 'admin' || itemrolesave === 'manager') {
      if ('verification_ticket' === item) {
        navigation.navigate('Verification Tickets')
      }
      else if ('close_ticket' === item) {
        navigation.navigate('Closed Tickets')
      } else if ('all_ticket' === item) {
        navigation.navigate('View Tickets')
      } else if ('assigned_ticket' === item) {
        navigation.navigate('View Tickets', { item })

      } else if ('open_ticket' === item) {
        navigation.navigate('View Tickets', { item })
      } else if ('active_ticket' === item) {
        navigation.navigate('View Tickets', { item })

      }
    }
  }








  return (
    <>


      <SafeAreaView style={{ flex: 1, }} >



      <Modal
            transparent={true}
            animationType="slide"
            visible={updateAvailable}
            onRequestClose={handleUpgrade}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>

                <Image source={require('../assets/rocket.webp')} style={{ height: responsiveHeight(9), width: responsiveHeight(9) }} />
           
                <View style={{ flexDirection: 'row', width: '95%', justifyContent: 'space-between', marginTop: responsiveHeight(2) }}>
                  <Text style={{ fontSize: responsiveFontSize(1.5), fontWeight: '800' }}>
                    New Update Available
                  </Text>
                  <Text style={{ color: '#FF1B5E', fontWeight: '500' }}>V2.10</Text>
                </View>
                <View style={{ width: '90%', marginVertical: responsiveHeight(0.8) }}>
                  <Text style={styles.modalText}>1.Bugs Fixed</Text>
                  <Text style={styles.modalText}>2.Design Improvements</Text>
                  <Text style={styles.modalText}>3.New Functionalities</Text>
                  <Text style={styles.modalText}>4.Fast Loading Speed</Text>

                </View>


                <TouchableOpacity style={{ backgroundColor: '#FF1B5E', padding: responsiveHeight(1.2), borderRadius: responsiveHeight(1), marginTop: responsiveHeight(2) }} onPress={handleUpgrade}

                >
                  <Text style={{ color: '#ffffff', fontSize: responsiveFontSize(1.5), fontWeight: '600' }}>Update Now</Text>
                </TouchableOpacity>
              
              </View>
            </View>
          </Modal>



        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#8B78FF" // Customize refresh control color
          />
        }>



          <View style={{ flex: 1, marginHorizontal: responsiveHeight(3), marginTop: responsiveHeight(3) }}>
            <View style={styles.profileContainer}>
              <View>
                <Text style={styles.dayname}>{getDayOfWeek(currentDate)}</Text>
                <Text style={styles.monthname}>{getDayOfMonth(currentDate)} {getMonth(currentDate)}</Text>
              </View>
              <View>
                {/* <Image source={require('../assets/user.png')} style={styles.image} /> */}
                <TouchableOpacity onPress={handleLogout}>
                  {/* <AntDesign name="logout" size={responsiveHeight(4)} color="#8B78FF" /> */}
                  <MaterialIcons name="logout" size={responsiveHeight(4.2)} color="#8B78FF" />
                </TouchableOpacity>
              </View>

            </View>
            <View style={{ marginTop: responsiveHeight(2) }}>
              <Text style={styles.usernametext}>Hi {nameList.first_name}.</Text>
              <Text style={styles.counttextverification}>{getTickets.verification_ticket} Tickets are in verification </Text>
            </View>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <LinearGradient
              colors={['#5451D6', '#8B78FF'
              ]} // Gradient colors
              style={styles.card}
            >
              <View style={styles.informationcard}>
                <View>
                  <Text style={styles.texttickets}>Information Banner.</Text>
                  <View>
                    <Image source={require('../assets/ticket.png')} style={styles.imageTicket} />
                  </View>
                </View>
                <View>
                  <Text style={styles.textsee}>See</Text>
                </View>
              </View>
            </LinearGradient>

            <View style={[styles.containerCard, { marginTop: responsiveHeight(2) }]} >
              <LinearGradient
                colors={['#A9FFEA',
                  '#00B288'
                ]} // Gradient colors
                style={[styles.cardCountOne, styles.countItme]}

              >


                <TouchableOpacity onPress={() => handleOnPageTicket('active_ticket')} style={styles.countItme}>

                  <Text style={styles.textCount}>{getTickets.active_ticket}</Text>
                  <Text style={styles.textname}>Active Tickets</Text>
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                colors={['#FFD29D',
                  '#FF9E2D'
                ]} // Gradient colors
                style={[styles.cardCountTwo, styles.countItme]}
              >
                <TouchableOpacity onPress={() => handleOnPageTicket('verification_ticket')} style={styles.countItme}>
                  <Text style={styles.textCount}>{getTickets.verification_ticket}</Text>

                  <Text style={styles.textname}>Verification Tickets</Text>
                </TouchableOpacity>
              </LinearGradient>


            </View>



            <View style={[styles.containerCard, { marginTop: responsiveHeight(1) }]}>
              <LinearGradient
                colors={['#FFA0BC',
                  '#FF1B5E'
                ]} // Gradient colors


                style={[styles.cardCountTwo, styles.countItme]}

              >
                <TouchableOpacity onPress={() => handleOnPageTicket('close_ticket')} style={styles.countItme}>
                  <Text style={styles.textCount}>{getTickets.close_ticket}</Text>
                  <Text style={styles.textname}>Close Tickets</Text>
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                colors={['#B1EEFF',
                  '#29BAE2'
                ]}
                style={[styles.cardCountOne, styles.countItme, { top: -45 }]}

              >
                <TouchableOpacity onPress={() => handleOnPageTicket('assigned_ticket')} style={styles.countItme}>
                  <Text style={styles.textCount}>{getTickets.assigned_ticket}</Text>

                  <Text style={styles.textname}>Assigned Tickets</Text>
                </TouchableOpacity>

              </LinearGradient>




            </View>
            <View style={[{ flex: 1, alignSelf: 'flex-start' }, styles.cardCount]}>

              <LinearGradient
                colors={['#f97ad1',
                  '#9f0f94'
                ]} // Gradient colors
                style={[styles.countlastCard, styles.countItme]}
              >

                <TouchableOpacity style={[styles.countItme]} onPress={() => handleOnPageTicket('all')}>
                  <Text style={styles.textCount}>{getTickets.all_ticket}</Text>

                  <Text style={styles.textname}>Total Tickets</Text>


                </TouchableOpacity>
              </LinearGradient>



            </View>


          </View>
        </ScrollView>
      </SafeAreaView>

    </>
  );
}


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#8B78FF',
        headerShown: false,
        tabBarStyle: {
          height: responsiveHeight(8.5),
          paddingBottom: responsiveHeight(1),
          paddingTop: 10,
        },

      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',

          tabBarIcon: ({ focused, color, size }) => (
            <Animatable.View
              animation={focused ? 'bounceIn' : undefined}
              style={focused ? styles.animatableIcon : styles.animatableIconHidden}
            >
              <Image source={require('../assets/homeicon.png')} style={styles.imageIcon} />

            </Animatable.View>
          ),
        }}
      />
      <Tab.Screen
        name="MyTickets"
        component={Assign_Ticket}
        options={{
          tabBarLabel: 'Tickets',
          tabBarIcon: ({ focused, color, size }) => (
            <Animatable.View
              animation={focused ? 'bounceIn' : undefined}
              style={focused ? styles.animatableIcon : styles.animatableIconHidden}
            >
              <Image source={require('../assets/ticket.png')} style={styles.imageIcon} />
            </Animatable.View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile_Page}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Animatable.View
              animation={focused ? 'bounceIn' : undefined}
              style={focused ? styles.animatableIcon : styles.animatableIconHidden}
            >
              <Image source={require('../assets/user.png')} style={styles.imageIcon} />
            </Animatable.View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Home_Page() {
  return (
    <MyTabs />
  );
}



const styles = StyleSheet.create({
  profileContainer: {
    //  flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card: {
    width: '90%', // Customize width
    height: 100, // Customize height
    padding: 20,
    borderRadius: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 20,
  },
  dayname: {
    color: '#7F7F7F',
    fontSize: responsiveFontSize(2)
  },
  monthname: {
    color: '#040415',
    fontSize: responsiveFontSize(3),
    fontWeight: '800'
  },
  containerCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%'


  },

  cardCountOne: {
    width: '42%', // Customize width
    height: responsiveHeight(21),


  },
  countlastCard: {

    width: '100%', // Customize width
    height: responsiveHeight(21),

  },

  countItme: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveHeight(2)

  },

  cardCountTwo: {
    width: '42%', // Customize width
    height: responsiveHeight(15),

  },
  textCount: {
    color: '#ffffff',
    fontSize: responsiveFontSize(4),
    fontWeight: '500'
  },
  textname: {
    color: '#ffffff',

  }
  , usernametext: {
    color: '#2F394B',
    fontSize: responsiveFontSize(3),
    fontWeight: '500',
  }
  , counttextverification: {
    color: '#8D8D8D',
    marginVertical: responsiveHeight(0.8)

  },
  cardCount: {
    flexDirection: 'row',
    width: '90%',
    marginHorizontal: responsiveHeight(2),
    top: -40

  },
  image: {
    height: responsiveHeight(6),
    width: responsiveHeight(6)
  },
  texttickets: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: responsiveFontSize(1.8)

  },
  imageTicket: {
    height: responsiveHeight(4),
    width: responsiveHeight(4),
    marginTop: responsiveHeight(1)
  },
  informationcard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'

  },
  textsee: {
    color: '#ffffff',
    fontWeight: '600'
  },
  imageIcon: {
    height: responsiveHeight(4),
    width: responsiveHeight(4),
    // marginBottom: responsiveHeight(1)
  },
  animatableIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveHeight(6),
    height: responsiveHeight(6),
    borderRadius: responsiveHeight(3),
    backgroundColor: '#8B78FF',
    marginBottom: responsiveHeight(2.5)
  },
  animatableIconHidden: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },



  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: responsiveFontSize(1.3),
    color: '#808080',
    fontWeight: '400',
    marginVertical: responsiveHeight(0.1)
    // marginBottom: 20,
  },
})