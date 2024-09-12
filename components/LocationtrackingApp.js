
// import React, { useState, useEffect } from 'react';
// import { Platform, Text, View, StyleSheet } from 'react-native';
// import * as Device from 'expo-device';
// import * as Location from 'expo-location';

// const API_URL = 'https://your-backend-api-url'; // Replace with your actual backend API URL

// export default function LocationtrackingApp() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     // Check if running on Android emulator
//     if (Platform.OS === 'android' && !Device.isDevice) {
//       setErrorMsg(
//         'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
//       );
//       return;
//     }

//     // Request location permission
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }
//     })();

//     // Fetch location initially
//     fetchLocation();

//     // Set interval to fetch location and send to backend every minute
//     const intervalId = setInterval(() => {
//       fetchLocation();
//       sendLocationToBackend();
//     }, 10000); // 60000 milliseconds = 1 minute

//     // Clean up interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const fetchLocation = async () => {
//     try {
//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     } catch (error) {
//       setErrorMsg('Error fetching location');
//       console.error(error);
//     }
//   };

//   const sendLocationToBackend = async () => {
//     console.log(location,'location')
//     if (location) {
//       try {
//         // Prepare data to send
//         const { latitude, longitude } = location.coords;
//         const data = {
//           latitude,
//           longitude,
//           timestamp: Date.now(),
//         };

//         // Send data to backend
//         const response = await fetch(API_URL, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//         });

//         if (!response.ok) {
//           throw new Error('Failed to send location data to backend');
//         }

//         console.log('Location data sent successfully');
//       } catch (error) {
//         // console.error('Error sending location data to backend:', error);
//       }
//     }
//   };

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }


//   console.log(text,'ghgh')
//   return (
//     <View style={styles.container}>
//       <Text style={styles.paragraph}>{text}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   paragraph: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });



// import React, { Component } from "react";
// import { StyleSheet, View } from "react-native";
// import MapView from "react-native-maps";
// import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";
// import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
// import axios from "axios"; // Import axios for HTTP requests
// import * as TaskManager from "expo-task-manager";

// const LOCATION_TASK_NAME = "background-location-task";

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       region: null,
//       error: "",
//     };
//   }

//   _getLocationAsync = async () => {
//     // Request foreground location permission
//     let { status } = await Location.getAsync()
       
//     console.log(status,'status')
//     if (status !== "granted") {
//       this.setState({ error: "Permission to access location was denied" });
//       return;
//     }

//     // Start watching for location updates
//     this.location = await Location.watchPositionAsync(
//       {
//         accuracy: Location.Accuracy.High,
//         timeInterval: 10000, // Interval in milliseconds
//         distanceInterval: 1, // Minimum distance (in meters) change for update
//       },
//       newLocation => {
//         let { coords } = newLocation;
//         let region = {
//           latitude: coords.latitude,
//           longitude: coords.longitude,
//           latitudeDelta: 0.045,
//           longitudeDelta: 0.045,
//         };
//         console.log(region,'ghh')
//         this.setState({ region });
//       },
//       error => console.log(error)
//     );
//   };

//   async componentDidMount() {
//     // Asking for device location permission
//     const { status } = await Permissions.askAsync(Permissions.LOCATION);
//     if (status === "granted") {
//       this._getLocationAsync();
//     } else {
//       this.setState({ error: "Location services needed" });
//     }

//     // You can also retrieve userId and userName from AsyncStorage here
//     let userId = (await AsyncStorage.getItem("userId")) || "none";
//     let userName = (await AsyncStorage.getItem("userName")) || "none";
//   }

//   componentWillUnmount() {
//     // Clean up location watcher when component unmounts
//     if (this.location) {
//       this.location.remove();
//     }
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <MapView
//           initialRegion={this.state.region}
//           showsCompass={true}
//           showsUserLocation={true}
//           rotateEnabled={true}
//           ref={map => {
//             this.map = map;
//           }}
//           style={{ flex: 1 }}
//         />
//       </View>
//     );
//   }
// }

// // Define background task to handle location updates
// TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
//   if (error) {
//     console.error("Error in background task:", error);
//     return;
//   }
//   if (data) {
//     const { locations } = data;
//     let { latitude, longitude } = locations[0].coords;
//     let userId = (await AsyncStorage.getItem("userId")) || "none";

//     // Send location data to backend
//     try {
//       const response = await axios.post("http://000.000.0.000/phpServer/ajax.php", {
//         action: "saveLocation",
//         userId,
//         lat: latitude,
//         long: longitude,
//       });

