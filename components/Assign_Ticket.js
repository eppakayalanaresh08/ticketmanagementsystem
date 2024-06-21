import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Modal, Pressable, Dimensions, ToastAndroid, TouchableWithoutFeedback, StatusBar, ActivityIndicator, Linking } from 'react-native'
import React, { useState, useRef, useCallback, useMemo, } from 'react';



import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from '@gorhom/bottom-sheet';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import { useFocusEffect } from '@react-navigation/native';



const userData = [
  {
    id: 1,
    TicketId: 92333,
    TicketTitle: 'Printer',
    customer: 'administrator@gmail.com	',
    Location: 'TG',
    dateCreate: 'Jan. 22, 2024, 11:06 a.m',
    Action: 'Assign',


  },

  {
    id: 2,
    TicketId: 92333,
    TicketTitle: 'Printer',
    customer: 'administrator@gmail.com	',
    Location: 'TG',
    dateCreate: 'Jan. 22, 2024, 11:06 a.m',
    Action: 'Assign',


  },
  {
    id: 3,
    TicketId: 92333,
    TicketTitle: 'Printer',
    customer: 'administrator@gmail.com	',
    Location: 'TG',
    dateCreate: 'Jan. 22, 2024, 11:06 a.m',
    Action: 'Assign',


  },
  {
    id: 4,
    TicketId: 92333,
    TicketTitle: 'Printer',
    customer: 'administrator@gmail.com	',
    Location: 'TG',
    dateCreate: 'Jan. 22, 2024, 11:06 a.m',
    Action: 'Assign',


  },
  {
    id: 5,
    TicketId: 92333,
    TicketTitle: 'Printer',
    customer: 'administrator@gmail.com	',
    Location: 'TG',
    dateCreate: 'Jan. 22, 2024, 11:06 a.m',
    Action: 'Assign',


  },
  {
    id: 6,
    TicketId: 92333,
    TicketTitle: 'Printer',
    customer: 'administrator@gmail.com	',
    Location: 'TG',
    dateCreate: 'Jan. 22, 2024, 11:06 a.m',
    Action: 'Assign',


  },

]

const userDataNonlocal = [
  {
    id: 1,
    TicketId: 92333,
    TicketTitle: 'Printer',
    customer: 'administrator@gmail.com	',
    Location: 'TG',
    dateCreate: 'Jan. 22, 2024, 11:06 a.m',
    Action: 'Assign',


  },



]




