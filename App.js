
// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Login_page from './components/Login_page';
// import Home_Page from './components/Home_Page';
// import About_Page from './components/About_Page';
// import Register_Page from './components/Register_Page';
// import User_Page from './components/User_Page';
// import Create_Ticket from './components/Create_Ticket';
// import Raised_Ticket from './components/Raised_Ticket';
// import Assign_Ticket from './components/Assign_Ticket';
// import PrinterTicket_Page from './components/PrinterTicket_Page';
// import Client_Page from './components/Client_Page';
// import Forgot_Passworrd from './components/Forgot_Passworrd';
// import Admin_assign_ticket from './components/Admin_assign_ticket';
// import Approvalticket from './components/Approvalticket';
// import ViewTicket from './components/ViewTicket';
// import CloseTickets from './components/CloseTickets';
// import Tickets from './components/Tickets';

// const Stack = createStackNavigator();

// const App = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

  
//   useEffect(() => {
//     const checkAuthentication = async () => {
//       try {
//         const jwtToken = await AsyncStorage.getItem('jwtToken');
//         if (jwtToken) {
//           setIsLoggedIn(true);
//         }
//       } catch (error) {
//         // console.error("Error checking JWT token", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuthentication();
//   }, []);

//   if (isLoading) {
//     // Render loading indicator or splash screen while checking authentication
//     // return null; // You can return a splash screen or loading indicator here
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={isLoggedIn ? 'HomePage' : 'LoginPage'}>
//         <Stack.Screen name="HomePage" component={Home_Page} options={{ headerShown: false }} />
//         <Stack.Screen name="LoginPage" component={Login_page} options={{ headerShown: false }} />
//         <Stack.Screen name="AboutPage" component={About_Page} options={{ headerShown: false }} />
//         <Stack.Screen name="RegisterPage" component={Register_Page} options={{ headerShown: false }} />
//         <Stack.Screen name="UserPage" component={User_Page} options={{ headerShown: false }} />
//         <Stack.Screen name="Create Ticket" component={Create_Ticket} />
//         <Stack.Screen name="Raised Ticket" component={Raised_Ticket} />
//         {/* <Stack.Screen name="Assign Tickets" component={Admin_assign_ticket} options={{ drawerLabel: 'AssignTicket' }} /> */}
//         <Stack.Screen name="Printerticket" component={PrinterTicket_Page} />

//         <Stack.Screen name="Verification Tickets" component={Approvalticket} />
//         <Stack.Screen name="ViewTicket" component={ViewTicket} />
//         <Stack.Screen name="Closed Tickets" component={CloseTickets} />
//         <Stack.Screen name="Change Password" component={Forgot_Passworrd} />
//         <Stack.Screen name="View Tickets" component={Tickets} />

//         {/* <Drawer.Screen name="View Tickets" component={Tickets} options={{ drawerLabel: 'View Tickets' }} /> */}
//         {/* CloseTickets */}

//         {/* Judgementticket */}
      
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import Login_page from './components/Login_page';
import Home_Page from './components/Home_Page';
import About_Page from './components/About_Page';
import Register_Page from './components/Register_Page';
import User_Page from './components/User_Page';
import Create_Ticket from './components/Create_Ticket';
import Raised_Ticket from './components/Raised_Ticket';
import PrinterTicket_Page from './components/PrinterTicket_Page';
import Forgot_Passworrd from './components/Forgot_Passworrd';
import Admin_assign_ticket from './components/Admin_assign_ticket';
import Approvalticket from './components/Approvalticket';
import ViewTicket from './components/ViewTicket';
import CloseTickets from './components/CloseTickets';
import Tickets from './components/Tickets';
import LogoutRequest from './components/Logoutrequest';
import NotificationsApp from './components/NotificationsApp';

import LocationtrackingApp from './components/LocationtrackingApp';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [navKey, setNavKey] = useState(0);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const jwtToken = await AsyncStorage.getItem('jwtToken');
        if (jwtToken) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        // console.error("Error checking JWT token", error);
      } finally {
        setIsLoading(false);
        // setNavKey(prevKey => prevKey + 1); // Update the key to force re-render
      }
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName={isLoggedIn ? 'HomePage' : 'LoginPage'}>
        <Stack.Screen name="HomePage" component={Home_Page} options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" component={Login_page} options={{ headerShown: false }} />
        <Stack.Screen name="AboutPage" component={About_Page} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterPage" component={Register_Page} options={{ headerShown: false }} />
        <Stack.Screen name="UserPage" component={User_Page} options={{ headerShown: false }} />
        <Stack.Screen name="Create Ticket" component={Create_Ticket} />
        <Stack.Screen name="Raised Ticket" component={Raised_Ticket} />
        <Stack.Screen name="logoutrequest" component={LogoutRequest}   options={{ headerShown: false }} />

        <Stack.Screen name="Printerticket" component={PrinterTicket_Page} />
        <Stack.Screen name="Verification Tickets" component={Approvalticket} />
        <Stack.Screen name="ViewTicket" component={ViewTicket} />
        <Stack.Screen name="Closed Tickets" component={CloseTickets} />
        <Stack.Screen name="Change Password" component={Forgot_Passworrd} />
        <Stack.Screen name="View Tickets" component={Tickets} />
        <Stack.Screen name="NotificationsApp" component={NotificationsApp} />
        <Stack.Screen name="LocationtrackingApp" component={LocationtrackingApp} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
