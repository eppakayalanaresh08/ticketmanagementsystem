import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token) {
        setIsAuthenticated(true);
      } else {
        navigation.navigate('LoginPage');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigation]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return isAuthenticated ? <Component {...rest} /> : null;
};

export default ProtectedRoute;
