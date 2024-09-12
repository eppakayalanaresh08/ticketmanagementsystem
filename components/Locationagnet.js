import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [userLocations, setUserLocations] = useState([]);

  useEffect(() => {
    // Simulate real-time location updates
    const updateLocations = (newLocations) => {
      setUserLocations(newLocations);
    };

    // Replace this with your real WebSocket or real-time update logic
    // Example: WebSocket connection to your backend
    const socket = new WebSocket('ws://your-backend-server/socket');
    socket.onmessage = (event) => {
      const newLocations = JSON.parse(event.data);
      updateLocations(newLocations);
    };

    // Clean up WebSocket connection on unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {userLocations.map((user, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: user.latitude,
              longitude: user.longitude,
            }}
            title={user.name}
            description={user.description}
          />
        ))}
        
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
