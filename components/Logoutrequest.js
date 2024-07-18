
// import React, { useState, useEffect } from 'react';
// import { Button, TextInput, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ToastAndroid, StatusBar, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useFocusEffect } from '@react-navigation/native';

// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { registerIndieID, unregisterIndieDevice } from 'native-notify';
// import LottieView from 'lottie-react-native'; // Import LottieView


// const LogoutRequest = () => {
//     const navigation = useNavigation()
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [showRequestSent, setShowRequestSent] = useState(false);
//     const [countdown, setCountdown] = useState(30);
//     const [errorlogin, seterrorlogin] = useState({
//         errorusername: '',
//         errorpassword: '',

//     })


//     async function fetchData() {
//         setLoading(false)

//         setUsername('')
//         setPassword('')
//     }



//     useFocusEffect(
//         React.useCallback(() => {
//             fetchData()
//         }, [])
//     );

//     const handleLogin = async () => {

//         try {
//             const response = await fetch('https://shubhansh7777.pythonanywhere.com/account/logout-link-request/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     username: username,
//                     password: password,
//                 }),
//             });
//             // console.log(response)

//             if (!response.ok) {
//                 const logindataerror = await response.json();
//                 console.log(logindataerror, 'new')
//                 seterrorlogin({ errorusername: logindataerror.username, errorpassword: logindataerror.password })
//                 if ("Invalid username or password. Please try again" === logindataerror.detail) {
//                     ToastAndroid.show("Invalid username or password. Please try again.", ToastAndroid.SHORT);
//                     // navigation.navigate('LoginPage');
//                 } else if ("Unable to login. Session already active." === logindataerror.detail) {
//                     ToastAndroid.show("You are currently logged in on another device.", ToastAndroid.SHORT);
//                     // navigation.navigate('LoginPage');
//                     setShowLogoutButton(true);
//                 }

//                 // throw new Error('Network response was not ok');
//             }
//             else if (response.status === 200) {
//                 const data = await response.json();
//                 setShowRequestSent(true); // Show image and text
//                 startCountdown()


//                 setLoading(true)

//                 setUsername('')
//                 setPassword('')
//                 seterrorlogin({ errorusername: '', errorpassword: '' })
//                 ToastAndroid.show('Successfully SignIn', ToastAndroid.SHORT);
//                 // navigation.navigate('HomePage');
//             }





//         } catch (error) {

//         }

//         setLoading(false)


//     }


//     const startCountdown = () => {
//         let timer = setInterval(() => {
//             setCountdown(prevCountdown => prevCountdown - 1); // Decrement countdown
//         }, 1000);

//         // Stop the countdown when it reaches zero
//         setTimeout(() => {
//             clearInterval(timer); // Clear interval to stop countdown
//             setCountdown(0); // Ensure countdown display shows zero
//         }, 30000); // 30 seconds
//     };
//     const [showPassword, setShowPassword] = useState(false);


//     const toggleShowPassword = () => {
//         setShowPassword(!showPassword);
//     };

//     return (
//         <SafeAreaView>
//             <StatusBar style="dark" />
//             {loading ? (
//                 <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                     <ActivityIndicator animating={loading} size="large" color="#0000ff" />
//                 </View>
//             ) : (

//                 <View style={{ marginHorizontal: responsiveWidth(5), marginTop: responsiveHeight(32) }}>
//                     <View style={{ elevation: 4, backgroundColor: '#fff', padding: responsiveHeight(2), paddingVertical: responsiveHeight(4), borderRadius: responsiveHeight(2) }}>
//                         {showRequestSent ? <View style={{ alignItems: 'center', marginTop: responsiveHeight(3) }}>
//                             <LottieView
//                                 source={require('../assets/emailsuccess.json')} // Replace with your animation file path
//                                 autoPlay
//                                 loop
//                                 style={{ width: 100, height: 100 }}


//                             />
//                             <Text style={{textAlign:'center',fontStyle:'italic',fontSize:responsiveFontSize(2),marginVertical:responsiveHeight(2)}}>  Check your email for the logout link
//                             </Text>

