


import { StyleSheet, Text, View, ActivityIndicator, Modal, Pressable, Linking } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { Entypo } from '@expo/vector-icons';
const Tickets = ({ route }) => {
  let newItem;
  if (route.params == undefined) {

  }
  else {
    const { item } = route.params;
    newItem = item
  }
  console.log(newItem, 'item')
  const [loading, setLoading] = useState(true)
  const [getTotalTickets, setDataAlltickets] = useState([])
  const [filteredTickets, setFilteredTickets] = useState([])
  const [checkRole, setRoleCheck] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [getopenmodelticket, setTicketmodelopend] = useState(false)
  const [openObjectTicket, setTicketobjectSave] = useState({})

  async function fetchDataAllTickets() {
    try {
      const role = await AsyncStorage.getItem('rolecheck');
      setRoleCheck(role)
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const url = 'https://shubhansh7777.pythonanywhere.com/ticket/'

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
    //   const formattedResponseData1 = responseData1.map(item => ({
    //     ...item,
    //     name: item.name.toUpperCase()
    // }));


      const datacapitalize=data.map(each=>({
        ...each,
        title:each.title.toUpperCase(),
        status:each.status.toUpperCase(),
        description:each.description.toUpperCase(),
      }))
      console.log(datacapitalize,'datacapitalize')
      setDataAlltickets(datacapitalize)
      filterTickets(datacapitalize, selectedFilter)
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  }

  const filterTickets = (tickets, filter) => {
    let ticketsfiltering;
    if (newItem === 'open_ticket') {
      ticketsfiltering = tickets.filter((eachticket) => eachticket.status === 'open')
    } else if (newItem === 'active_ticket') {
      ticketsfiltering = tickets.filter((eachticket) => eachticket.status === 'active')
    }
   else if (newItem === 'assigned_ticket') {
    ticketsfiltering = tickets.filter((eachticket) => eachticket.status === 'assigned')
  }
    else {
      ticketsfiltering = tickets
    }


    if (filter === 'local') {
      setFilteredTickets(ticketsfiltering.filter(ticket => ticket.state === 'telangana'));
    } else if (filter === 'non-local') {
      setFilteredTickets(ticketsfiltering.filter(ticket => ticket.state !== 'telangana'));
    } else {
      setFilteredTickets(ticketsfiltering);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchDataAllTickets();
    }, [])
  );

  useEffect(() => {
    filterTickets(getTotalTickets, selectedFilter);
  }, [selectedFilter, getTotalTickets]);

  const handleOpenTicket = (eachObject) => {
    setTicketmodelopend(!getopenmodelticket)
    setTicketobjectSave(eachObject)
  }

  console.log(getTotalTickets[0], 'tickets')
  const dataArray = Object.entries(openObjectTicket);
  console.log(dataArray)

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



    // console.log(ticketsfiltering,'hhh')

  return (
    <SafeAreaView style={{ flex: 1 }}>


      {loading ? (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating={loading} size="large" color="#0000ff" />
        </View>
      ) : (
        <>


          <Text style={{ fontSize: responsiveHeight(2), marginHorizontal: responsiveHeight(2), fontWeight: '500', marginTop: responsiveHeight(2), marginLeft: responsiveHeight(4), fontSize: responsiveHeight(1.3) }}>SELECT TICKETS</Text>
          <View style={{ borderColor: '#C4C4C4', borderWidth: 2, marginTop: responsiveHeight(1), marginHorizontal: responsiveHeight(4), borderRadius: responsiveHeight(1), marginBottom: responsiveHeight(5) }}>

            <Picker
              selectedValue={selectedFilter}
              onValueChange={(itemValue) => setSelectedFilter(itemValue)}
            >
              <Picker.Item label="ALL TICKETS" value="all" style={{ fontSize: responsiveFontSize(1.2) }} />
              <Picker.Item label="LOCAL TICKETS" value="local" style={{ fontSize: responsiveFontSize(1.2) }} />
              <Picker.Item label="NON-LOCAL TICKETS" value="non-local" style={{ fontSize: responsiveFontSize(1.2) }} />
            </Picker>
          </View>
          {filteredTickets.length===0?   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: '500' }}>NO TICKETS AVAILABLE</Text>
        </View> :
            <ScrollView>
            <View style={styles.containerlistticket}>
              {filteredTickets.map((eachcard) => (
                <View style={styles.modalView} key={eachcard.id}>
                  <View style={styles.eachidContainer}>
                    <Text style={{ fontSize: responsiveFontSize(1.2), fontWeight: '500', color: '#fff' }}>TAD-{eachcard.id}</Text>
                  </View>
                  <View style={styles.eachcardObject}>

                    <View style={styles.containerEachCard}>

                      <Text style={styles.heading}>TITLE</Text>
                      <Text style={styles.titlestyle}>{eachcard.title}</Text>

                    </View>
                    <View style={styles.containerEachCard}>
                      <Text style={styles.heading}>DESCRIPTION</Text>

                      <Text style={styles.description}>{eachcard.description}</Text>

                    </View>
                    <View style={styles.containerEachCard}>
                      <Text style={styles.heading}>TICKET STATUS</Text>

                      <Text style={styles.descriptionstatus}>{eachcard.status}</Text>

                    </View>


                    <TouchableOpacity style={styles.viewTicketButton} onPress={() => handleOpenTicket(eachcard)}>
                      <Text style={styles.viewTicketText}>VIEW TICKET</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              ))}
            </View>


            <Modal
              animationType="slide"
              transparent={true}
              visible={getopenmodelticket}
              onRequestClose={() => {
                setTicketmodelopend(!getopenmodelticket);
              }}>
              <View style={styles.centeredView}>
                <ScrollView style={{ marginTop: responsiveHeight(7), flex: 1 }}>
                  <View style={styles.modalViewPopUp}>
                    <View style={{ alignSelf: 'flex-end' }}>
                      <Pressable style={{ alignSelf: 'flex-end', marginRight: responsiveHeight(1.5), marginTop: responsiveHeight(1) }} onPress={() => setTicketmodelopend(!getopenmodelticket)}>
                        <Entypo name="cross" size={responsiveHeight(4)} color="black" />
                      </Pressable>
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
                  </View>
                </ScrollView>
              </View>
            </Modal>




          </ScrollView>}
      
        </>
      )}
    </SafeAreaView>
  )
}

