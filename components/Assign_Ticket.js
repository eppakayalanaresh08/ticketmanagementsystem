import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Modal, Pressable, Dimensions, ToastAndroid, TouchableWithoutFeedback, StatusBar, ActivityIndicator, Linking, Image, RefreshControl } from 'react-native'
import React, { useState, useRef, useCallback, useMemo,useEffect } from 'react';



import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation,  } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';


import { LinearGradient } from 'expo-linear-gradient';

import { useFocusEffect } from '@react-navigation/native';



const Assign_Ticket = ({ route }) => {

  let newItem;
  if (route.params == undefined) {

  }
  else {
    const { item } = route.params;
    newItem = item
  }


  console.log(newItem, 'ticket')









  // console.log(item)



  const [listimages, setlistimages] = useState([])
  const [loading, setLoading] = useState(true)
  const [roleCheck, setRoleCheck] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all')

  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation()



  const [getticketsUser, setTicketsUser] = useState([])

  const fetchDatatickets = async () => {

    try {
      const role = await AsyncStorage.getItem('rolecheck');
      setRoleCheck(role)
      const jwtToken = await AsyncStorage.getItem('jwtToken');

      const url = 'https://shubhansh7777.pythonanywhere.com/ticket/'
  

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,

        }
      });

      if (!response.ok) {
        // throw new Error(`HTTP error! status: ${response.status}`);
        const responseError = await response.json();
        // console.log(responseError, 'responseError')
        if (responseError.detail === 'Session expired. Please login again.') {
          navigation.replace('LoginPage')
        } else if (responseError.detail === 'Invalid token or session expired. Please login again.') {
          navigation.replace('LoginPage')
        }
      }

      const data = await response.json();
      setTicketsUser(data)
      setLoading(false)

      setRefreshing(false);

      // console.log(data); // Process the fetched data here
    } catch (error) {
      // console.error(error);
    }
    setLoading(false)

  }


  useFocusEffect(
    React.useCallback(() => {
      // fetchDataProduct();
    

    }, [])
  );



  useEffect(() => {
    // fetchTickets();
    fetchDatatickets()

  }, []);

  useEffect(() => {
    if (newItem) {
      setSelectedFilter(newItem);
    }
  }, [newItem]);


