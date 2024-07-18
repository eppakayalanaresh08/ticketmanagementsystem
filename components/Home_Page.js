
import React, { useState, useEffect } from 'react';
import { Button, Text, TouchableOpacity, View, StyleSheet, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import User_Page from './User_Page';
import Client_Page from './Client_Page';
import Technicains from './Technicains';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import registerNNPushToken from 'native-notify';


import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import ProductPage from './ProductPage';
import Assign_Ticket from './Assign_Ticket';
import Profile_Page from './Profile_Page';



const ticketsData = [
  {
    id: 1,
    name: 'Active Tickets',
    count: 6
  },
  {
    id: 2,
    name: 'closed Tickets',
    count: 6
  },
  {
    id: 3,
    name: 'Total Tickets',
    count: 6
  },
  {
    id: 4,
    name: 'Not Assigend  Tickets',
    count: 6
  },
  {
    id: 5,
    name: 'Assigned(Not Stared) Tickets',
    count: 6
  },
  {
    id: 6,
    name: 'In Progress Tickets',
    count: 0
  }, {
    id: 7,
    name: 'Needs Verification Tickets',
    count: 0
  }
]

const SubmenuItem = [
  {
    id: 1,
    urlname: 'Create Ticket',
    subname: 'Create Ticket'

  },
  {
    id: 2,
    urlname: 'Raised Ticket',
    subname: 'Raised Ticket'


  },
  // {
  //   id: 3,
  //   urlname: 'Assign Tickets',
  //   subname: 'Assign Tickets'


  // }
  ,
  {
    id: 3,
    urlname: 'Verification Tickets',
    subname: 'Verification Tickets'
  },
  {
    id: 4,
    urlname: 'Closed Tickets',
    subname: 'Closed Tickets'
  }

]



const SubMenu = () => {
  const navigation = useNavigation();


  return (


    <View style={{ marginLeft: responsiveHeight(2) }}>

      <StatusBar style="light" />

      {
        SubmenuItem.map((item) => (
          <View style={{ padding: responsiveHeight(1.5) }} key={item.id}>
            <TouchableOpacity onPress={() => navigation.navigate(item.urlname)}>
              <Text style={{ fontWeight: '500' }}>{item.subname}</Text>
            </TouchableOpacity>
          </View>
        ))
      }
    </View>
  );
};


const Home_Page = () => {



  const [loading, setLoading] = useState(true);
  const [itemrolesave, setrolesave] = useState('')

  const [gettickets, settickethome] = useState([])




  const fetchData = async () => {



    try {

      const role = await AsyncStorage.getItem('rolecheck');
      setrolesave(role)


      const jwtToken = await AsyncStorage.getItem('jwtToken');

      const response = await fetch('https://shubhansh7777.pythonanywhere.com/ticket/dashboard/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        // throw new Error('Network response was not ok');
        const responseError = await response.json();
        if (responseError.detail === 'Session expired. Please login again.') {
          navigation.replace('LoginPage')
        }
        // console.log(responseError.detail,'bbhh')
      }

      const responseData = await response.json();
      // console.log(responseData, 'newresponseSata')
      settickethome(responseData);
      setLoading(false);
    } catch (error) {

      // console.error('Error fetching data:', error);
      setLoading(false);
    }


    //    console.log(getrolecheck,'checkrole')
    // setLoading(true);

  };

  useFocusEffect(
    React.useCallback(() => {
      // fetchDataProduct();
      fetchData()
    }, [])
  );


  const handleOnPageTicket = (item) => {


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





  const ticketLabels = {
    active_ticket: 'Active Tickets',
    all_ticket: 'Total Tickets',
    assigned_ticket: 'Assigned Tickets',
    close_ticket: 'Closed Tickets',
    open_ticket: 'Open Tickets',
    verification_ticket: 'Verification Tickets',
  };

  const navigation = useNavigation();

  // const Username = itemrolesave.replace(/\b\w/g, (char) => char.toUpperCase());
  const [address, setAddress] = useState(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  let text = 'Waiting..';


  return (
    <SafeAreaView style={{ marginHorizontal: responsiveHeight(0.5), flex: 1 }}>
      {loading ?
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
          <ActivityIndicator animating={loading} size="large" color="#0000ff" />
        </View> : <>
          <StatusBar />
          <ScrollView>

            <View style={{ marginLeft: responsiveHeight(2), marginBottom: responsiveHeight(5) }}>
              <Text style={{ color: '#212529', fontWeight: '600', fontSize: responsiveFontSize(3), marginVertical: responsiveHeight(1), marginTop: responsiveHeight(3) }}>  {itemrolesave.charAt(0).toUpperCase() + itemrolesave.slice(1).toLowerCase()} Dashboard</Text>
              <Text style={{ fontSize: responsiveFontSize(1.8), marginLeft: responsiveHeight(2) }}>Welcome back to our management system!</Text>
            </View>

            <View style={styles.containerCard}>


              {Object.entries(gettickets)
                .filter(([key, value]) => value !== null)
                .map(([key, value]) => (
                  <TouchableOpacity key={key} style={styles.containerEachcard} onPress={() => handleOnPageTicket(key)}>
                    <Text style={styles.eachElementname}>{ticketLabels[key] || key}</Text>
                    <Text>{value}</Text>
                  </TouchableOpacity>
                ))}


            </View>

          </ScrollView>
        </>}
    </SafeAreaView>
  );
};

const Drawer = createDrawerNavigator();



const AppDrawer = () => {
  const navigation = useNavigation();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [roleCheck, setRoleCheck] = useState('');
  const [loading, setLoading] = useState(true)
  // registerNNPushToken(21772, 'D9eOUSD7rCEiTi5bd5VV4d');

  const fetchingdata = async () => {
    setLoading(true)
    const jwtToken = await AsyncStorage.getItem('jwtToken')
    console.log(jwtToken)
    const role = await AsyncStorage.getItem('rolecheck');
    // getrolecheck = role
    // Retrieve JWT token from AsyncStorage
    setRoleCheck(role)
    setLoading(false)
  }


  useFocusEffect(
    React.useCallback(() => {
      fetchingdata()
    }, [])
  );


  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };





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


        navigation.replace('LoginPage')

      }




      // console.log(ticketCreate,'ticketCreate')


    } catch (error) {
      // console.error('POST request failed:', error);

    }

    const appId = 21772;
    const appToken = 'D9eOUSD7rCEiTi5bd5VV4d';




    try {
      const subidusername = await AsyncStorage.getItem('username');
      const response = await fetch(`https://app.nativenotify.com/api/app/indie/sub/${appId}/${appToken}/${subidusername}`, {
        method: 'DELETE'
      });
      const data = await response.json(); // Assuming response is JSON
      console.log('Subscription deleted successfully:', data);
      // return data; // Return data if needed
    } catch (error) {
      // console.error('Error deleting subscription:', error);
      // throw error; // Rethrow the error if necessary
    }









  };


  const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {('client' === roleCheck || roleCheck === 'admin' || roleCheck === 'manager') && <DrawerItem label="Tickets" onPress={toggleSubMenu} />}
      {('client' === roleCheck || roleCheck === 'admin' || roleCheck === 'manager') && showSubMenu && <SubMenu />}
      <DrawerItem label="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );


  return (

    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
      }}
    >
      <Drawer.Screen name="Tickets" component={Home_Page} options={{ drawerLabel: 'Home' }} headerScreen='' />
      {(roleCheck === 'manager' || roleCheck === 'admin') && <Drawer.Screen name="Users" component={User_Page} options={{ drawerLabel: 'Users' }} />}
      {roleCheck === 'admin' && <Drawer.Screen name="Client" component={Client_Page} options={{ drawerLabel: 'Client' }} />}
      {(roleCheck === 'manager' || roleCheck === 'admin') && <Drawer.Screen name="Employees" component={Technicains} options={{ drawerLabel: 'Employees' }} />}
      {(roleCheck === 'manager' || roleCheck === 'admin') && <Drawer.Screen name="Products" component={ProductPage} options={{ drawerLabel: 'Products' }} />}
      {(roleCheck !== 'manager' && roleCheck !== 'admin') && <Drawer.Screen name="MyTickets" component={Assign_Ticket} options={{ drawerLabel: 'MyTickets' }} />}
      <Drawer.Screen name="Profile" component={Profile_Page} options={{ drawerLabel: 'Profile' }} />
      {/* <Drawer.Screen name="LoginPage" component={Login_page}  /> */}


    </Drawer.Navigator>
  )
}


