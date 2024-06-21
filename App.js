// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });




















// // AuthNavigator.js
// import React, { useEffect, useState } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// // import LoginScreen from './LoginScreen';
// // import HomeScreen from './HomeScreen';
// import Login from './components/Login';
// import HomePage from './components/HomePage';

// // import {HomePage} from './components/HomePage'

// // import Home from './components/HomePage';

// const Stack = createStackNavigator();

// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Check AsyncStorage for authentication state
//     AsyncStorage.getItem('isAuthenticated').then(value => {
//       if (value !== null) {
//         setIsAuthenticated(JSON.parse(value));
//       }
//     });
//   }, []);

//   const handleLogin = () => {
//     // Perform login logic here
//     // If login is successful, set isAuthenticated to true and store it in AsyncStorage
//     setIsAuthenticated(true);
//     AsyncStorage.setItem('isAuthenticated', JSON.stringify(true));
//   };

//   const handleLogout = () => {
//     // Perform logout logic here
//     // Set isAuthenticated to false and remove it from AsyncStorage
//     setIsAuthenticated(false);
//     console.log('logout')
//     AsyncStorage.removeItem('isAuthenticated');
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {isAuthenticated ? (
//           <Stack.Screen
//             name="Home"
//             options={{ headerShown: false }}
//           >
//             {props => <HomePage  {...props} onLogout={handleLogout}/>}
//           </Stack.Screen>
//         ) : (
//           <Stack.Screen
//             name="Login"
//             component={Login}

//             options={{ headerShown: false }}
//             initialParams={{ onLogin: handleLogin }}
//           />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }







// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack';

// import Login_page from './components/Login_page';
// import Home_Page from './components/Home_Page';

// const App = () => {
//   const Stack = createStackNavigator();

//   return (
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="LoginPage">
//           <Stack.Screen name="LoginPage" component={Login_page} options={{headerShown:false}}/>

//           <Stack.Screen name="HomePage" component={Home_Page} />

//         </Stack.Navigator>
//       </NavigationContainer>
//   )
// }

// export default App

// const styles = StyleSheet.create({})


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












// const App = () => {
//   const Stack = createStackNavigator();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check if the user is already authenticated
//     const checkAuthentication = async () => {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       console.log(jwtToken)
//       if (jwtToken) {
//         setIsLoggedIn(true);
//         console.log(isLoggedIn)
//       }
//       setIsLoading(false);
//     };

//     checkAuthentication();
//   }, []);

//   if (isLoading) {
//     // Render loading indicator or splash screen while checking authentication
//     return null;
//   }
//   // User_Page
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={isLoggedIn ? 'HomePage' : 'LoginPage'}>
//         <Stack.Screen name="HomePage" component={Home_Page} options={{ headerShown: false }} />
//         <Stack.Screen name="LoginPage" component={Login_page} options={{ headerShown: false }} />

//         <Stack.Screen name="AboutPage" component={About_Page} options={{ headerShown: false }} />
//         <Stack.Screen name="RegisterPage" component={Register_Page} options={{headerShown:false}}/>
//         <Stack.Screen name="UserPage" component={User_Page} options={{headerShown:false}}/>
//         <Stack.Screen name='Createticket' component={Create_Ticket}  />
//         <Stack.Screen name='raisedticket' component={Raised_Ticket} />
//         <Stack.Screen name='Assignticket' component={Assign_Ticket} />
//         <Stack.Screen name='Printerticket' component={PrinterTicket_Page} />
//         {/* <Stack.Screen name='Clientpage' component={Client_Page} /> */}

//         {/* PrinterTicket_Page */}
//         {/* <Stack.Screen name='assignticket' component={Assign_Ticket} /> */}
//         {/* Client_Page */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;





import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login_page from './components/Login_page';
import Home_Page from './components/Home_Page';
import About_Page from './components/About_Page';
import Register_Page from './components/Register_Page';
import User_Page from './components/User_Page';
import Create_Ticket from './components/Create_Ticket';
import Raised_Ticket from './components/Raised_Ticket';
import Assign_Ticket from './components/Assign_Ticket';
import PrinterTicket_Page from './components/PrinterTicket_Page';
import Client_Page from './components/Client_Page';
import Forgot_Passworrd from './components/Forgot_Passworrd';
import Admin_assign_ticket from './components/Admin_assign_ticket';
import Approvalticket from './components/Approvalticket';
import ViewTicket from './components/ViewTicket';
import CloseTickets from './components/CloseTickets';
import Tickets from './components/Tickets';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const jwtToken = await AsyncStorage.getItem('jwtToken');
        if (jwtToken) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking JWT token", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    // Render loading indicator or splash screen while checking authentication
    return null; // You can return a splash screen or loading indicator here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'HomePage' : 'LoginPage'}>
        <Stack.Screen name="HomePage" component={Home_Page} options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" component={Login_page} options={{ headerShown: false }} />
        <Stack.Screen name="AboutPage" component={About_Page} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterPage" component={Register_Page} options={{ headerShown: false }} />
        <Stack.Screen name="UserPage" component={User_Page} options={{ headerShown: false }} />
        <Stack.Screen name="Create Ticket" component={Create_Ticket} />
        <Stack.Screen name="Raised Ticket" component={Raised_Ticket} />
        {/* <Stack.Screen name="Assign Tickets" component={Admin_assign_ticket} options={{ drawerLabel: 'AssignTicket' }} /> */}
        <Stack.Screen name="Printerticket" component={PrinterTicket_Page} />

        <Stack.Screen name="Verification Tickets" component={Approvalticket} />
        <Stack.Screen name="ViewTicket" component={ViewTicket} />
        <Stack.Screen name="Closed Tickets" component={CloseTickets} />
        <Stack.Screen name="Change Password" component={Forgot_Passworrd} />
        <Stack.Screen name="View Tickets" component={Tickets} />

        {/* <Drawer.Screen name="View Tickets" component={Tickets} options={{ drawerLabel: 'View Tickets' }} /> */}
        {/* CloseTickets */}

        {/* Judgementticket */}
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
