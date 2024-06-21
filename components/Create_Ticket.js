import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View ,ToastAndroid,StatusBar} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Create_Ticket = () => {
  const [ticketTitle, setticketTitle] = useState('')
  const [issuseTicket, setissuseTicket] = useState('')
  const [selectedState, setSelectedState] = useState('');
  const [selectedSeverity,setSelectedSeverity]=useState('')
  
  const [loading,setLoading]=useState(true)
  const [errorTicket, seterrorticket] = useState({
    errortitle: '',
    errorDescription: '',
    errorSeverity:'',
    errorState:''

})

  // List of all states in India
  const statesInIndia = [
    'andaman and nicobar islands',
    'andhra pradesh',
    'arunachal pradesh',
    'assam',
    'bihar',
    'chandigarh',
    'chhattisgarh',
    'dadra and nagar haveli',
    'daman and diu',
    'delhi',
    'goa',
    'gujarat',
    'haryana',
    'himachal pradesh',
    'jammu and kashmir',
    'jharkhand',
    'karnataka',
    'kerala',
    'ladakh',
    'lakshadweep',
    'madhya pradesh',
    'maharashtra',
    'manipur',
    'meghalaya',
    'mizoram',
    'nagaland',
    'odisha',
    'puducherry',
    'punjab',
    'rajasthan',
    'sikkim',
    'tamil nadu',
    'telangana',
    'tripura',
    'uttar pradesh',
    'uttarakhand',
    'west bengal'
  ];

  const severitylist=[
  'high',
  'low',
  'medium'
  ]
  


  const onClickCreateTicket=async()=>{
   
      setLoading(true);
      // setError({ errorName: '', errorCategory: '', errorPrice: '' });
      try {
        const jwtToken = await AsyncStorage.getItem('jwtToken');
  
        const url = 'https://shubhansh7777.pythonanywhere.com/ticket/'; // Replace with your API endpoint
        const data = {
          title: ticketTitle,
          description: issuseTicket,
          severity:selectedSeverity,
          state: selectedState,
        }; // Data to be sent as the request body
         console.log(data,'data')
        const options = {
          method: 'POST', // Specify POST method
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(data), // Stringify the data object for the request body
        };
  
        const response = await fetch(url, options);
  
        if (!response.ok) {
          const errorticket = await response.json();
          // Toast.show({
          //   type: 'error',
          //   text1: errorticket.detail,
          //   // text2: 'This is some something 👋'
          // });
          seterrorticket({ errortitle: errorticket.title, errorDescription: errorticket.description,errorSeverity:errorticket.severity ,errorState:errorticket.state});

          console.log(errorticket,'errorticket')
          // const { name = '', category = '', price = '' } = errorData.errors || {}; // Handle potential error structure
          // setError({ errorName: errorData.name, errorCategory: errorData.category, errorPrice: errorData.price });
          // throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const ticketCreate = await response.json();
        ToastAndroid.show(ticketCreate.detail, ToastAndroid.SHORT);

        // console.log(ticketCreate,'ticketCreate')
        // Toast.show({
        //   type: 'success',
        //   text1: ticketCreate.detail,
        //   position: 'bottom'

        //   // text2: 'This is some something 👋'
        // });
    

        // setProducts(prevData => [...prevData, newProduct]);
        // console.log('POST request successful:', newProduct);
  
      } catch (error) {
        // console.error('POST request failed:', error);
        Toast.show({
          type: 'error',
          text1: 'POST request failed:',

          // text2: 'This is some something 👋'
        });
      } finally {
        setLoading(false);
        setticketTitle('')
        setissuseTicket('')
        setSelectedState('')
        setSelectedSeverity('')
      }
  

  }

  return (
    <SafeAreaView>
            <StatusBar style="dark" />

      <Toast />

      <View style={styles.containerTicket} >
        <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '500' }}>CREATE TICKET</Text>
        <KeyboardAvoidingView style={{ width: '80%' }}>
          <View >

            <TextInput placeholder="TICKET TITLE" onChangeText={(data)=>setticketTitle(data)} style={styles.tickettitleinput} value={ticketTitle}/>
            {errorTicket && <Text style={{ color: 'red', fontWeight: 500, fontSize: responsiveFontSize(1.5),marginBottom: responsiveHeight(2.5), }}>{errorTicket.errortitle}</Text>
                                        }
            <TextInput placeholder="TELL US MORE ABOUT THIS ISSUE..." numberOfLines={5}
              multiline={true} onChangeText={(data)=>setissuseTicket(data)} style={styles.issuseInput} value={issuseTicket} />
               {errorTicket && <Text style={{ color: 'red', fontWeight: 500, fontSize: responsiveFontSize(1.5), }}>{errorTicket.errorDescription}</Text>
                                        }
                 <View style={{borderColor: '#C4C4C4', borderWidth: responsiveHeight(0.2),marginTop:responsiveHeight(2),borderRadius:responsiveHeight(1)}}>
            <Picker
              
              selectedValue={selectedSeverity}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedSeverity(itemValue)
              }>
              <Picker.Item label="SELECT SEVERITY" value='' style={{fontSize:responsiveFontSize(1.3),fontWeight:'900'}} />
              {severitylist.map((state, index) => (
                <Picker.Item key={index} label={state} value={state}  style={{fontSize:responsiveFontSize(1.3),fontWeight:'bold'}}/>
              ))}
            </Picker>
            </View>
            {errorTicket && <Text style={{ color: 'red', fontWeight: 500, fontSize: responsiveFontSize(1.5), }}>{errorTicket.errorSeverity}</Text>
                                        }
              <View style={{borderColor: '#C4C4C4', borderWidth: responsiveHeight(0.2),marginTop:responsiveHeight(2),borderRadius:responsiveHeight(1)}}>
            <Picker
              
              selectedValue={selectedState}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedState(itemValue)
              }>
              <Picker.Item label="Select State" value='' style={{fontSize:responsiveFontSize(1.2)}}/>
              {statesInIndia.map((state, index) => (
                <Picker.Item key={index} label={state.toUpperCase()} value={state} style={{fontSize:responsiveFontSize(1.2)}}/>
              ))}
            </Picker>
            </View>
            {errorTicket && <Text style={{ color: 'red', fontWeight: 500, fontSize: responsiveFontSize(1.5), }}>{errorTicket.errorState}</Text>
                                        }
            <TouchableOpacity style={styles.submitbutton} onPress={onClickCreateTicket}>
              <Text style={styles.textSubmit}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

      </View>

    </SafeAreaView>
  )
}

export default Create_Ticket

const styles = StyleSheet.create({
  containerTicket: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(15),
  },
  tickettitleinput: {
    borderRadius: responsiveHeight(1),
    borderColor: '#C4C4C4',
    paddingVertical: responsiveHeight(1.8),
    borderWidth: responsiveHeight(0.2),
    marginTop: responsiveHeight(2.5),
    paddingLeft: responsiveHeight(1),
    backgroundColor: '#F9F9F9',
    fontSize:responsiveFontSize(1.3),
    fontWeight:'600'

  },
  issuseInput: {
    borderRadius: responsiveHeight(1),
    borderColor: '#C4C4C4',
    borderWidth: responsiveHeight(0.20),
    backgroundColor: '#F9F9F9',
    textAlignVertical: 'top',
    padding: responsiveHeight(1),
    fontSize:responsiveFontSize(1.2),
    fontWeight:'600'
  },
  submitbutton: {
    backgroundColor: '#0386D0',
    paddingVertical: responsiveHeight(1.3),
    borderRadius: responsiveHeight(1),
    marginTop: responsiveHeight(2)
  },
  textSubmit: {
    textAlign: 'center',
    color: '#ffffff'
  }
})