const Assign_Ticket = ({ route }) => {

  let newItem;
  if (route.params == undefined) {

  }
  else {
    const { item } = route.params;
    newItem = item
  }


  console.log(newItem,'ticket')









  // console.log(item)

  const [openmodelcomment, setopenModelcomment] = useState(false)
  const [nameComment, setnameComment] = useState('')

  const [file, setFile] = useState(null);
  const [fileUri, setFileUri] = useState(null);
  const [listimages, setlistimages] = useState([])
  const [uploadimagenew, setimageupload] = useState({})
  const [loading, setLoading] = useState(true)
  const [roleCheck, setRoleCheck] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('')


  const navigation = useNavigation()



  const [getticketsUser, setTicketsUser] = useState([])

  const fetchDatatickets = async () => {

    try {
      const role = await AsyncStorage.getItem('rolecheck');
      setRoleCheck(role)
      const jwtToken = await AsyncStorage.getItem('jwtToken');

      const url = 'https://shubhansh7777.pythonanywhere.com/ticket/'
      // const params = { id: 123, limit: 10 };
      // const url = new URL(baseUrl);
      // url.search = new URLSearchParams(params);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,

        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTicketsUser(data)
      console.log(data); // Process the fetched data here
    } catch (error) {
      console.error(error);
    }
    setLoading(false)

  }




  useFocusEffect(
    React.useCallback(() => {
      // fetchDataProduct();
      fetchDatatickets()
    }, [])
  );




  const onHandleAssign = () => {
    navigation.navigate('Printerticket')

  }

  const onHandleAssignSubmit = async () => {


    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');



      // const allimagesupload = {
      //   'attachments':{
      //     'attachment_1': listimages[0],
      //     'attachment_2': null,
      //     'attachment_3': null,
      //     'attachment_4': null,
      //     'attachment_5': null,
      //   }

      // }







      // console.log(allimagesupload, 'updateallimages')

      //  const comment=nameComment
      // const commentupload = {
      //   'comment': nameComment,
      //   'attachments': allimagesupload
      // }
      // const newelementimage = { uri: uploadimagenew.uri, name: uploadimagenew.name, type: uploadimagenew.mimeType }


      // console.log(newelementimage, 'newcomment')

      const nullvalue = ''
      let secondvalue = ''
      let thirdvalue = ''
      let fourthvalue = ''
      let fiftyvalue = ''


      if (listimages.length === 2) {
        secondvalue = listimages[1]
      }
      if (listimages.length === 3) {
        thirdvalue = listimages[2]
      }
      if (listimages.length === 4) {
        fourthvalue = listimages[3]
      }
      if (listimages.length === 5) {
        fiftyvalue = listimages[4]
      }
      // thirdvalue=listimages[2]
      // let fourthvalue=''
      // fourthvalue=listimages[3]
      // let fiftyvalue=''
      // fiftyvalue=listimages[4]
      const fileone = {
        'comment': nameComment, 'attachment_1': listimages[0],
        'attachment_2': secondvalue,
        'attachment_3': thirdvalue,
        'attachment_4': fourthvalue,
        'attachment_5': fiftyvalue,
      }

      console.log(fileone, 'allimagetickets')
      const formData = new FormData();
      formData.append('comment', nameComment);
      // formData.append('attachments', allimagesupload)
      formData.append('attachment_1', listimages[0])
      formData.append('attachment_2', secondvalue)

      formData.append('attachment_3', thirdvalue)

      formData.append('attachment_4', fourthvalue)
      formData.append('attachment_5', fiftyvalue)

      // ' attachment_1': listimages[0],
      //     'attachment_2': null,
      //     'attachment_3': null,
      //     'attachment_4': null,
      //     'attachment_5': null,


      // const EditUpdatebranch = {
      //   name: '',
      //   usename: '',
      // }

      const response = await fetch(`https://shubhansh7777.pythonanywhere.com/ticket/3/verification/`, {
        method: 'PUT',
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',

          Authorization: `Bearer ${jwtToken}`,

        },
        body: formData
      });

      if (!response.ok) {


        const errorcomment = await response.json();
        console.log(errorcomment, 'newupdate')

        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responsecomemnt = await response.json();


      console.log(responsecomemnt, 'updatecomment')
      // await fetchData();
      setLoading(true)

      ToastAndroid.show('Successfully Edited Branch', ToastAndroid.SHORT);
      setnameComment('')
      setlistimages([])


    } catch (error) {
      console.error('new', error);
    }


  }
  // openmodelcomment

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%',]);

  // callbacks
  const handleOpen = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);


  const pickDocument = async () => {

    //   let newresult = await ImagePicker.launchDocumentPickerAsync({
    //     type: "*/*",
    //     copyToCacheDirectory: false
    // });

    // console.log(newresult,'newresult')
    let result = await DocumentPicker.getDocumentAsync({});
    const newImage = result.assets[0]
    setimageupload(newImage)
    console.log(newImage, 'newImage')
    const newelementimage = { uri: newImage.uri, name: newImage.name, type: newImage.mimeType }

    setFile(result.assets[0]);
    setFileUri(result.uri);
    setlistimages(prevList => [...prevList, newelementimage])

    bottomSheetRef.current?.close();

  };

  const DeleteeachImage = (idDeleteimage) => {
    const newfilterimages = listimages.filter((neweach) => neweach.size !== idDeleteimage)
    setlistimages(newfilterimages)
    // console.log(newfilterimages,'update')

  }





  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Ask for camera permissions


    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    // Open the camera
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {


      const { fileName, fileSize, mimeType, ...otherProps } = result.assets[0];
      // const {fileName,...otherProps}= result.assets[0];
      const newcamerImage = { ...otherProps, size: fileSize, name: fileName, type: mimeType };
      const newelementcamer = { uri: newcamerImage.uri, name: newcamerImage.name, type: newcamerImage.type }
   

      // const newcamerImage=result.assets[0]
      setlistimages(prevState => [...prevState, newelementcamer])
      setImage(result.assets[0].uri);
    }
  };

  // ViewTicket


  const handleViewTicket = (item) => {
    navigation.navigate('ViewTicket', { item })

  }


  let filterticketsmyTickets;
  if (newItem === 'active_ticket' ) {
    filterticketsmyTickets = getticketsUser.filter((eachticket) => eachticket.status === 'active')

  }
  else if (newItem === 'assigned_ticket') {
    filterticketsmyTickets = getticketsUser.filter((eachticket) => eachticket.status === 'assigned')

  } else if (newItem === 'verification_ticket') {
    filterticketsmyTickets = getticketsUser.filter((eachticket) => eachticket.status === 'verification')

  }
  else if (newItem === 'close_ticket') {
    filterticketsmyTickets = getticketsUser.filter((eachticket) => eachticket.status === 'close')

  }
  else {
    filterticketsmyTickets = getticketsUser

  }



  if (selectedFilter === 'all') {
    filterticketsmyTickets = getticketsUser

  } else if (selectedFilter === 'active_ticket') {
    filterticketsmyTickets = getticketsUser.filter((eachticket) => eachticket.status === 'active')
  } else if (selectedFilter === 'close_ticket') {
    filterticketsmyTickets = getticketsUser.filter((eachticket) => eachticket.status === 'close')
  }
  else if (selectedFilter === 'assigned_ticket') {
    filterticketsmyTickets = getticketsUser.filter((eachticket) => eachticket.status === 'assigned')
  }
  else if (selectedFilter === 'verification_ticket') {
    filterticketsmyTickets = getticketsUser.filter((eachticket) => eachticket.status === 'verification')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      {openmodelcomment &&
        <>

          <BlurView intensity={230} style={[styles.absolute, { height: Dimensions.get('window').height }]} tint="light" />

        </>}



      {loading ? (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating={loading} size="large" color="#0000ff" />
        </View>
      ) : (<>

        <View style={{ borderColor: '#C4C4C4', borderWidth: 2, marginTop: responsiveHeight(1), marginHorizontal: responsiveHeight(4), borderRadius: responsiveHeight(1), marginBottom: responsiveHeight(5) }}>
          <Picker
            selectedValue={selectedFilter}
            onValueChange={(itemValue) => setSelectedFilter(itemValue)}
          >
            <Picker.Item label="All Tickets" value="all" style={{ fontSize: responsiveFontSize(1.4) }} />
            <Picker.Item label="Assigned Tickets" value="assigned_ticket" style={{ fontSize: responsiveFontSize(1.4) }} />
            <Picker.Item label="Active Tickets" value="active_ticket" style={{ fontSize: responsiveFontSize(1.4) }} />
            <Picker.Item label="Verification Tickets" value="verification_ticket" style={{ fontSize: responsiveFontSize(1.4) }} />
            <Picker.Item label="Closed Tickets" value="close_ticket" style={{ fontSize: responsiveFontSize(1.4) }} />
          </Picker>
        </View>


        {filterticketsmyTickets.length === 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: '500' }}>No Tickets available</Text>
        </View> :
          <ScrollView>





            <View style={styles.containerlistticket}>
              {filterticketsmyTickets.map((eachcard) => (
                <View style={styles.modalView} key={eachcard.id}>
                  <View style={styles.eachidContainer}>
                    <Text style={{ fontSize: responsiveFontSize(1.2), fontWeight: '500', color: '#fff' }}>TAD-{eachcard.id}</Text>
                  </View>
                  <View style={styles.eachcardObject}>

                    <View style={styles.containerEachCard}>

                      <Text style={styles.heading}>Title</Text>
                      <Text style={styles.titlestyle}>{eachcard.title}</Text>

                    </View>
                    <View style={styles.containerEachCard}>
                      <Text style={styles.heading}>Description</Text>

                      <Text style={styles.description}>{eachcard.description}</Text>

                    </View>
                    <View style={styles.containerEachCard}>
                      <Text style={styles.heading}>Ticket Status</Text>

                      <Text style={styles.descriptionstatus}>{eachcard.status}</Text>

                    </View>


                    <TouchableOpacity style={styles.viewTicketButton} onPress={() => handleViewTicket(eachcard)}>
                      <Text style={styles.viewTicketText}>ViewTicket</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

        }





        <Modal
          animationType="slide"
          transparent={true}
          visible={openmodelcomment}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setopenModelcomment(!openmodelcomment);
          }}>


          <View style={styles.centeredView}>
            <ScrollView style={{ marginTop: responsiveHeight(15) }}>
              <View style={styles.modalView}>
                <ScrollView >

                  <View style={{ marginVertical: responsiveHeight(1) }}>
                    <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>Comment </Text>
                    <TextInput placeholder="Enter the comment..." numberOfLines={5}
                      multiline={true} onChangeText={(data) => setnameComment(data)} style={styles.issuseInput} value={nameComment} />

                  </View>
                  <View>
                    <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5), marginBottom: responsiveHeight(0.2) }}>File Upload </Text>
                    <TouchableOpacity style={styles.fileuploadview} onPress={handleOpen}>

                      <SimpleLineIcons name="cloud-upload" size={24} color="black" />
                      <Text style={{ fontSize: responsiveFontSize(1.2), color: 'gray', textAlign: 'center' }}>
                        Select files from your device

                        {'\n'}only upload five images or{' > '}5</Text>
                      {/* <Text>hk</Text> */}
                    </TouchableOpacity>
                  </View>

                  {listimages.map((eachimage, index) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} key={index}>

                      <Text style={{ fontSize: responsiveFontSize(1.3), marginRight: responsiveHeight(0.3) }}>{index + 1}.</Text>

                      <Text style={{ fontSize: responsiveFontSize(1.3) }}>image</Text>
                      <TouchableOpacity onPress={() => DeleteeachImage(eachimage.size)} style={{ marginLeft: responsiveHeight(0.2), }}>
                        <Entypo name="cross" size={responsiveHeight(2.4)} color="red" />
                      </TouchableOpacity>
                    </View>
                  ))}




                  {/* <Text style={styles.modalText}>Hello World!</Text> */}
                  <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
                    <Pressable
                      style={[styles.button, styles.buttonSubmit]}
                      onPress={onHandleAssignSubmit}>
                      <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>



                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setopenModelcomment(!openmodelcomment)}>
                      <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                  </View>
                </ScrollView>

              </View>
            </ScrollView >

          </View>
          {/* </TouchableWithoutFeedback> */}
          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}

          >

            <TouchableWithoutFeedback onPress={handleClose}>

              <Pressable
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
                onPress={handleClose} // Close the bottom sheet when backdrop is touched
              >
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                  <SimpleLineIcons name="close" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.bottomSheetContent}>

                  <TouchableOpacity style={styles.bottomeachItem} onPress={pickImage}>

                    <FontAwesome name="camera" size={responsiveHeight(3.2)} color="black" />
                    <Text>Camera</Text>

                  </TouchableOpacity>

                  <TouchableOpacity style={styles.bottomeachItem} onPress={pickDocument}>
                    <MaterialIcons name="perm-media" size={responsiveHeight(3.2)} color="black" />
                    <Text>Gallery</Text>

                  </TouchableOpacity>

                  {/* Add your bottom sheet content here */}
                </View>
              </Pressable>
            </TouchableWithoutFeedback>
          </BottomSheet>
        </Modal>
      </>)}













    </SafeAreaView>
  )
}

