
import React, { useState, useEffect } from 'react';
import { Button, TextInput, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ToastAndroid, StatusBar, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

// import { Notifications } from 'expo'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { registerIndieID, unregisterIndieDevice } from 'native-notify';


const Login_page = () => {
  const navigation = useNavigation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');


  const [errorlogin, seterrorlogin] = useState({
    errorusername: '',
    errorpassword: '',

  })

  async function fetchData() {
    setLoading(false)

    setUsername('')
    setPassword('')
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchData()
    }, [])
  );







  const handleLogin = async () => {

    try {
      const response = await fetch('https://shubhansh7777.pythonanywhere.com/account/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        const logindataerror = await response.json();
        console.log(logindataerror, 'new')
        seterrorlogin({ errorusername: logindataerror.username, errorpassword: logindataerror.password })
        if ("Invalid username or password. Please try again." === logindataerror.detail) {
          ToastAndroid.show("Invalid username or password. Please try again.", ToastAndroid.SHORT);
          // navigation.navigate('LoginPage');
        } else if ("Unable to login. Session already active." === logindataerror.detail) {
          ToastAndroid.show("You are currently logged in on another device.", ToastAndroid.SHORT);
          // navigation.navigate('LoginPage');
          setShowLogoutButton(true);

        }
      }
      else if (response.status === 200) {
        const data = await response.json();
        const { access, refresh, role } = data;
        // await registerForPushNotificationsAsync();

        registerIndieID(`${username}`, 21772, 'D9eOUSD7rCEiTi5bd5VV4d');
        // console.log('username', 21772, 'D9eOUSD7rCEiTi5bd5VV4d')
        await AsyncStorage.setItem('jwtToken', access);
        await AsyncStorage.setItem('rolecheck', role);
        await AsyncStorage.setItem('username', username);

        setLoading(true)

        setUsername('')
        setPassword('')
        seterrorlogin({ errorusername: '', errorpassword: '' })
        ToastAndroid.show('Successfully SignIn', ToastAndroid.SHORT);
        navigation.replace('HomePage');
      }
    } catch (error) {
    }
    setLoading(false)
  }

  const [showPassword, setShowPassword] = useState(false);


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const logouthandlerequest = () => {
    navigation.navigate('logoutrequest');
  }

// const handleNotifications=()=>{
//     navigation.navigate('NotificationsApp');
// }



// const handleLiveLocation=()=>{
//   navigation.navigate('LocationtrackingApp');

