import { StyleSheet, Text, View, ToastAndroid, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';


const Admin_assign_ticket = () => {
  const [getTotalTickets, setgetTicketsassign] = useState([])
  const [loading, setLoading] = useState(true)
  const [roleCheck, setRoleCheck] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [filteredTickets, setFilteredTickets] = useState([])

  const fetchDatatickets = async () => {
    try {
      const role = await AsyncStorage.getItem('rolecheck');
      // getrolecheck = role
      // Retrieve JWT token from AsyncStorage
      setRoleCheck(role)
      const jwtToken = await AsyncStorage.getItem('jwtToken');

      // Make GET request with JWT token
      const response = await fetch('https://shubhansh7777.pythonanywhere.com/ticket/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log(responseData)
      setgetTicketsassign(responseData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      // fetchDataProduct();
      fetchDatatickets()
    }, [])
  );


  const filterTickets = (tickets, filter) => {
    const ticketAssignedorNot = getTotalTickets.filter(item => item.status === 'assigned')

    if (filter === 'local') {
      setFilteredTickets(ticketAssignedorNot.filter(ticket => ticket.state === 'telangana'));
    } else if (filter === 'non-local') {
      setFilteredTickets(ticketAssignedorNot.filter(ticket => ticket.state !== 'telangana'));
    } else {
      setFilteredTickets(ticketAssignedorNot);
    }
  }


  useEffect(() => {
    filterTickets(getTotalTickets, selectedFilter);
  }, [selectedFilter, getTotalTickets]);



  const onhandleassignactive = async (idassign) => {

    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      // const EditUpdatebranch = {
      //     name: branchNametextedit,
      //     usename: branchUsernameEdit,
      // }

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

        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseAssignticket = await response.json();


      console.log(responseAssignticket, 'new')
      await fetchDatatickets();
      setLoading(true)
      ToastAndroid.show('Successfully Edited Branch', ToastAndroid.SHORT);


    } catch (error) {
      console.error('new', error);
    }
  }

  const renderTableRow = async (item, index) => {





    return (

      // {item.length}
      // {item.length===0?<Text>no</Text>:}

      <View style={styles.row} key={item.id}>

        {(item.status === 'assigned' || item.status === 'active') && <>
          <Text style={styles.cell}>{index + 1}</Text>

          {/* <Text style={styles.cell}>{item.owner}</Text> */}
          <Text style={styles.cell}>{item.title}</Text>
          <Text style={styles.cell}>{item.description}</Text>
          {/* <Text style={styles.cell}>{item.severity}</Text> */}
          <Text style={styles.cell}>{item.state}</Text>


          <Text style={styles.cell}>{item.status}</Text>

          <View style={[styles.cell, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: responsiveHeight(2) }]}>{item.status === 'assigned' ?
            (<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => onhandleassignactive(item.id)}>
              <FontAwesome5 name="check" size={responsiveHeight(2)} color="rgb(60, 179, 113)" />
            </TouchableOpacity>) : item.status === 'active' ? (
              <Text style={{ fontSize: responsiveFontSize(1.3), color: "rgb(60, 179, 113)", fontWeight: '500' }}>success</Text>
            ) : <Text style={{ fontSize: responsiveFontSize(1.3), color: "red", fontWeight: '500' }}>pending</Text>}</View>


        </>}


      </View>
    );
  };

  const newzerovalue = getTotalTickets.filter(item => item.state !== 'telangana')
  const enterzero = newzerovalue.filter(item => item.status === 'assigned' || item.status === 'active')

  console.log(filteredTickets.length,)

  return (

    <View>
      <StatusBar style="dark" />

      <Text style={{ fontSize: responsiveHeight(2), marginHorizontal: responsiveHeight(2), fontWeight: '500', marginTop: responsiveHeight(2), marginLeft: responsiveHeight(4), fontSize: responsiveHeight(1.7) }}>Select Tickets</Text>
      <View style={{ borderColor: '#C4C4C4', borderWidth: 2, marginTop: responsiveHeight(1), marginHorizontal: responsiveHeight(4), borderRadius: responsiveHeight(1), marginBottom: responsiveHeight(5) }}>

        <Picker
          selectedValue={selectedFilter}
          onValueChange={(itemValue) => setSelectedFilter(itemValue)}
        >
          <Picker.Item label="All Tickets" value="all" style={{ fontSize: responsiveFontSize(1.4) }} />
          <Picker.Item label="Local Tickets" value="local" style={{ fontSize: responsiveFontSize(1.4) }} />
          <Picker.Item label="Non-Local Tickets" value="non-local" style={{ fontSize: responsiveFontSize(1.4) }} />
        </Picker>
      </View>

      {filteredTickets.length === 0 ? <View style={{justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: '500' }}>No Tickets available</Text>
      </View> : <ScrollView>
        <View style={styles.containerlistticket}>
          {filteredTickets.map((eachcard) => (
            <View style={styles.modalView} key={eachcard.id}>
              <View style={{ marginLeft: responsiveHeight(1), marginTop: responsiveHeight(1) }}>
                <Text style={{ fontSize: responsiveFontSize(1.2), fontWeight: '500' }}>Tid-{eachcard.id}</Text>
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

                {eachcard.status === 'assigned' ? <TouchableOpacity style={styles.viewTicketButton} onPress={() => onhandleassignactive(eachcard.id)}>
                  <Text style={styles.viewTicketText}>ActiveTicket  <FontAwesome5 name="check" size={responsiveHeight(1.4)} color="#ffffff" />
                  </Text>
                </TouchableOpacity> : <TouchableOpacity style={styles.ActiveTicketButton}>
                  <Text style={styles.viewTicketText}>Already Actived
                  </Text>
                </TouchableOpacity>
                }

              </View>
            </View>
          ))}
        </View>

      </ScrollView>}





    </View>








  )
}

