
import React, { useState, useEffect } from 'react';
import { Button, TextInput, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ToastAndroid, StatusBar, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';

const Login_page = () => {
  const navigation = useNavigation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  const [errorlogin, seterrorlogin] = useState({
    errorusername: '',
    errorpassword: '',

  })

  //   useEffect(() => {

  //     const fetchDatalogin=async()=>{
  //       const role = await AsyncStorage.getItem('rolecheck');
  //       console.log(role,'role')
  //     }

  //     fetchDatalogin();
  // }, []);


  async function fetchData() {

    setLoading(false)
  }



  useFocusEffect(
    React.useCallback(() => {
      // fetchDataProduct();
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
      console.log(response)

      if (!response.ok) {
        const logindataerror = await response.json();
        console.log(logindataerror, 'new')
        seterrorlogin({ errorusername: logindataerror.username, errorpassword: logindataerror.password })
        if ('Invalid username or password. Please try again.' === logindataerror.detail) {
          ToastAndroid.show(logindataerror.detail, ToastAndroid.SHORT);
        }

        // throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // console.log(data)
      const { access_token, role } = data;
      ToastAndroid.show('Successfully SignIn', ToastAndroid.SHORT);
      await AsyncStorage.setItem('jwtToken', access_token);
      const rolevalue = 'admin'
      await AsyncStorage.setItem('rolecheck', role);

      navigation.navigate('HomePage');
      setLoading(true)

      setUsername('')
      setPassword('')
      seterrorlogin({ errorusername: '', errorpassword: '' })
      // Store the access token locally, e.g., in AsyncStorage
      // Redirect the user to the authenticated part of the app
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      // ToastAndroid.show('Wrong Credentials', ToastAndroid.SHORT);
      // console.error('Wrong Credentials', error);
    }

    setLoading(false)





    // try {
    //   const response = await axios.post('https://dummyjson.com/auth/login', { username, password });
    //   console.log(response)
    //   await AsyncStorage.setItem('jwtToken', response.data.token);
    //   navigation.navigate('HomePage');
    // } catch (error) {
    //   console.log(error)
    //   alert('Arrr matey! No treasure found. (Invalid credentials)');
    // }

    // 
    // const url = 'https://shubhansh7777.pythonanywhere.com/account/login/';


    // Define the data to be sent in the request body

    // const data = {
    //   username: username,
    //   password: password
    // };

    // Send the POST request


    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })


    // .then(response => {
    //   console.log(response)
    //   if (response.ok) {

    //     const value=response.json()
    //     console.log(value)
    //     // Handle successful login


    //     console.log('Login successful!');
    //   } else {
    //     // Handle failed login
    //     console.error('Login failed.');
    //   }
    // })
    // .then(response => response.json())
    // .then(data => {

    //   if(data.access_token){
    //     AsyncStorage.setItem('jwtToken', access_token);
    //     navigation.navigate('HomePage');
    //   }else{

    //     ToastAndroid.show('Wrong Credentials', ToastAndroid.SHORT);

    //   }
    //   // Assuming 'data' contains the response from the backend
    //   const { access_token } = data;
    //   // if(access_token==''){

    //   // }
    //   // console.log(access_token)
    //   // Store the access token locally, e.g., in AsyncStorage
    //   // Redirect the user to the authenticated part of the app
    //   // ToastAndroid.show('Wrong Credentials', ToastAndroid.SHORT);

    // })



    // .catch(error => {


    //   console.error('Error:', error);
    // });







  }

  const handleRegister = () => {
    navigation.navigate('RegisterPage')
  }


  const onHandleRestPassWord = () => {
    navigation.navigate('ForgotPage')
    // setPassword((newitem)=>[...newitem,nameelement])
  }


  // const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      {loading ? (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating={loading} size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={{marginHorizontal: responsiveWidth(5) ,marginTop:responsiveHeight(15)}}>
        <View style={{elevation:4,backgroundColor:'#fff',padding:responsiveHeight(2),paddingVertical:responsiveHeight(4),borderRadius:responsiveHeight(2)}}>

          <View style={{  flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: '500', fontSize: responsiveFontSize(2.5), marginBottom: responsiveHeight(0.7) }}>Sign In</Text>
            <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.8), width: '70%', lineHeight: responsiveHeight(4) }}>By signing in you are agreeing our
              <Text style={{ color: '#0386D0' }}> Term and privacy policy</Text>
            </Text>
          </View>
          <View style={{ marginTop: responsiveHeight(8) }}>

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
              {/* <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={onHandleRestPassWord}>
              <Text style={{color:'#0386D0',fontWeight:'500'}}>Forgot Password</Text>
            </TouchableOpacity> */}
            </KeyboardAvoidingView>
            <View style={{
              flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: responsiveHeight(3),
            }}>




              <TouchableOpacity onPress={handleLogin} style={styles.loginbutton}>
                <Text style={{ color: '#ffffff' }} >Sign In</Text>
              </TouchableOpacity>
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
  textlable:{
    fontWeight:'500',
    // fontStyle:'italic',
    marginBottom:responsiveHeight(0.8)
  }
})