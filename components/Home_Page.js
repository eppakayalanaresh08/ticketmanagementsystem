
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
import Forgot_Passworrd from './Forgot_Passworrd';
import { useFocusEffect } from '@react-navigation/native';

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

import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import ProductPage from './ProductPage';
import Assign_Ticket from './Assign_Ticket';
import Profile_Page from './Profile_Page';
import Tickets from './Tickets';
import PrintedTickets from './PrinterTicket_Page';
import PrinterTicket_Page from './PrinterTicket_Page';


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

  const [data, setData] = useState([]);


  const [loading, setLoading] = useState(true);
  const [itemrolesave, setrolesave] = useState('')

  const [gettickets, settickethome] = useState([])

  // useEffect(() => {


  //   // Define the URL for the GET request
  //   const url = 'https://api.example.com/data';

  //   // Send the GET request
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       // Update state with the fetched data
  //       setData(data);
  //       // setLoading(false);
  //     })
  //     .catch(error => {
  //       // console.error('Error:', error);
  //       // setLoading(false);
  //     });

  //     setLoading(false)
  // }, []); 

  const fetchData = async () => {



    try {

      const role = await AsyncStorage.getItem('rolecheck');
      setrolesave(role)

      // getrolecheck = role
      // Retrieve JWT token from AsyncStorage
      // setRoleCheck(role)

      const jwtToken = await AsyncStorage.getItem('jwtToken');

      // Make GET request with JWT token
      const response = await fetch('https://shubhansh7777.pythonanywhere.com//ticket/dashboard/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log(responseData, 'newresponseSata')
      settickethome(responseData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
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


  const handleOnPageTicket=(item)=>{


    if(itemrolesave==='delivery_man' || itemrolesave==='technician'){
       navigation.navigate('MyTickets',{item})
    }
    else if(itemrolesave==='admin' || itemrolesave==='manager') {
      if('verification_ticket'===item){
        navigation.navigate('Verification Tickets')
         }
         else if('close_ticket'===item){
           navigation.navigate('Closed Tickets')
         }else if('all_ticket'===item){
           navigation.navigate('View Tickets')
         }else if('assigned_ticket'===item){
         navigation.navigate('View Tickets',{item})
     
         } else if('open_ticket'===item) {
           navigation.navigate('View Tickets',{item})
         }else if('active_ticket'===item){
           navigation.navigate('View Tickets',{item})
     
         }
    }

  //   if('verification_ticket'===item){
  //  navigation.navigate('Verification Tickets')
  //   }
  //   else if('close_ticket'===item){
  //     navigation.navigate('Closed Tickets')
  //   }else if('all_ticket'===item){
  //     navigation.navigate('View Tickets')
  //   }else if('assigned_ticket'===item){
  //   navigation.navigate('Assign Tickets')

  //   } else if('open_ticket'===item) {
  //     navigation.navigate('View Tickets',{item})
  //   }else if('active_ticket'===item){
  //     navigation.navigate('View Tickets',{item})

  //   }
    console.log(item)


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
  
  const Username = itemrolesave.replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <SafeAreaView style={{ marginHorizontal: responsiveHeight(0.5), flex: 1 }}>
      {loading ?
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
          <ActivityIndicator animating={loading} size="large" color="#0000ff" />
        </View> : <>
          <StatusBar />
          <ScrollView>
            <View style={{ marginLeft: responsiveHeight(2), marginBottom: responsiveHeight(5) }}>
              <Text style={{ color: '#212529', fontWeight: '600', fontSize: responsiveFontSize(3), marginVertical: responsiveHeight(1), marginTop: responsiveHeight(3) }}>{Username} Dashboard</Text>
              <Text style={{ fontSize: responsiveFontSize(1.8) }}>Welcome back to our management system!</Text>

            </View>

            <View style={styles.containerCard}>


              {Object.entries(gettickets)
                .filter(([key, value]) => value !== null)
                .map(([key, value]) => (
                  <TouchableOpacity key={key} style={styles.containerEachcard} onPress={()=>handleOnPageTicket(key)}>
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
      // Retrieve the access token from AsyncStorage

      // Remove the access token from AsyncStorage
      await AsyncStorage.removeItem('jwtToken');
      await AsyncStorage.removeItem('rolecheck');


      // Navigate to the LoginPage after successful logout
      navigation.navigate('LoginPage');
    } catch (error) {
      // Handle any errors that occur during the logout process
      console.error('Error occurred during logout:', error);
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
          backgroundColor: 'black', // Change this to whatever color you want
        },
        headerTintColor: 'white',
      }}
    >
      <Drawer.Screen name="Tickets" component={Home_Page} options={{ drawerLabel: 'Home' }} headerScreen='' />
      {(roleCheck === 'manager' || roleCheck === 'admin') && <Drawer.Screen name="Users" component={User_Page} options={{ drawerLabel: 'Users' }} />}
      { roleCheck === 'admin' && <Drawer.Screen name="Client" component={Client_Page} options={{ drawerLabel: 'Client' }} />}
      {(roleCheck === 'manager' || roleCheck === 'admin') && <Drawer.Screen name="Employees" component={Technicains} options={{ drawerLabel: 'Employees' }} />}
      {/* <Drawer.Screen name="Change Password" component={Forgot_Passworrd} options={{ drawerLabel: 'Change Password' }} /> */}
      {(roleCheck === 'manager' || roleCheck === 'admin') && <Drawer.Screen name="Products" component={ProductPage} options={{ drawerLabel: 'Products' }} />}
      {/* <Drawer.Screen name="Change Password" component={Forgot_Passworrd} options={{ drawerLabel: 'Change Password' }} /> */}
      {(roleCheck !== 'manager' && roleCheck !== 'admin') && <Drawer.Screen name="MyTickets" component={Assign_Ticket} options={{ drawerLabel: 'MyTickets' }} />}
      <Drawer.Screen name="Profile" component={Profile_Page} options={{ drawerLabel: 'Profile' }} />
      {/* {(roleCheck === 'manager' || roleCheck === 'admin') && <Drawer.Screen name="View Tickets" component={Tickets} options={{ drawerLabel: 'View Tickets' }} />} */}
      {/* {(roleCheck === 'manager' || roleCheck === 'admin') && <Drawer.Screen name="PrintedTickets" component={PrintedTickets} options={{ drawerLabel: 'PrintedTickets' }} />} */}
      <Drawer.Screen name="PrinterTicket_Page" component={PrinterTicket_Page} options={{ drawerLabel: 'PrinterTicket_Page' }} />

      {/* PrintedTickets */}
      {/* <Drawer.Screen name="Judgementticket" component={Judgementticket} options={{ drawerLabel: 'Judgementticket' }} /> */}
      {/* Profile_Page */}
    </Drawer.Navigator>
  )
}



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