console.log(selectedFilter,'selectedFilter')





  const handleViewTicket = (item) => {
    navigation.navigate('ViewTicket', { item })

  }


  let filterticketsmyTickets;
  if (newItem === 'active_ticket') {
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




  // const [selectedFilter, setSelectedFilter] = useState('all');

  const getGradientColors = (filter) => {



    if ((selectedFilter === filter)) {
      // console.log(filter, 'filter', newItem)
      switch (filter) {
        case 'all':
          return ['#f97ad1', '#9f0f94'];
        // case 'all':
        //   return ['#f97ad1', '#9f0f94'];
        case 'active_ticket':
          return ['#A9FFEA', '#00B288'];
        case 'verification_ticket':
          return ['#FFD29D', '#FF9E2D'];
        case 'close_ticket':
          return ['#FFA0BC', '#FF1B5E'];
        case 'assigned_ticket':
          return ['#B1EEFF', '#29BAE2'];

        default:
          return ['#ffffff', '#ffffff'];
      }
    }
    return ['#ffffff', '#ffffff'];
  };





  // console.log(newItem, 'newItem')




  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active_ticket', label: 'Active' },
    { key: 'verification_ticket', label: 'Verify' },
    { key: 'close_ticket', label: 'Close' },
    { key: 'assigned_ticket', label: 'Assign' },
  ];



  const getStatusColors = (status) => {
    switch (status) {
      case 'active':
        return ['#A9FFEA', '#00B288'];
      case 'verification':
        return ['#FFD29D', '#FF9E2D'];
      case 'close':
        return ['#FFA0BC', '#FF1B5E'];
      case 'assigned':
        return ['#B1EEFF', '#29BAE2'];
      default:
        return ['#FFF', '#000']; // Default colors if status doesn't match
    }
  };


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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#8B78FF" // Customize refresh control color
        />
      }>

        <View style={{ marginHorizontal: responsiveHeight(2), width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: responsiveHeight(3), marginVertical: responsiveHeight(3) }}>


          <ScrollView horizontal>
            {filters.map(filter => (
              <TouchableOpacity
                key={filter.key}
                style={styles.filtercard}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <LinearGradient
                  colors={getGradientColors(filter.key)}
                  style={styles.eachcardfilter}
                >
                  <Text style={[styles.textticketElement, selectedFilter === filter.key && styles.textSelected]}>
                    {filter.label}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>




        {filterticketsmyTickets.length === 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: '500' }}>No Tickets available</Text>
        </View> :
          <ScrollView >


            <View style={styles.containerlistticket}>
              {filterticketsmyTickets.map((eachcard) => {
                const [textColor, bgColor] = getStatusColors(eachcard.status);

                return (
                  <TouchableOpacity style={styles.modalView} key={eachcard.id} onPress={() => handleViewTicket(eachcard)}>
                    <View style={styles.eachidContainer}>
                      <Text style={{ fontSize: responsiveFontSize(1.2), fontWeight: '500', color: '#fff' }}>TAD-{eachcard.id}</Text>
                    </View>
                    <View style={styles.eachcardObject}>

                      <View style={[styles.containerEachCard, { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }]}>
                        <View >
                          <Text style={styles.titlestyle}>{eachcard.title}</Text>
                        </View>
                        <View>
                          <Image source={require('../assets/ticket.png')} style={styles.imageTicket} />
                        </View>
                      </View>
                      <View style={styles.containerEachCard}>
                        <Text style={styles.description}>{eachcard.description}</Text>
                      </View>
                      <View style={[styles.containerEachCard, { alignSelf: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', borderColor: textColor, borderWidth: responsiveHeight(0.2), padding: responsiveHeight(0.8), borderRadius: responsiveHeight(0.7) }]}>
                        <Text style={[styles.descriptionstatus, { color: bgColor }]} >{eachcard.status}</Text>
                      </View>

                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>


          </ScrollView>

        }

      </ScrollView>
    </SafeAreaView>
  )
}


export default Assign_Ticket

const styles = StyleSheet.create({
  filtercard: {

    marginRight: responsiveHeight(1.5)

  },
  eachcardfilter: {
    height: responsiveHeight(8),
    width: responsiveWidth(15),
    borderRadius: responsiveHeight(2.5),
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
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
    // backgroundColor: 'white',
    borderRadius: responsiveHeight(1),
   
    borderColor: '#DCE1EF',
    borderWidth: responsiveHeight(0.2)
    // padding: responsiveHeight(2),

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
    color: '#6E7591',

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
    fontSize: responsiveFontSize(1.4),
    color: '#0D101C',
  },

  descriptionstatus: {
    fontWeight: '500',
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
    // flexDirection: 'row',
    marginTop: responsiveHeight(0.8),
    // width: responsiveHeight(27)
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
    backgroundColor: '#8B78FF',
    width: responsiveHeight(10),
    justifyContent: 'center',
    alignItems: 'center'
  }
  ,
  textticketElement: {

    color: '#312525',
    fontWeight: '500'
    // Default text color
  },
  textSelected: {
    color: '#fff', // Text color when selected
  },
  imageTicket: {
    height: responsiveHeight(3),
    width: responsiveHeight(3),
    // marginTop: responsiveHeight(1)
  },
})



// <View style={styles.modalView} key={eachcard.id}>
// <View style={styles.eachidContainer}>
//   <Text style={{ fontSize: responsiveFontSize(1.2), fontWeight: '500', color: '#fff' }}>TAD-{eachcard.id}</Text>
// </View>
// <View style={styles.eachcardObject}>

//   <View style={styles.containerEachCard}>

//     {/* <Text style={styles.heading}>Title</Text> */}
//     <Text style={styles.titlestyle}>{eachcard.title}</Text>

//   </View>
//   <View style={styles.containerEachCard}>
//     {/* <Text style={styles.heading}>Description</Text> */}

//     <Text style={styles.description}>{eachcard.description}</Text>

//   </View>
//   <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
//     {/* <Text style={styles.heading}>Ticket Status</Text> */}

//     <Text style={styles.descriptionstatus}>{eachcard.status}</Text>

//   </View>

// {/*
//   <TouchableOpacity style={styles.viewTicketButton} onPress={() => handleViewTicket(eachcard)}>
//     <Text style={styles.viewTicketText}>ViewTicket</Text>
//   </TouchableOpacity> */}

// </View>
// </View>