// }


 // Function to ask for permission and get push token


  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      {loading ? (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating={loading} size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={{ marginHorizontal: responsiveWidth(5), marginTop: responsiveHeight(15) }}>
          <View style={{ elevation: 4, backgroundColor: '#fff', padding: responsiveHeight(2), paddingVertical: responsiveHeight(4), borderRadius: responsiveHeight(2) }}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontWeight: '500', fontSize: responsiveFontSize(2.5), marginBottom: responsiveHeight(0.7) }}>Sign In</Text>
              <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.8), width: '70%', lineHeight: responsiveHeight(3) }}>By signing in you are agreeing our
                <Text style={{ color: '#0386D0' }}> Term and privacy policy</Text>
              </Text>
            </View>
            <View style={{ marginTop: responsiveHeight(5) }}>

              <KeyboardAvoidingView >
                <Text style={styles.textlable}>MobileNo & Email</Text>
                <TextInput placeholder="Email" onChangeText={data => setUsername(data)} style={[styles.inputText]} />
                {errorlogin && <Text style={{ color: 'red', fontWeight: 500, fontSize: responsiveFontSize(1.5), marginBottom: responsiveHeight(1.2), }}>{errorlogin.errorusername}</Text>}
                <View>

                  <Text style={styles.textlable}>Password</Text>
                  <View style={[{ position: 'relative' }, styles.inputText]}>
                    <TextInput
                      value={password}
                      onChangeText={data => setPassword(data)}
                      placeholder="Password"
                      secureTextEntry={!showPassword}
                      style={{ paddingRight: 50 }}
                    />
                    <TouchableOpacity
                      style={{ position: 'absolute', right: 10, top: 10 }}
                      onPress={toggleShowPassword}
                    >
                      {showPassword ? (
                        <Icon name="eye-off" size={24} color="black" />
                      ) : (
                        <Icon name="eye" size={24} color="black" />
                      )}
                    </TouchableOpacity>
                  </View>
                  {errorlogin && <Text style={{ color: 'red', fontWeight: 500, fontSize: responsiveFontSize(1.5), }}>{errorlogin.errorpassword}</Text>}
                </View>
              </KeyboardAvoidingView>

              <View style={{
                flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: responsiveHeight(3),
              }}>
                <TouchableOpacity onPress={handleLogin} style={styles.loginbutton}>
                  <Text style={{ color: '#ffffff' }} >Sign In</Text>
                </TouchableOpacity>
                {showLogoutButton && (
                  <TouchableOpacity onPress={logouthandlerequest} style={styles.loginbutton}>
                    <Text style={{ color: '#ffffff' }} >Request logout</Text>
                  </TouchableOpacity>
                )}

                {/* <TouchableOpacity onPress={handleNotifications}>
                <Text>Notifications </Text> 
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLiveLocation}>
                <Text>Live Location</Text> 
                </TouchableOpacity> */}

              </View>
            </View>

          </View>
        </View>
      )}


    </SafeAreaView>
  );
};

export default Login_page;


const styles = StyleSheet.create({
  inputText: {
    borderColor: '#C4C4C4',
    borderWidth: responsiveHeight(0.2),
    paddingHorizontal: responsiveWidth(3),
    borderRadius: responsiveHeight(0.5),
    paddingVertical: responsiveHeight(1),
    backgroundColor: '#F9F9F9',

  },
  loginbutton: {
    backgroundColor: '#0386D0',
    paddingVertical: responsiveHeight(2),

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveHeight(2),
    width: responsiveWidth(30)
  }
  , RegisterButton: {
    borderColor: '#036BB9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2),
    width: responsiveWidth(30),
    borderWidth: responsiveHeight(0.2),

    borderRadius: responsiveHeight(2),

  },
  textlable: {
    fontWeight: '500',
    marginBottom: responsiveHeight(0.8)
  }
})




  // const registerForPushNotificationsAsync = async () => {
  //   try {
  //     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //     let finalStatus = existingStatus;

  //     if (existingStatus !== 'granted') {
  //       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //       finalStatus = status;
  //     }

  //     if (finalStatus !== 'granted') {
  //       alert('Permission denied for notifications');
  //       return;
  //     }

  //     let token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token); // Log the push token for debugging
  //   } catch (error) {
  //     console.error('Error getting push token:', error);
  //   }
  // };


  // const registerForPushNotificationsAsync = async () => {
  //   try {
  //     const { status: existingStatus } = await Notifications.requestPermissionsAsync();

  //     if (existingStatus !== 'granted') {
  //       alert('Permission denied for notifications');
  //       return;
  //     }

  //     let token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token); // Log the push token for debugging
  //   } catch (error) {
  //     console.error('Error getting push token:', error);
  //   }
  // };



  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));
  // }, [])




  // async function registerForPushNotificationsAsync() {
  //   let token;

  //   if (Platform.OS === 'android') {
  //     await Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }

  //   if (Device.isDevice) {
  //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     // Learn more about projectId:
  //     // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
  //     // EAS projectId is used here.
  //     try {
  //       const projectId =
  //         Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
  //       if (!projectId) {
  //         throw new Error('Project ID not found');
  //       }
  //       token = (
  //         await Notifications.getExpoPushTokenAsync({
  //           projectId,
  //         })
  //       ).data;
  //       console.log(token);
  //     } catch (e) {
  //       token = `${e}`;
  //     }
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }

  //   return token;
  // }