//       console.log("Location data sent successfully:", response.data);
//     } catch (error) {
//       console.error("Error sending location data:", error);
//     }
//   }
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });















// import React, { useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import * as Location from 'expo-location';

// export default function App() {
//   useEffect(() => {
//     // Request permission to access location
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission to access location was denied');
//         return;
//       }

//       // Subscribe to location updates
//       Location.watchPositionAsync({ accuracy: Location.Accuracy.High, timeInterval: 5000 }, (location) => {
//         console.log(location.coords.latitude, location.coords.longitude)

//         // Send location data to server
//         sendLocationToServer(location.coords.latitude, location.coords.longitude);
//       });
//     })();
//   }, []);

//   const sendLocationToServer = (latitude, longitude) => {
//     console.log(latitude,longitude)
//     // Example POST request to your server
//     fetch('https://your-server-url.com/update-location', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         latitude,
//         longitude,
//       }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Location update successful:', data);
//     })
//     // .catch(error => {
//     //   console.error('Error updating location:', error);
//     // });
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Live Location Tracker</Text>
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



// import React, { useEffect, useRef } from 'react';
// import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
// import * as Location from 'expo-location';

// export default function App() {
//   const watchIdRef = useRef(null); // useRef to store watchId for cleanup

//   useEffect(() => {
//     const startLocationTracking = async () => {
//       try {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//           console.log('Permission to access location was denied');
//           return;
//         }

//         // Start watching for location updates
//         watchIdRef.current = await Location.watchPositionAsync(
//           { accuracy: Location.Accuracy.High, timeInterval: 5000 },
//           (location) => {
//             console.log('New location:', location.coords.latitude, location.coords.longitude);
//             sendLocationToServer(location.coords.latitude, location.coords.longitude);
//           }
//         );
//       } catch (error) {
//         console.error('Error requesting location permission:', error);
//       }
//     };

//     startLocationTracking();

//     // Clean up function to stop watching location when component unmounts
//     return () => {
//       if (watchIdRef.current !== null) {
//         Location.clearWatch(watchIdRef.current);
//       }
//     };
//   }, []);

//   const sendLocationToServer = (latitude, longitude) => {
//     console.log('Sending location:', latitude, longitude);
//     fetch('https://your-server-url.com/update-location', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         latitude,
//         longitude,
//       }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log('Location update successful:', data);
//       })
//       // .catch((error) => {
//       //   console.error('Error updating location:', error);
//       // });
//   };

//   const handleOnPressUpdate=()=>{
//     startLocationTracking()
//   }

//   return (
//     <View style={styles.container}>
//       <Text>Live Location Tracker</Text>
//       <TouchableOpacity onPress={handleOnPressUpdate}> 
//       <Text>update</Text>
//       </TouchableOpacity>
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





// import React, { useEffect, useRef, useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import * as Location from 'expo-location';

// export default function App() {
//   const watchIdRef = useRef(null); // useRef to store watchId for cleanup

//   const startLocationTracking = async () => {
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission to access location was denied');
//         return;
//       }

//       // Clear existing watch if it exists
//       if (watchIdRef.current !== null) {
//         Location.clearWatch(watchIdRef.current);
//       }

//       // Start watching for location updates
//       watchIdRef.current = await Location.watchPositionAsync(
//         { accuracy: Location.Accuracy.High, timeInterval: 5000 },
//         (location) => {
//           console.log('New location:', location.coords.latitude, location.coords.longitude);
//           sendLocationToServer(location.coords.latitude, location.coords.longitude);
//         }
//       );
//     } catch (error) {
//       console.error('Error requesting location permission:', error);
//     }
//   };

//   useEffect(() => {
//     startLocationTracking();

//     // Clean up function to stop watching location when component unmounts
//     return () => {
//       if (watchIdRef.current !== null) {
//         Location.clearWatch(watchIdRef.current);
//       }
//     };
//   }, []);

//   const sendLocationToServer = (latitude, longitude) => {
//     console.log('Sending location:', latitude, longitude);
//     fetch('https://your-server-url.com/update-location', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         latitude,
//         longitude,
//       }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log('Location update successful:', data);
//       })
//       // .catch((error) => {
//       //   console.error('Error updating location:', error);
//       // });
//   };

//   const handleOnPressUpdate = () => {
//     startLocationTracking(); // Call the function to restart location tracking
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Live Location Tracker</Text>
//       <TouchableOpacity onPress={handleOnPressUpdate}>
//         <Text>Update</Text>
//       </TouchableOpacity>
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