export default Tickets

const styles = StyleSheet.create({
  containerlistticket: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: responsiveHeight(2),

  },

  modalViewPopUp: {

    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
  modalView: {
    minHeight: responsiveHeight(17),
    width: responsiveHeight(40),
    margin: 20,
    backgroundColor: 'white',
    borderRadius: responsiveHeight(1),
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
    fontSize: responsiveHeight(1),
    color: '#000000',
    flexWrap:'wrap'

  },
  titlestyle: {
    // marginBottom: responsiveHeight(0.6),
    fontWeight: '500',
    fontSize: responsiveFontSize(1.4)
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

  // 99CC00
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionstatus: {
    fontWeight: '400',
    fontSize: responsiveHeight(1),
  },
  heading: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1),
    width: responsiveHeight(13)
  },
  containerEachCard: {
    flex: 1,
    flexDirection: 'row',
    marginTop: responsiveHeight(1),
    width: responsiveHeight(27)
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
  linkText: {
    color: '#2196F3',
  },
  buttonSubmit: {
    backgroundColor: '#2196F3',
    marginRight: 10,
  },
  buttonClose: {
    backgroundColor: '#f44336',
  },
  headerText: {
    fontWeight: 'bold', width: responsiveHeight(11), fontSize: responsiveFontSize(1.3)
  },
  valueText: {
    flexWrap: 'wrap', width: responsiveHeight(27), fontSize: responsiveFontSize(1.3)
  },
  itemContainer: {
    flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#eee'

  },
  eachidContainer: {
    borderRadius: responsiveHeight(0.4),
    backgroundColor: '#198754',
    width: responsiveHeight(10),
    justifyContent: 'center',
    alignItems: 'center'
  }


})
