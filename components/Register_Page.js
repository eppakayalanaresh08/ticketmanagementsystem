
import React, { useState } from 'react';
import { Button, TextInput, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView ,StatusBar} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';


const Register_Page = () => {
  const navigation = useNavigation()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView>
                        <StatusBar style="dark" />

      <View style={{ marginHorizontal: responsiveWidth(5) }}>

        <View style={{ marginTop: responsiveHeight(10), flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: '500', fontSize: responsiveFontSize(2.5), marginBottom: responsiveHeight(2) }}>Sign Up</Text>
          <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.8), width: '70%', lineHeight: responsiveHeight(4) }}>By Sign Up in you are agreeing our
            <Text style={{ color: '#0386D0' }}> Term and privacy policy</Text>
          </Text>
        </View>
        <View style={{ marginTop: responsiveHeight(8) }}>
          <KeyboardAvoidingView>
            <TextInput placeholder="Username" onChangeText={data=>setUsername(data)} style={[styles.inputText]} />
            <TextInput placeholder="Password" secureTextEntry={true} onChangeText={setPassword} style={[styles.inputText]} />
            <TextInput placeholder="Confirm Password" secureTextEntry={true} onChangeText={setPassword} style={[styles.inputText]} />

          </KeyboardAvoidingView>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: responsiveHeight(3),
          }}>
            <TouchableOpacity style={styles.RegisterButton}>
              <Text style={{ color: '#036BB9' }}>Sign In</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.loginbutton} onPress={() => navigation.navigate('LoginPage')}>
              <Text style={{ color: '#ffffff' }}>Sign Up</Text>

            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Register_Page

const styles = StyleSheet.create({
  inputText: {
    borderColor: '#C4C4C4',
    borderWidth: responsiveHeight(0.2),
    paddingHorizontal: responsiveWidth(2),
    borderRadius: responsiveHeight(2),
    paddingVertical: responsiveHeight(1.8),
    marginBottom: responsiveHeight(2),
    backgroundColor: '#F9F9F9'
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

  }
})