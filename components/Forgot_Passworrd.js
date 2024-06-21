import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView ,TouchableOpacity,ToastAndroid} from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Forgot_Passworrd = () => {
    const [oldPassword,setOldPassword]=useState('')
    const [newPassword,setNewPassword]=useState('')
    const [errorPassword, seterrorPassword] = useState({
        errorOldPassword: '',
        errorNewPassword: '',

    })

    const handleRest=async()=>{
        const resetPassword={
            old_password:oldPassword,
            password:newPassword,
            password_check:newPassword
        }

        try {
            const jwtToken = await AsyncStorage.getItem('jwtToken');

            const response = await fetch('https://shubhansh7777.pythonanywhere.com/account/password_change/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(resetPassword), // Changed `postData` to `userDetails`
            });
            console.log(response)

            if (!response.ok) {
                const changepasswordData=await response.json();
                console.log(changepasswordData)


                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const changeData=data.detail
            ToastAndroid.show(changeData, ToastAndroid.SHORT);
            setOldPassword('')
            setNewPassword('')
            // setData(prevData => [...prevData, data]);
            console.log(data, 'submit');

            // setLoading(true);
        } catch (error) {
            // ToastAndroid.show('Wrong Password', ToastAndroid.SHORT);

            console.error('Error:', error);
        }

        // setLoading(false);


    }

    return (
        <SafeAreaView style={{ marginHorizontal: responsiveWidth(5) }}>
            <View style={{ marginTop: responsiveHeight(10), flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: responsiveFontSize(2.2), marginBottom: responsiveHeight(2) }}>RESET PASSWORD</Text>
               
            </View>
            <KeyboardAvoidingView>
                    <TextInput placeholder="OLD PASSWORD" onChangeText={data => setOldPassword(data)} style={[styles.inputText]} />
                    <TextInput placeholder="NEW PASSWORD" secureTextEntry={true} onChangeText={data => setNewPassword(data)} style={[styles.inputText]} />
                </KeyboardAvoidingView>
                <TouchableOpacity onPress={handleRest} style={styles.loginbutton}>
              <Text style={{ color: '#ffffff' }} >RESET</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Forgot_Passworrd

const styles = StyleSheet.create({
    inputText: {
        borderColor: '#C4C4C4',
        borderWidth: responsiveHeight(0.2),
        paddingHorizontal: responsiveWidth(2),
        borderRadius: responsiveHeight(1.5),
        paddingVertical: responsiveHeight(1.8),
        marginBottom: responsiveHeight(2),
        backgroundColor: '#F9F9F9',
        fontSize:responsiveFontSize(1.2)
    },
    loginbutton: {
        backgroundColor: '#0386D0',
        paddingVertical: responsiveHeight(2),
    
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responsiveHeight(2),
        width: responsiveWidth(30)
      }
})