//                             <Text style={{ fontSize: responsiveFontSize(3),fontWeight:"900" }}>{countdown}</Text>
//                         </View> :
//                             <View>
//                                 <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//                                     <Text style={{ fontWeight: '500', fontSize: responsiveFontSize(2.5), marginBottom: responsiveHeight(0.7) }}>Request for Logout</Text>

//                                 </View>
//                                 <View style={{ marginTop: responsiveHeight(4) }}>

//                                     <KeyboardAvoidingView >
//                                         <Text style={styles.textlable}>registered email</Text>
//                                         <TextInput placeholder="Email" onChangeText={data => setUsername(data)} style={[styles.inputText]} />
//                                         {errorlogin && <Text style={{ color: 'red', fontWeight: 500, fontSize: responsiveFontSize(1.5), marginBottom: responsiveHeight(1.2), }}>{errorlogin.errorusername}</Text>}


//                                         <View>

//                                             <Text style={styles.textlable}>Password</Text>
//                                             <View style={[{ position: 'relative' }, styles.inputText]}>

//                                                 <TextInput
//                                                     value={password}
//                                                     onChangeText={data => setPassword(data)}
//                                                     placeholder="Password"
//                                                     secureTextEntry={!showPassword}
//                                                     style={{ paddingRight: 50 }}
//                                                 />

//                                                 <TouchableOpacity
//                                                     style={{ position: 'absolute', right: 10, top: 10 }}
//                                                     onPress={toggleShowPassword}
//                                                 >
//                                                     {showPassword ? (
//                                                         <Icon name="eye-off" size={24} color="black" />
//                                                     ) : (
//                                                         <Icon name="eye" size={24} color="black" />
//                                                     )}
//                                                 </TouchableOpacity>
//                                             </View>
//                                             {errorlogin && <Text style={{ color: 'red', fontWeight: 500, fontSize: responsiveFontSize(1.5), }}>{errorlogin.errorpassword}</Text>}
//                                         </View>

//                                     </KeyboardAvoidingView>
//                                     <View style={{
//                                         flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: responsiveHeight(3),
//                                     }}>

//                                         <TouchableOpacity onPress={handleLogin} style={styles.loginbutton}>
//                                             <Text style={{ color: '#ffffff' }} >sent request link</Text>
//                                         </TouchableOpacity>

//                                     </View>
//                                 </View>

//                             </View>}

//                     </View>
//                 </View>
//             )}


//         </SafeAreaView>
//     );
// };

// export default LogoutRequest;


// const styles = StyleSheet.create({
//     inputText: {
//         borderColor: '#C4C4C4',
//         borderWidth: responsiveHeight(0.2),
//         paddingHorizontal: responsiveWidth(3),
//         borderRadius: responsiveHeight(0.5),
//         paddingVertical: responsiveHeight(1),
//         backgroundColor: '#F9F9F9',

//     },
//     loginbutton: {
//         backgroundColor: '#0386D0',
//         paddingVertical: responsiveHeight(2),
//         justifyContent: 'center',
//         paddingHorizontal: responsiveHeight(2),
//         alignItems: 'center',
//         borderRadius: responsiveHeight(2),
//         // width: responsiveWidth(30)
//     }
//     , RegisterButton: {
//         borderColor: '#036BB9',
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingVertical: responsiveHeight(2),
//         width: responsiveWidth(30),
//         borderWidth: responsiveHeight(0.2),

//         borderRadius: responsiveHeight(2),

//     },
//     textlable: {
//         fontWeight: '500',
//         // fontStyle:'italic',
//         marginBottom: responsiveHeight(0.8)
//     }
// })