export default Assign_Ticket

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
    // paddingHorizontal:30
  },


  table: {
    borderWidth: 0.1,
    borderColor: "#DCDCDC",
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    // padding:
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",

  },
  cellhead: {
    width: responsiveHeight(8),
    height: responsiveHeight(6),
    borderWidth: 0.5,
    color: "black",
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
    fontWeight: '500',
    borderColor: "black",
    flex: 1,
    backgroundColor: '#DCDCDC',


  },
  cell: {
    flex: 1,

    borderWidth: 0.5,
    width: responsiveHeight(8),
    height: responsiveHeight(8),
    textAlign: "center",
    fontSize: 10,
    color: "black",
    borderColor: "black",
    flexWrap: 'wrap',



  },

  cellid: {

    paddingTop: 10,
    borderWidth: 0.5,
    width: responsiveHeight(8),
    height: responsiveHeight(8),
    textAlign: "center",
    fontSize: 10,
    color: "black",
    borderColor: "black",
  },
  texttickets: {
    fontSize: responsiveFontSize(2), marginHorizontal: 20, fontWeight: '500', marginVertical: responsiveHeight(1)
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',


    // position:'absolute'
  },

  modalView: {
    minHeight: responsiveHeight(16),
    width: responsiveHeight(40),
    margin: 20,
    backgroundColor: 'white',
    borderRadius: responsiveHeight(1),
    // padding: responsiveHeight(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  issuseInput: {
    borderRadius: responsiveHeight(1),
    borderColor: '#C4C4C4',
    borderWidth: responsiveHeight(0.20),
    backgroundColor: '#F9F9F9',
    textAlignVertical: 'top',
    padding: responsiveHeight(1),
    width: responsiveHeight(30)
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginHorizontal: responsiveHeight(2)
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop: responsiveHeight(1),
    backgroundColor: '#2196F3',
  },
  buttonSubmit: {
    marginTop: responsiveHeight(1),
    backgroundColor: '#99CC00',
  },
  fileuploadview: {
    borderColor: 'lightgray',
    borderWidth: responsiveHeight(0.2),
    paddingVertical: responsiveHeight(2.5),
    width: responsiveHeight(30),
    borderStyle: 'dashed',
    borderRadius: responsiveHeight(1),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'

  },
  bottomSheetContent: {

    flex: 1,
    flexDirection: 'row',


    justifyContent: 'space-evenly'
    // alignItems: 'center',
    // padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    // padding: 10,
    marginRight: responsiveHeight(2),
    marginBottom: responsiveHeight(3),


    borderRadius: 20,
    // backgroundColor: '#e0e0e0',

  },
  bottomeachItem: {
    height: responsiveHeight(12),
    width: responsiveHeight(12),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#e0e0e0',
    borderRadius: responsiveHeight(3)
  },
  textStyle: {
    color: '#ffffff'
  },

  description: {
    fontSize: responsiveHeight(1.2),
    color: '#000000',
  },



  containerlistticket: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  titlestyle: {
    marginBottom: responsiveHeight(0.6),
    fontWeight: '500',
    fontSize: responsiveFontSize(1.4)
  },

  descriptionstatus: {
    fontWeight: '400',
    fontSize: responsiveHeight(1.2),
  },
  heading: {
    fontWeight: '500',
    fontSize: responsiveFontSize(1.2),
    width: responsiveHeight(13)
  },
  eachcardObject: {
    padding: responsiveHeight(2),
  },
  containerEachCard: {
    // flex: 1,
    flexDirection: 'row',
    marginTop: responsiveHeight(1),
    width: responsiveHeight(27)
  },
  viewTicketButton: {
    backgroundColor: '#0386D0',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
    marginHorizontal: responsiveHeight(8),
    paddingVertical: responsiveHeight(0.8),
    borderRadius: responsiveHeight(1)
  },
  viewTicketText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: responsiveFontSize(1.3)
  },
  eachidContainer: {
    borderRadius: responsiveHeight(0.4),
    backgroundColor: '#198754',
    width: responsiveHeight(10),
    justifyContent: 'center',
    alignItems: 'center'
  }

})