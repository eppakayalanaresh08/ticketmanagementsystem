
import {
  StyleSheet, Text, View, FlatList, ToastAndroid, TextInput, TouchableOpacity, Pressable, TouchableWithoutFeedback,

  RefreshControl,
  StatusBar, Image, Dimensions, Linking, ActivityIndicator
} from 'react-native'
import React, { useState, useRef, useCallback, useMemo } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';

import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { format, parseISO } from 'date-fns';
import Octicons from '@expo/vector-icons/Octicons';
const ViewTicket = ({ route }) => {
  const { item } = route.params;
  const dataArray = Object.entries(item); // Convert object to key-value pairs
  // like this format
  // [["id", 2], ["title", "Change printer"], ["description", "Printer HP-009 need an replacement of cartridge at urgent manner"], ["severity", "high"], ["state", "telangana"], ["status", "verification"], ["owner", "enaresh@techadlien.com from techadlien"], ["agent", "nithin123@gmail.com"], ["created_at", "2024-05-25T12:19:24.561916+05:30"], ["updated_at", "2024-06-05T16:13:28.267588+05:30"]]
  console.log(item, 'object')
  const createdAt = parseISO(item.created_at);
  const createdformattedDate = format(createdAt, 'dd, MMM yyyy');
  const createdformattedTime = format(createdAt, 'hh:mm a');

  const updatedAt = parseISO(item.updated_at);
  const updaeformattedDate = format(updatedAt, 'dd, MMM yyyy');
  const updateformattedTime = format(updatedAt, 'hh:mm a');
 


  const [nameComment, setnameComment] = useState('');
  const [listimages, setlistimages] = useState([]);

  const [roleCheck, setRoleCheck] = useState('')
  const [getImagesverification, setimageverification] = useState({})
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false);

  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();

  // variables
  const snapPoints = useMemo(() => ['65%'], []);

  const fetchDatatickets = async () => {
    const role = await AsyncStorage.getItem('rolecheck');
    setRoleCheck(role)
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');

      const url = `https://shubhansh7777.pythonanywhere.com/ticket/${item.id}/verification/`
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
        // throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // setProducts(data)
      setimageverification(data)
      setRefreshing(false);

      // console.log(data); // Process the fetched data here
    } catch (error) {
      ToastAndroid.show("Ticket not found", ToastAndroid.SHORT);



      // 
    }
    setLoading(false)
  };

  useFocusEffect(
    useCallback(() => {
      fetchDatatickets();
    }, [])
  );

  const DeleteeachImage = (idDeleteimage) => {
    const newfilterimages = listimages.filter((neweach) => neweach.size !== idDeleteimage);
    setlistimages(newfilterimages);
  };

  const onHandleAssignSubmit = async () => {
    console.log(listimages, 'update')
    try {

      const nullvalue = '';
      let secondvalue = '';
      let thirdvalue = '';
      let fourthvalue = '';
      let fiftyvalue = '';

      if (listimages.length === 2) {
        secondvalue = listimages[1];
      }
      if (listimages.length === 3) {
        thirdvalue = listimages[2];
      }
      if (listimages.length === 4) {
        fourthvalue = listimages[3];
      }
      if (listimages.length === 5) {
        fiftyvalue = listimages[4];
      }

      const fileone = {
        comment: nameComment,
        attachment_1: listimages[0],
        attachment_2: secondvalue,
        attachment_3: thirdvalue,
        attachment_4: fourthvalue,
        attachment_5: fiftyvalue,
      };

      const formData = new FormData();
      formData.append('comment', nameComment);
      formData.append('attachment_1', listimages[0]);
      formData.append('attachment_2', secondvalue);
      formData.append('attachment_3', thirdvalue);
      formData.append('attachment_4', fourthvalue);
      formData.append('attachment_5', fiftyvalue);

      const jwtToken = await AsyncStorage.getItem('jwtToken');

      const response = await fetch(`https://shubhansh7777.pythonanywhere.com/ticket/${item.id}/verification/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorcomment = await response.json();
        console.log(errorcomment, 'newupdate');
        if (errorcomment.comment) {
          ToastAndroid.show(`Please fill in all fields`, ToastAndroid.SHORT);
        } else if (errorcomment) {
          ToastAndroid.show(`Please fill in all fields`, ToastAndroid.SHORT);
        }

      }
      const responsecomemnt = await response.json();
      // console.log(responsecomemnt, 'updatecomment');
      // if (responsecomemnt.detail) {
      // }
      navigation.navigate('MyTickets')


      ToastAndroid.show('Successfully Commented', ToastAndroid.SHORT);
      setnameComment('');
      setlistimages([]);
      setLoading(false)

    } catch (error) {

      // console.error('new', error);
    }
  };

  const pickImage = async () => {
    bottomSheetRef.current?.close();

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { fileName, fileSize, mimeType, ...otherProps } = result.assets[0];
      const newcamerImage = { ...otherProps, size: fileSize, name: fileName, type: mimeType };
      const newelementcamer = { uri: newcamerImage.uri, name: newcamerImage.name, type: newcamerImage.type };
      setlistimages((prevState) => [...prevState, newelementcamer]);

    }

  };

  const pickDocument = async () => {
    bottomSheetRef.current?.close();

    let result = await DocumentPicker.getDocumentAsync({});
    // if (result.type !== 'cancel') {
    const newImage = result.assets[0];
    const newelementimage = { uri: newImage.uri, name: newImage.name, type: newImage.mimeType };
    setlistimages((prevList) => [...prevList, newelementimage]);
    // }
  };


  const capitalizeAndReplace = (str) => {
    return str.replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} Time:${hours}:${minutes}`;
  }

  const handlePress = (key, val) => {
    if (key === 'mobile') {
      Linking.openURL(`tel:${val}`);
    } else if (key === 'email') {
      Linking.openURL(`mailto:${val}`);
    } else if (key === 'location') {
      Linking.openURL(val);
    }
  };

  // console.log(getImagesverification.attachments.attachment_1,'item')

  const statuscheckshowcomment = item.status

  console.log(statuscheckshowcomment, 'viewticket')

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImagePress = (url) => {
    setSelectedImage(url);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };


  const onhandleassignactive = async (idassign) => {

    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');

      const response = await fetch(`https://shubhansh7777.pythonanywhere.com//ticket/${idassign}/activate/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        // body: JSON.stringify(EditUpdatebranch)
      });

      if (!response.ok) {


        const erroractiveAssigntickets = await response.json();
        console.log(erroractiveAssigntickets, 'newupdate')

        // throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseAssignticket = await response.json();


      console.log(responseAssignticket, 'new')
      await fetchDatatickets();
      setLoading(true)
      ToastAndroid.show('Successfully Activated Ticket', ToastAndroid.SHORT);
      navigation.navigate('MyTickets')


    } catch (error) {
      // console.error('new', error);
    }
  }




  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDatatickets()
  }, []);








  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  return (
    <View>

      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#8B78FF" // Customize refresh control color
        />
      }>




        <View style={{ marginHorizontal: responsiveHeight(3) }}>

          <View style={[styles.containercard,]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'flex-start', width: '90%' }}>
              <View style={[styles.containerprofileText,]} >
                <View  style={{flexDirection:'column' ,justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../assets/user.png')} style={[styles.imageIcon,{marginBottom:responsiveHeight(3)}]} />
                <TouchableOpacity onPress={() => handlePress('location', item.owner.location)}>
                <Entypo name="location" size={responsiveHeight(2)} color="#8B78FF" />
                </TouchableOpacity>
                </View>
                <View style={styles.nameTextProfile}>

                  <Text style={styles.assignedText}>Assigend by</Text>
                  <TouchableOpacity onPress={() => handlePress('email', item.owner.email)}>
                  <Text style={styles.nameText}>{item.owner.email}</Text>
                  </TouchableOpacity>
                  <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <FontAwesome5 name="city" size={responsiveHeight(1.7)} color="#8B78FF" />

                   <Text style={[styles.nameText,{marginLeft:responsiveHeight(0.5)}]}>{item.state}</Text>
                   </View>
                  <TouchableOpacity onPress={() => handlePress('mobile', item.owner.mobile)} style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <Ionicons name="call" size={responsiveHeight(1.7)} color="#8B78FF" />
                   <Text style={[styles.nameText,{marginLeft:responsiveHeight(0.5)}]}>{item.owner.mobile}</Text>
                   </TouchableOpacity>

                   <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <Octicons name="organization" size={responsiveHeight(1.7)} color="#8B78FF" />

                   <Text style={[styles.nameText,{marginLeft:responsiveHeight(0.5)}]}>{item.owner.organization}</Text>
                   </View>


               

          
                </View>
              </View>

              <View style={styles.containerprofileText}>
                <Image source={require('../assets/user.png')} style={styles.imageIcon} />
                <View style={styles.nameTextProfile}>

                  <Text style={styles.assignedText}>Agent</Text>
                  <Text style={styles.nameText}>{item.agent}</Text>
                </View>
              </View>
            </View>
          </View >
          <View style={styles.containercard}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
            <View style={styles.containerprofileText}>
              <View style={styles.datebg}>
                <Image source={require('../assets/ticket.png')} style={{ height: responsiveHeight(3), width: responsiveHeight(3) }} />

              </View>

              <View style={styles.nameTextProfile}>
                <Text style={styles.assignedText}>Status</Text>
                <View style={[styles.containerstatus,{marginTop:responsiveHeight(0.4)}]} >
                  <Text style={[styles.nameText,{color:'#8B78FF',fontSize:responsiveFontSize(1.2),fontWeight:'700'}]}>{item.status}</Text>
                </View>
              </View>
            </View>

            <View style={styles.containerprofileText}>
            

              <View style={styles.nameTextProfile}>
                <Text style={styles.assignedText}>Severity</Text>
                <View style={[styles.containerstatus,{marginTop:responsiveHeight(0.2)}]} >
                  <Text style={[styles.nameText,{color:'#8B78FF',fontSize:responsiveFontSize(1.2),fontWeight:'700'}]}>{item.severity}</Text>
                </View>
              </View>
            </View>
            </View>
          </View>


          <View style={styles.containercard}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
            <View style={styles.containerprofileText}>
              <View style={styles.datebg}>
                <Fontisto name="date" size={responsiveHeight(2.2)} color="#ffffff" />
              </View>

              <View style={styles.nameTextProfile}>
                <Text style={styles.assignedText}>Created at</Text>
                <Text style={styles.nameText}>{createdformattedDate}</Text>
              </View>
            </View>
            <View style={styles.containerprofileText}>
              <View style={styles.datebg}>
                <AntDesign name="clockcircle"  size={responsiveHeight(2.2)} color="#ffffff" />
              </View>

              <View style={styles.nameTextProfile}>
                <Text style={styles.assignedText}>Time</Text>
                <Text style={styles.nameText}>{createdformattedTime}</Text>
              </View>
            </View>
            </View>
          </View>











          <View style={styles.containercard}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
            <View style={styles.containerprofileText}>
              <View style={styles.datebg}>
                <Fontisto name="date" size={responsiveHeight(2.2)} color="#ffffff" />
              </View>

              <View style={styles.nameTextProfile}>
                <Text style={styles.assignedText}>Updated at </Text>
                <Text style={styles.nameText}>{updaeformattedDate}</Text>
              </View>
            </View>
            <View style={styles.containerprofileText}>
              <View style={styles.datebg}>
                <AntDesign name="clockcircle"  size={responsiveHeight(2.2)} color="#ffffff" />
              </View>

              <View style={styles.nameTextProfile}>
                <Text style={styles.assignedText}>Time</Text>
                <Text style={styles.nameText}>{updateformattedTime}</Text>
              </View>
              
            </View>
            </View>
          </View>
      


          <View style={styles.containercard}>
            <Text style={styles.nameText}>Title</Text>
            <Text style={styles.titleheading}>{item.title}</Text>
          </View>

          <View style={styles.containercard}>
            <Text style={styles.nameText}>Description</Text>
            <Text style={[styles.titleheading, { fontSize: responsiveFontSize(1.2) }]}>{item.description}</Text>
          </View>


        </View>










        {/* <View style={styles.modalViewPopUp}>
          <View style={{ alignSelf: 'flex-end' }}>

          </View>
          <View style={{ padding: 15 }}>
            {dataArray.map((item, index) => {
              const [header, value] = item;
              const formattedHeader = capitalizeAndReplace(header);

              if (header === 'created_at' || header === 'updated_at') {
                const formattedDate = formatDate(value);
                return (
                  <View key={index} style={styles.itemContainer}>
                    <Text style={styles.headerText}>{formattedHeader}</Text>
                    <Text style={styles.valueText}>: {formattedDate}</Text>
                  </View>
                );
              }

              if (typeof value === 'object' && value !== null) {
                return (
                  <View key={index} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
                    <Text style={styles.headerText}>{formattedHeader}</Text>
                    {Object.entries(value).map(([key, val], subIndex) => {
                      const formattedKey = capitalizeAndReplace(key);
                      const isLink = key === 'mobile' || key === 'email' || key === 'location';
                      return (
                        <Pressable key={subIndex} onPress={() => handlePress(key, val)} style={{ flexDirection: 'row', marginTop: 5 }}>
                          <Text style={[styles.subHeaderText,]}>{formattedKey}</Text>
                          <Text style={[styles.subValueText, isLink && styles.linkText]}>: {val}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                );
              }

              return (
                <View key={index} style={styles.itemContainer}>
                  <Text style={styles.headerText}>{formattedHeader}</Text>
                  <Text style={styles.valueText}>: {value}</Text>
                </View>
              );
            })}


          </View>
        </View> */}

        <View style={{ flex: 1, flexDirection: 'column', justifyContentc: 'center', alignItems: 'center' }}>
          {(statuscheckshowcomment === 'assigned') ?
            <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(60, 179, 113)', marginTop: responsiveHeight(2), padding: responsiveHeight(1.2), borderRadius: responsiveHeight(1.3) }}
              onPress={() => onhandleassignactive(item.id)}>
              <Text style={{ color: '#fff' }}>Start Work</Text>
            </Pressable> :
            <View>
              {(statuscheckshowcomment === 'verification' || statuscheckshowcomment === 'close') ?
                <View style={styles.containercomments}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: '500' }}>Comment :</Text>
                    <Text>{getImagesverification.comment}</Text>


                  </View>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {getImagesverification && getImagesverification.attachments &&
                      Object.values(getImagesverification.attachments)
                        .filter(url => url !== null)
                        .map((url, index) => (
                          <TouchableOpacity key={index} onPress={() => handleImagePress(url)} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: "center", marginRight: responsiveHeight(2) }}>
                            <Image
                              source={{ uri: url }}
                              style={styles.image}
                            />
                            <Text style={{ fontSize: responsiveFontSize(1.2), fontWeight: '500' }}>Image {index + 1}</Text>
                          </TouchableOpacity>
                        ))
                    }
                  </View>



                  <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
                    <View style={styles.modalContent}>
                      <TouchableOpacity onPress={closeModal} style={styles.closeButtonimage}>
                        <Text style={styles.closeButtonText}>Close</Text>
                      </TouchableOpacity>
                      {/* {selectedImage && ( */}
                      <Image
                        source={{ uri: selectedImage }}
                        style={styles.fullImage}
                        resizeMode="contain"
                      />

                    </View>
                  </Modal>
                </View>
                :
                <View style={{ marginLeft: responsiveHeight(2) }}>
                  <View style={{ marginVertical: responsiveHeight(1) }}>
                    <Text style={{ color: 'gray', fontWeight: '500', fontSize: responsiveFontSize(1.5) }}>Comment</Text>
                    <TextInput
                      placeholder="Enter the comment..."
                      numberOfLines={5}
                      multiline={true}
                      onChangeText={(data) => setnameComment(data)}
                      style={styles.issuseInput}
                      value={nameComment}
                    />
                  </View>
                  <View>
                    <Text style={{ color: 'gray', fontWeight: '500', fontSize: responsiveFontSize(1.5), marginBottom: responsiveHeight(0.2) }}>
                      File Upload
                    </Text>
                    <TouchableOpacity style={styles.fileuploadview} onPress={() => bottomSheetRef.current?.expand()}>
                      <SimpleLineIcons name="cloud-upload" size={24} color="black" />
                      <Text style={{ fontSize: responsiveFontSize(1.2), color: 'gray', textAlign: 'center' }}>
                        Select files from your device
                        {'\n'}only upload five images or{' < '}5
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {listimages.map((eachimage, index) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} key={index}>
                      <Text style={{ fontSize: responsiveFontSize(1.3), marginRight: responsiveHeight(0.3) }}>{index + 1}.</Text>
                      <Text style={{ fontSize: responsiveFontSize(1.3) }}>image</Text>

                    </View>
                  ))}

                  <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2), justifyContent: 'center' }}>
                    <TouchableOpacity style={[styles.button, styles.buttonSubmit]} onPress={onHandleAssignSubmit}>
                      <Text style={styles.textStyle}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                  <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints} enablePanDownToClose={true}>

                    <TouchableOpacity style={styles.closeButton} onPress={() => bottomSheetRef.current?.close()}>
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
                    </View>
                  </BottomSheet>
                </View>

              }
            </View>
          }
        </View>
      </ScrollView>
    </View>
  );
};
export default ViewTicket

const styles = StyleSheet.create({

  issuseInput: {
    borderRadius: responsiveHeight(1),
    borderColor: '#C4C4C4',
    borderWidth: responsiveHeight(0.20),
    backgroundColor: '#ffffff',
    textAlignVertical: 'top',
    padding: responsiveHeight(1),
    width: responsiveHeight(45)


  },
  fileuploadview: {
    borderColor: 'lightgray',
    borderWidth: responsiveHeight(0.2),
    paddingVertical: responsiveHeight(2.5),
    borderStyle: 'dashed',
    borderRadius: responsiveHeight(1),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveHeight(45)


  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginHorizontal: responsiveHeight(2)
  },

  buttonSubmit: {
    marginTop: responsiveHeight(1),
    backgroundColor: '#8B78FF',
    width: responsiveHeight(20),
    marginBottom: responsiveHeight(10)

  },
  textStyle: {
    color: '#ffffff',
    textAlign: 'center'
  }, closeButton: {
    alignSelf: 'flex-end',
    marginRight: responsiveHeight(2),
    marginBottom: responsiveHeight(3),
    borderRadius: 20,
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
  bottomSheetContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'

  },
  modalViewPopUp: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: responsiveHeight(2),
    // padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  itemContainer: {
    flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#eee'

  }
  ,
  headerText: {
    fontWeight: 'bold', width: responsiveHeight(11), fontSize: responsiveFontSize(1.3)
  },
  valueText: {
    flexWrap: 'wrap', width: responsiveHeight(27), fontSize: responsiveFontSize(1.3)
  },
  subHeaderText: {
    fontWeight: '500',
    width: responsiveHeight(11),
    marginLeft: responsiveHeight(2),
    fontSize: responsiveFontSize(1.3),
  },
  subValueText: {
    flexWrap: 'wrap',
    width: responsiveHeight(27),
    fontSize: responsiveFontSize(1.3),
  },
  containercomments: {
    marginHorizontal: responsiveHeight(2.5),
    flex: 1,
    width: Dimensions.get('window').width * 0.9,
    borderColor: 'lightgray',
    borderWidth: 1,
    marginTop: responsiveHeight(2),
    padding: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
    borderRadius: responsiveHeight(1)
    // height: Dimensions.get('window').height * 0.8,

  },
  image: {
    marginTop: responsiveHeight(2),
    height: responsiveHeight(10),
    width: responsiveHeight(10)
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullImage: {
    width: 300,
    height: Dimensions.get('window').height * 0.8,
  },
  closeButtonimage: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
  },
  containerprofileText: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems:'center',
    width:'40%'

    // height: 200,
  },
  nameTextProfile: {
    flexDirection: "column",
    marginLeft: responsiveHeight(1),
    marginBottom: responsiveHeight(0.8)
  },

  assignedText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    marginTop: responsiveHeight(0.5)
    // lineHeight:responsiveHeight(2)
  },
  nameText: {
    fontSize: responsiveFontSize(1.4),
    color: '#6E6A7C',
    fontWeight: '500',

  },

  imageIcon: {
    height: responsiveHeight(5),
    width: responsiveHeight(5),
    // marginBottom: responsiveHeight(1)
  },
  datebg: {
    backgroundColor: "#8B78FF",
    borderRadius: responsiveHeight(3),
    height: responsiveHeight(5),
    width: responsiveHeight(5),
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  },
  containercard: {
    paddingHorizontal: responsiveHeight(2),
    paddingVertical: responsiveHeight(2),
    backgroundColor: "#ffffff",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: responsiveHeight(1.5),
    width: '100%',
    marginVertical: responsiveHeight(1)
  },
  titleheading: {
    marginTop: responsiveHeight(0.8),
    color: '#24252C',
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500'
  },
  containerstatus: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'',
    borderColor: "#8B78FF",
    borderWidth: responsiveHeight(0.2),
    borderRadius: responsiveHeight(0.5),
    padding:responsiveHeight(0.2)
    // fontSize:responsiveFontSize(1)
  }
})