import React, { useState, useEffect } from 'react';
import { Button, TextInput, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ToastAndroid, StatusBar, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { registerIndieID, unregisterIndieDevice } from 'native-notify';
import LottieView from 'lottie-react-native'; // Import LottieView

const LogoutRequest = () => {
    const navigation = useNavigation()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [showRequestSent, setShowRequestSent] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [errorlogin, seterrorlogin] = useState({
        errorusername: '',
        errorpassword: '',
    });
    const [countdownFinished, setCountdownFinished] = useState(false);

    async function fetchData() {
        setLoading(false);
        setUsername('');
        setPassword('');
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const handleLogin = async () => {
        try {
            const response = await fetch('https://shubhansh7777.pythonanywhere.com/account/logout-link-request/', {
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
                seterrorlogin({ errorusername: logindataerror.username, errorpassword: logindataerror.password });
                if ("Invalid username or password. Please try again" === logindataerror.detail) {
                    ToastAndroid.show("Invalid username or password. Please try again.", ToastAndroid.SHORT);
                } else if ("Unable to login. Session already active." === logindataerror.detail) {
                    ToastAndroid.show("You are currently logged in on another device.", ToastAndroid.SHORT);
                }
            } else if (response.status === 200) {
                const data = await response.json();
                setShowRequestSent(true);
                startCountdown();
                setLoading(true);
                setUsername('');
                setPassword('');
                seterrorlogin({ errorusername: '', errorpassword: '' });
                ToastAndroid.show('Successfully SignIn', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    const startCountdown = () => {
        let timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown === 1) {
                    clearInterval(timer);
                    setCountdownFinished(true);
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);
    };

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handlerelogin=()=>{
        navigation.replace('LoginPage')
    }

    return (
        <SafeAreaView>
            <StatusBar style="dark" />
            {loading ? (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator animating={loading} size="large" color="#0000ff" />
                </View>
            ) : (
                <View style={{ marginHorizontal: responsiveWidth(5), marginTop: responsiveHeight(32) }}>
                    <View style={{ elevation: 4, backgroundColor: '#fff', padding: responsiveHeight(2), paddingVertical: responsiveHeight(4), borderRadius: responsiveHeight(2) }}>
                        {showRequestSent ? (
                            countdownFinished ? (
                                <View style={{ alignItems: 'center', marginTop: responsiveHeight(3) }}>
                                       <LottieView
                                        source={require('../assets/emaillogo.json')}
                                        autoPlay
                                        loop
                                        style={{ width: 100, height: 100 }}
                                    />
                                    <Text style={{ textAlign: 'center', fontStyle: 'italic', fontSize: responsiveFontSize(2), marginVertical: responsiveHeight(2) }}>
                                        Logout link has been sent successfully!
                                    </Text>
                                    <TouchableOpacity onPress={handlerelogin} style={[styles.reloginbutton,{backgroundColor:'#22BB33'}]} >
                                            <Text style={{ color: '#ffffff' }} >Re-Login</Text>
                                        </TouchableOpacity>
                                    {/* Add your new content here */}
                                </View>
                            ) : (
                                <View style={{ alignItems: 'center', marginTop: responsiveHeight(3) }}>
                                    <LottieView
                                        source={require('../assets/emailsuccess.json')}
                                        autoPlay
                                        loop
                                        style={{ width: 100, height: 100 }}
                                    />
                                    <Text style={{ textAlign: 'center', fontStyle: 'italic', fontSize: responsiveFontSize(2), marginVertical: responsiveHeight(2) }}>
                                        Check your email for the logout link
                                    </Text>
                                    <Text style={{ fontSize: responsiveFontSize(3), fontWeight: "900" }}>{countdown}</Text>
                                 
                                </View>
                            )
                        ) : (
                            <View>
                                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: '500', fontSize: responsiveFontSize(2.5), marginBottom: responsiveHeight(0.7) }}>Request for Logout</Text>
                                </View>
                                <View style={{ marginTop: responsiveHeight(4) }}>
                                    <KeyboardAvoidingView>
                                        <Text style={styles.textlable}>registered email</Text>
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
                                            <Text style={{ color: '#ffffff' }} >send request link</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

export default LogoutRequest;

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
        paddingHorizontal: responsiveHeight(2),
        alignItems: 'center',
        borderRadius: responsiveHeight(2),
    },
    RegisterButton: {
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
    },
    reloginbutton: {
        backgroundColor: '#0386D0',
        paddingVertical: responsiveHeight(1.5),
        justifyContent: 'center',
        paddingHorizontal: responsiveHeight(1.5),
        alignItems: 'center',
        borderRadius: responsiveHeight(1.5),
    },
});