export default Admin_assign_ticket

const styles = StyleSheet.create({

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
    height: responsiveHeight(5),
    borderWidth: 0.5,
    color: "#ffffff",
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
    fontWeight: '500',
    borderColor: "black",
    flex: 1,
    // backgroundColor: '#DCDCDC',
    backgroundColor: '#0083c2',
    paddingTop: responsiveHeight(0.5)

  },
  cellAction: {
    flex: 1,
    borderWidth: 0.5,
    height: responsiveHeight(8),
    flexDirection: 'row',
    textAlign: "center",
    fontSize: 10,
    borderColor: "black",
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
  inputElementSelect: {
    Height: responsiveHeight(3), width: responsiveHeight(30), borderColor: 'gray', borderWidth: 1, borderRadius: 5
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
  inputElement: {
    height: responsiveHeight(4),
    width: responsiveHeight(30),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginHorizontal: responsiveHeight(2)
  },

  buttonClose: {
    marginTop: responsiveHeight(1),
    backgroundColor: '#2196F3',
  },
  buttonSubmit: {
    marginTop: responsiveHeight(1),
    backgroundColor: '#99CC00',
  },



  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: responsiveHeight(30),
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 7,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: responsiveFontSize(1.5),
    color: '#333',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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

  eachcardObject: {
    padding: responsiveHeight(2),
  },
  description: {
    fontSize: responsiveHeight(1.2),
    color: '#000000',
  },

  heading: {
    fontWeight: '500',
    fontSize: responsiveFontSize(1.2),
    width: responsiveHeight(13)
  },
  containerEachCard: {
    flexDirection: 'row',
    marginTop: responsiveHeight(1),
    width: responsiveHeight(27)
  },
  viewTicketButton: {
    backgroundColor: 'rgb(60, 179, 113)',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
    marginHorizontal: responsiveHeight(8),
    paddingVertical: responsiveHeight(0.8),
    borderRadius: responsiveHeight(1)
  },
  ActiveTicketButton: {
    backgroundColor: '#0083c2',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
    marginHorizontal: responsiveHeight(8),
    paddingVertical: responsiveHeight(0.8),
    borderRadius: responsiveHeight(1)
    // 0083c2
  },
  viewTicketText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: responsiveFontSize(1.3)
  },
  descriptionstatus: {
    fontWeight: '400',
    fontSize: responsiveHeight(1.2),
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

  // #0083c2
})