// {/* <Drawer.Screen name="Change Password" component={Forgot_Passworrd} options={{ drawerLabel: 'Change Password' }} /> */}
//     {/* <Drawer.Screen name="Change Password" component={Forgot_Passworrd} options={{ drawerLabel: 'Change Password' }} /> */}

//     {/* {(roleCheck === 'manager' || roleCheck === 'admin') && <Drawer.Screen name="View Tickets" component={Tickets} options={{ drawerLabel: 'View Tickets' }} />} */}
//     {/* {(roleCheck === 'manager' || roleCheck === 'admin') && <Drawer.Screen name="PrintedTickets" component={PrintedTickets} options={{ drawerLabel: 'PrintedTickets' }} />} */}
//     {/* <Drawer.Screen name="PrinterTicket_Page" component={PrinterTicket_Page} options={{ drawerLabel: 'PrinterTicket_Page' }} /> */}

//     {/* PrintedTickets */}
//     {/* <Drawer.Screen name="LoginPage" component={Login_page} options={{ drawerLabel: 'Judgementticket' }} /> */}
//     {/* Profile_Page */}



export default AppDrawer;

const styles = StyleSheet.create({
  containerCard: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  containerEachcard: {
    backgroundColor: '#ffffff',
    height: responsiveHeight(13),
    width: responsiveWidth(35),
    margin: responsiveHeight(2.5),
    padding: responsiveHeight(2),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveHeight(1),


    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  eachElementname: {
    textAlign: 'center',
    fontWeight: '500'
  }
});