// import React, { useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import * as Location from 'expo-location';

// export default function App() {
//   useEffect(() => {
//     // Request permission to access location
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission to access location was denied');
//         return;
//       }

//       // Subscribe to location updates
//       Location.watchPositionAsync({ accuracy: Location.Accuracy.High, timeInterval: 5000 }, (location) => {
//         // Send location data to server
//         sendLocationToServer(location.coords.latitude, location.coords.longitude);
//       });
//     })();
//   }, []);

//   const sendLocationToServer = (latitude, longitude) => {
//     // Example POST request to your server
//     fetch('https://your-server-url.com/update-location', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         latitude,
//         longitude,
//       }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Location update successful:', data);
//     })
//     .catch(error => {
//       console.error('Error updating location:', error);
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Live Location Tracker</Text>
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




// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import * as Location from 'expo-location';

// export default function App() {
//   const [subscription, setSubscription] = useState(null);

//   useEffect(() => {
//     // Request permission to access location
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission to access location was denied');
//         return;
//       }

//       // Subscribe to location updates
//       const sub = await Location.watchPositionAsync(
//         { accuracy: Location.Accuracy.High, timeInterval: 5000 },
//         (location) => {
//           // Send location data to server
//           sendLocationToServer(location.coords.latitude, location.coords.longitude);
//         }
//       );

//       setSubscription(sub);

//       return () => {
//         // Clean up subscription when component unmounts
//         if (subscription) {
//           subscription.remove();
//         }
//       };
//     })();
//   }, []);

//   const sendLocationToServer = (latitude, longitude) => {

//     console.log(latitude, longitude)
//     // Example POST request to your server
//     fetch('https://your-server-url.com/update-location', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         latitude,
//         longitude,
//       }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Location update successful:', data);
//     })
//     // .catch(error => {
//     //   console.error('Error updating location:', error);
//     // });
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Live Location Tracker</Text>
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


























// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import * as Location from 'expo-location';

// export default function App() {
//   const [subscription, setSubscription] = useState(null);

//   useEffect(() => {
//     // Request permission to access location
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission to access location was denied');
//         return;
//       }

//       // Subscribe to location updates
//       const sub = await Location.watchPositionAsync(
//         { accuracy: Location.Accuracy.High, timeInterval: 5000 },
//         (location) => {
//           // Send location data to server
//           sendLocationToServer(location.coords.latitude, location.coords.longitude);

//           // Log location to console
//           console.log('Latitude:', location.coords.latitude, 'Longitude:', location.coords.longitude);
//         }
//       );
//       console.log(sub)

//       setSubscription(sub); // Update state with the subscription

//       // Clean up subscription when component unmounts
//       return () => {
//         if (sub) {
//           sub.remove(); // Remove the subscription properly
//         }
//       };
//     })();
//   }, []);

//   const sendLocationToServer = (latitude, longitude) => {
//     // Example POST request to your server
//     fetch('https://your-server-url.com/update-location', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         latitude,
//         longitude,
//       }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Location update successful:', data);
//     })
//     // .catch(error => {
//     //   console.error('Error updating location:', error);
//     // });
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Live Location Tracker</Text>
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







// utils/useLocationTracking.js

import { useEffect } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UseLocationTracking = () => {
  useEffect(() => {
    const sendLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        const intervalId = setInterval(async () => {
          try {
            const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            await sendLocationToServer(location.coords.latitude, location.coords.longitude);
          } catch (error) {
            // console.error('Error fetching location:', error);
          }
        }, 60000); // Fetch location every 1 minute (60000 milliseconds)

        // Fetch location immediately on component mount
        const initialLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        await sendLocationToServer(initialLocation.coords.latitude, initialLocation.coords.longitude);

        return () => clearInterval(intervalId); // Clean up interval on component unmount
      } catch (error) {
        // console.error('Error setting up location tracking:', error);
      }
    };

    sendLocation();

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  const sendLocationToServer = async (latitude, longitude) => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const agent_Id = await AsyncStorage.getItem('userId');

      const locationData = {
        latitude,
        longitude,
        agent: parseInt(agent_Id)
      };

      const response = await fetch('https://shubhansh7777.pythonanywhere.com/agent/location/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(locationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // console.log('Error sending location data:', errorData);
      }

      const responseData = await response.json();
      console.log('Location data sent successfully:', responseData);
    } catch (error) {
      
      // console.error('Error sending location data:', error);
    }
  };
};

export default UseLocationTracking;
