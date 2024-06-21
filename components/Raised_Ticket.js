import { StyleSheet, Text, View, ActivityIndicator, Modal, Pressable, TextInput, Linking, ToastAndroid } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';


const Raised_Ticket = () => {
    const [loading, setLoading] = useState(true)
    const [getTotalTickets, setDataAlltickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])
    const [checkRole, setRoleCheck] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [getopenmodelticket, setTicketmodelopend] = useState(false)
    const [openObjectTicket, setTicketobjectSave] = useState({})
    const [ticketassignedemploye, setemployeeassignticket] = useState([])
    const [selectedticket, setselectedtickets] = useState('technician');

    async function fetchDataAllTickets() {
        // try {
        //     const role = await AsyncStorage.getItem('rolecheck');
        //     setRoleCheck(role)
        //     const jwtToken = await AsyncStorage.getItem('jwtToken');
        //     const url = 'https://shubhansh7777.pythonanywhere.com/ticket/'

        //     const response = await fetch(url, {
        //         method: 'GET',
        //         headers: {
        //             Authorization: `Bearer ${jwtToken}`,
        //         }
        //     });

        //     if (!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }

        //     const data = await response.json();
        //     setDataAlltickets(data)
        //     filterTickets(data, selectedFilter)
        // } catch (error) {
        //     console.error(error);
        // }
        // setLoading(false)


        try {
            const role = await AsyncStorage.getItem('rolecheck');
            setRoleCheck(role)
            const jwtToken = await AsyncStorage.getItem('jwtToken');
            console.log(jwtToken)




            const [response1, response2] = await Promise.all([
                fetch('https://shubhansh7777.pythonanywhere.com/ticket/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }),
                fetch('https://shubhansh7777.pythonanywhere.com/agent/account/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                })
            ]);

            if (!response1.ok || !response2.ok) {
                throw new Error('Network response was not ok');
            }

            const [responseData1, responseData2] = await Promise.all([
                response1.json(),
                response2.json()
            ]);

            console.log(responseData1)


            setDataAlltickets(responseData1)
            filterTickets(responseData1, selectedFilter)
            setemployeeassignticket(responseData2)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);


        }




    }

    const filterTickets = (tickets, filter) => {
        if (filter === 'local') {
            setFilteredTickets(tickets.filter(ticket => ticket.state === 'telangana'));
        } else if (filter === 'non-local') {
            setFilteredTickets(tickets.filter(ticket => ticket.state !== 'telangana'));
        } else {
            setFilteredTickets(tickets);
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



    const [getitemupdateTicket, setItemupdateTicket] = useState('')
    const [ticketeditTitle, setticketeditTitle] = useState('')
    const [issuseeditTicket, setissuseeditTicket] = useState('')
    const [selectededitState, setSelectededitState] = useState('');
    const [selectededitSeverity, setSelectededitSeverity] = useState('')
    const [openticketmodeledit, setopenmodelEditticket] = useState(false)





    const handelEdittickets = (updateTicket) => {
        setTicketmodelopend(!getopenmodelticket);

        setItemupdateTicket(updateTicket)
        setticketeditTitle(updateTicket.title)
        setissuseeditTicket(updateTicket.description)
        setSelectededitState(updateTicket.state)
        setSelectededitSeverity(updateTicket.severity)
        setopenmodelEditticket(!openticketmodeledit)
        console.log(updateTicket, 'one')
    }

    const onhandleEditTicketSubmit = async () => {

        setLoading(true)

        try {
            const jwtToken = await AsyncStorage.getItem('jwtToken');
            const updateTicketnewObject = {
                name: ticketeditTitle,
                description: issuseeditTicket,
                state: selectededitState,
                severity: selectededitSeverity
            }


            const response = await fetch(`https://shubhansh7777.pythonanywhere.com/ticket/${getitemupdateTicket.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(updateTicketnewObject)
            });

            if (!response.ok) {


                const erroreditDataTicket = await response.json();

                // throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseEditTicket = await response.json();


            console.log(responseEditTicket, 'new')
            fetchDataAllTickets();
            setLoading(true)
            ToastAndroid.show('Successfully Edited Ticket', ToastAndroid.SHORT);


        } catch (error) {
            console.error('new', error);
        }

        // Handle product submit
        setopenmodelEditticket(!openticketmodeledit); // Close modal

        setLoading(false)


    }


    const handlecloseEditTicketModel = () => {
        setTicketmodelopend(!getopenmodelticket)
        setopenmodelEditticket(!openticketmodeledit)
    }


    const handelDeleteTicket = async (deleteIdticket) => {

        try {
            setLoading(true);
            const jwtTokenvalue = await AsyncStorage.getItem('jwtToken');

            // Make DELETE request to your API endpoint
            const response = await fetch(`https://shubhansh7777.pythonanywhere.com/ticket/${deleteIdticket}/`, {
                method: 'DELETE',
                // Add any necessary headers
                headers: {
                    // 'Accept': 'application/json',

                    'Content-Type': 'application/json',

                    // Add your authentication token if required
                    'Authorization': `Bearer ${jwtTokenvalue}`,
                },
            });

            if (!response.ok) {
                const dataDeleteticketError = await response.json();
                console.log(dataDeleteticketError)

                throw new Error('Failed to delete data');
            }

            const Deleteticketdata = await response.json();
            console.log(Deleteticketdata, 'Delelte data')


            setLoading(true)
            setDataAlltickets(prevData => prevData.filter(item => item.id !== deleteIdticket));
            // fetchData()
            ToastAndroid.show('Successfully Deleted Ticket', ToastAndroid.SHORT);

        } catch (error) {

            setDataAlltickets(prevData => prevData.filter(item => item.id !== deleteIdticket));
            ToastAndroid.show('Successfully Deleted Ticket', ToastAndroid.SHORT);



            // console.error('Error deleting data:', error);

        } finally {
            setLoading(false);
        }

        setLoading(false)


        setTicketmodelopend(!getopenmodelticket);
    }





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



    const [selectedValueRadio, setSelectedRadioValue] = useState('');
    const filteredEmployees = ticketassignedemploye.filter(employee => employee.role === selectedValueRadio);

    const [openmodelassign, setassignticketmodel] = useState(false)
    const [openticketmodelsave, setticketmodelsave] = useState('')

    const onhandleopenassigntickets = (idticket) => {
        setassignticketmodel(!openmodelassign)
        setticketmodelsave(idticket)
    }


    const onticketRaisedAssined = async () => {



        setLoading(true)

        try {
            const jwtToken = await AsyncStorage.getItem('jwtToken');
            const updateTicketnewObject = {
                agent: selectedticket,

            }

            const ticketid = parseInt(openticketmodelsave)


            const response = await fetch(`https://shubhansh7777.pythonanywhere.com/ticket/${ticketid}/assign/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(updateTicketnewObject)
            });

            if (!response.ok) {


                const errorassignTicket = await response.json();

                // throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseassignTicket = await response.json();


            console.log(responseassignTicket, 'assined')
            fetchDataAllTickets();
            setLoading(true)
            ToastAndroid.show(responseassignTicket.detail, ToastAndroid.SHORT);


        } catch (error) {
            console.error('new', error);
        }

        // Handle product submit
        setassignticketmodel(!openmodelassign);
        setLoading(false)
        setselectedtickets('technician')


    }


    const onhandledeleteassign = async (deleteassignticket) => {

        try {
            setLoading(true);
            const jwtTokenvalue = await AsyncStorage.getItem('jwtToken');

            // Make DELETE request to your API endpoint
            const response = await fetch(`https://shubhansh7777.pythonanywhere.com/ticket/${deleteassignticket}/assign/`, {
                method: 'DELETE',
                // Add any necessary headers
                headers: {
                    // 'Accept': 'application/json',

                    'Content-Type': 'application/json',

                    // Add your authentication token if required
                    'Authorization': `Bearer ${jwtTokenvalue}`,
                },
            });

            if (!response.ok) {
                const dataDeleteassignticketError = await response.json();
                console.log(dataDeleteassignticketError)

                throw new Error('Failed to delete data');
            }

            const Deleteassignticketdata = await response.json();
            console.log(Deleteassignticketdata, 'Delelte data')


            setLoading(true)
            ToastAndroid.show('Successfully Deleted Assign Ticket', ToastAndroid.SHORT);

        } catch (error) {


            await fetchDataAllTickets()



            // console.error('Error deleting data:', error);

        } finally {
            setLoading(false);
        }

        setLoading(false)


    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ? (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator animating={loading} size="large" color="#0000ff" />
                </View>
            ) : (
                <>
                    <Text style={{ fontSize: responsiveHeight(2), marginHorizontal: responsiveHeight(2), fontWeight: '500', marginTop: responsiveHeight(2), marginLeft: responsiveHeight(4), fontSize: responsiveHeight(1.7) }}>SELECT TICKETS</Text>
                    <View style={{ borderColor: '#C4C4C4', borderWidth: 2, marginTop: responsiveHeight(1), marginHorizontal: responsiveHeight(4), borderRadius: responsiveHeight(1), marginBottom: responsiveHeight(5) }}>

                        <Picker
                            selectedValue={selectedFilter}
                            onValueChange={(itemValue) => setSelectedFilter(itemValue)}
                        >
                            <Picker.Item label="ALL TICKETS" value="all" style={{ fontSize: responsiveFontSize(1.4) }} />
                            <Picker.Item label="LOCAL TICKETS" value="local" style={{ fontSize: responsiveFontSize(1.4) }} />
                            <Picker.Item label="NON-LOCAL TICKETS" value="non-local" style={{ fontSize: responsiveFontSize(1.4) }} />
                        </Picker>
                    </View>

                    {filteredTickets.length===0?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: '500' }}>NO TICKETS AVAILABLE</Text>
        </View> 
        :
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
                                          <Text style={styles.viewTicketText}>VIEWTICKET</Text>
                                      </TouchableOpacity>

                                  </View>
                              </View>
                          ))}
                      </View>



                      {/* View Ticket */}


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
                                          <Pressable
                                              style={{ alignSelf: 'flex-end', marginRight: responsiveHeight(1.5), marginTop: responsiveHeight(1) }}
                                              onPress={() => setTicketmodelopend(!getopenmodelticket)}>
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
                                                      <View key={index} style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
                                                          <Text style={{ fontWeight: 'bold', width: responsiveHeight(11), fontSize: responsiveFontSize(1.3) }}>{formattedHeader}</Text>
                                                          <Text style={{ flexWrap: 'wrap', width: responsiveHeight(27), fontSize: responsiveFontSize(1.3) }}>: {formattedDate}</Text>
                                                      </View>
                                                  );
                                              }

                                              if (typeof value === 'object' && value !== null) {
                                                  return (
                                                      <View key={index} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
                                                          <Text style={{ fontWeight: 'bold', width: responsiveHeight(11), fontSize: responsiveFontSize(1.3) }}>{formattedHeader}</Text>
                                                          {Object.entries(value).map(([key, val], subIndex) => {
                                                              const formattedKey = capitalizeAndReplace(key);
                                                              const isLink = key === 'mobile' || key === 'email' || key === 'location';
                                                              const displayValue = key === 'location' ? 'Get Direction' : val;

                                                              return (
                                                                  <Pressable key={subIndex} onPress={() => handlePress(key, val)} style={{ flexDirection: 'row', marginTop: 5 }}>
                                                                      <Text style={{ fontWeight: '500', width: responsiveHeight(11), marginLeft: responsiveHeight(2), fontSize: responsiveFontSize(1.3) }}>{formattedKey}</Text>
                                                                      <Text style={[{ flexWrap: 'wrap', width: responsiveHeight(27), fontSize: responsiveFontSize(1.3) }, isLink && styles.linkText]}>: {displayValue}</Text>
                                                                  </Pressable>
                                                              );
                                                          })}
                                                      </View>
                                                  );
                                              }

                                              return (
                                                  <View key={index} style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
                                                      <Text style={{ fontWeight: 'bold', width: responsiveHeight(11), fontSize: responsiveFontSize(1.3) }}>{formattedHeader}</Text>
                                                      <Text style={{ flexWrap: 'wrap', width: responsiveHeight(27), fontSize: responsiveFontSize(1.3) }}>: {value}</Text>
                                                  </View>
                                              );
                                          })}
                                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: responsiveFontSize(2), marginBottom: responsiveHeight(2) }}>

                                              <View>

                                                  <Text style={{ fontWeight: '500', marginTop: responsiveHeight(2), fontSize: responsiveFontSize(1.4) }}>Action Ticket</Text>
                                                  <View style={{ flexDirection: 'row', marginTop: responsiveHeight(1) }}>
                                                      <Pressable
                                                          style={{ width: responsiveHeight(5), height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#52c41a', borderRadius: 5, marginRight: responsiveHeight(2) }}
                                                          onPress={() => handelEdittickets(openObjectTicket)}>
                                                          <FontAwesome5 name="pen" size={responsiveHeight(2)} color="#eee" />
                                                      </Pressable>
                                                      <Pressable
                                                          style={{ width: responsiveHeight(5), height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#dc3545', borderRadius: 5 }}
                                                          onPress={() => handelDeleteTicket(openObjectTicket.id)}>
                                                          <MaterialIcons name="delete" size={15} color="#ffffff" />
                                                      </Pressable>
                                                  </View>
                                              </View>

                                              <View>

                                                  {openObjectTicket.status === 'close' ? '' :

                                                      <>
                                                          <Text style={{ fontWeight: '500', marginTop: responsiveHeight(2), fontSize: responsiveFontSize(1.4) }}>Assign Ticket</Text>
                                                          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(1) }}>
                                                              {openObjectTicket.status !== 'assigned' && <Pressable
                                                                  style={{ width: responsiveHeight(5), height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#036BB9', borderRadius: 5, marginRight: responsiveHeight(2) }}
                                                                  onPress={() => onhandleopenassigntickets(openObjectTicket.id)}>
                                                                  <MaterialIcons name="assignment-add" size={responsiveHeight(3)} color="#ffffff" />
                                                              </Pressable>}

                                                              <Pressable
                                                                  style={{ width: responsiveHeight(5), height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#dc3545', borderRadius: 5 }}
                                                                  onPress={() => onhandledeleteassign(openObjectTicket.id)}>
                                                                  <MaterialIcons name="assignment-add" size={responsiveHeight(3)} color="#ffffff" />
                                                              </Pressable>
                                                          </View>
                                                      </>

                                                  }


                                              </View>


                                          </View>

                                      </View>
                                  </View>
                              </ScrollView>
                          </View>
                      </Modal>


                      {/* updateTickets */}

                      <Modal
                          animationType="slide"
                          transparent={true}
                          visible={openticketmodeledit}
                          onRequestClose={() => {
                              setopenmodelEditticket(!openticketmodeledit);
                          }}
                      >
                          <View style={styles.centeredView}>
                              <ScrollView style={{ marginTop: responsiveHeight(15) }}>

                                  <View style={styles.modalViewmodel}>
                                      <Pressable style={{ alignSelf: 'flex-end', marginRight: responsiveHeight(1.5), marginTop: responsiveHeight(1) }} onPress={handlecloseEditTicketModel}>
                                          <Entypo name="cross" size={responsiveHeight(4)} color="black" />
                                      </Pressable>

                                      <View style={{ padding: 25 }}>

                                          <View style={{ marginVertical: responsiveHeight(1) }}>
                                              <Text style={{ color: 'gray', fontWeight: '500', fontSize: responsiveFontSize(1.5) }}>Title</Text>
                                              <TextInput
                                                  style={styles.inputElement}
                                                  onChangeText={data => setticketeditTitle(data)}
                                                  value={ticketeditTitle}
                                              />
                                          </View>
                                          <View style={{ marginVertical: responsiveHeight(1) }}>
                                              <Text style={{ color: 'gray', fontWeight: '500', fontSize: responsiveFontSize(1.5) }}>Description</Text>
                                              <TextInput
                                                  style={styles.inputElement}
                                                  onChangeText={data => setissuseeditTicket(data)}
                                                  value={issuseeditTicket}
                                              />
                                          </View>
                                          <View style={{ marginVertical: responsiveHeight(1) }}>
                                              <Text style={{ color: 'gray', fontWeight: '500', fontSize: responsiveFontSize(1.5) }}>Severity</Text>
                                              <TextInput
                                                  style={styles.inputElement}
                                                  value={selectededitSeverity}
                                                //   editable={false}
                                              />
                                              {/* <Text style={{ color: 'red' }}>Note: Severity cannot be edited</Text> */}
                                          </View>
                                          <View style={{ marginVertical: responsiveHeight(1) }}>
                                              <Text style={{ color: 'gray', fontWeight: '500', fontSize: responsiveFontSize(1.5) }}>State</Text>
                                              <TextInput
                                                  style={styles.inputElement}
                                                  value={selectededitState}
                                                  editable={false}
                                              />
                                              <Text style={{ color: 'red' }}>Note: State cannot be edited</Text>
                                          </View>

                                          <View style={{ flexDirection: 'row' }}>
                                              <Pressable
                                                  style={[styles.button, styles.buttonSubmit]}
                                                  onPress={() => onhandleEditTicketSubmit()}
                                              >
                                                  <Text style={styles.textStyle}>Submit</Text>
                                              </Pressable>
                                              <Pressable
                                                  style={[styles.button, styles.buttonClose]}
                                                  onPress={handlecloseEditTicketModel}
                                              >
                                                  <Text style={styles.textStyle}>Close</Text>
                                              </Pressable>
                                          </View>
                                      </View>
                                  </View>
                              </ScrollView>
                          </View>
                      </Modal>


                      <Modal
                          animationType="slide"
                          transparent={true}
                          visible={openmodelassign}
                          onRequestClose={() => {
                              setassignticketmodel(!openmodelassign);
                          }}
                      >
                          <View style={styles.centeredView}>
                              <ScrollView style={{ marginTop: responsiveHeight(15) }}>

                                  <View style={[styles.modalViewmodel, { padding: responsiveHeight(2) }]}>

                                      <View style={{ alignSelf: 'flex-end' }}>
                                          <Pressable
                                              style={{ alignSelf: 'flex-end', marginRight: responsiveHeight(1.5), marginTop: responsiveHeight(1) }}
                                              onPress={() => setassignticketmodel(!openmodelassign)}>
                                              <Entypo name="cross" size={responsiveHeight(4)} color="black" />
                                          </Pressable>
                                      </View>



                                      <View style={styles.radioGroup}>
                                          <View style={styles.radioButton}>
                                              <RadioButton.Android
                                                  value="option1"
                                                  status={selectedValueRadio === 'technician' ?
                                                      'checked' : 'unchecked'}
                                                  onPress={() => setSelectedRadioValue('technician')}
                                                  color="#007BFF"
                                              />
                                              <Text style={styles.radioLabel}>
                                                  technician
                                              </Text>
                                          </View>

                                          <View style={styles.radioButton}>
                                              <RadioButton.Android
                                                  value="option2"
                                                  status={selectedValueRadio === 'delivery_man' ?
                                                      'checked' : 'unchecked'}
                                                  onPress={() => setSelectedRadioValue('delivery_man')}
                                                  color="#007BFF"
                                              />
                                              <Text style={styles.radioLabel}>
                                                  deliveryman
                                              </Text>
                                          </View>



                                      </View>







                                      <View style={[styles.inputElementSelect, { marginVertical: responsiveHeight(1), marginHorizontal: responsiveHeight(2), marginTop: responsiveHeight(2) }]}
                                      >
                                          <Picker
                                              style={{ fontSize: responsiveFontSize(4) }}
                                              selectedValue={selectedticket}
                                              onValueChange={(itemValue, itemIndex) =>
                                                  setselectedtickets(itemValue)
                                              }>

                                              <Picker.Item label="Select Employee" value='' style={{ fontSize: responsiveFontSize(1.5), height: responsiveHeight(3) }}
                                              />
                                              {filteredEmployees.map((item, index) => (

                                                  <Picker.Item key={index} label={item.first_name} value={item.id} style={{ fontSize: responsiveFontSize(1.5), height: responsiveHeight(4), marginVertical: responsiveHeight(2), marginBottom: responsiveHeight(2) }} />

                                              ))}
                                          </Picker>


                                      </View>









                                      <View style={{ flexDirection: 'row' }}>
                                          <Pressable
                                              style={[styles.button, styles.buttonSubmit]}
                                              onPress={() => onticketRaisedAssined()}
                                          >
                                              <Text style={styles.textStyle}>Submit</Text>
                                          </Pressable>
                                          <Pressable
                                              style={[styles.button, styles.buttonClose]}
                                              onPress={() => setassignticketmodel(!openmodelassign)}
                                          >
                                              <Text style={styles.textStyle}>Close</Text>
                                          </Pressable>
                                      </View>
                                  </View>
                              </ScrollView>
                          </View>
                      </Modal>




                  </ScrollView>
                    }
                  
                </>
            )}
        </SafeAreaView>
    )
}

export default Raised_Ticket

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


        // position:'absolute'
    },
    modalViewmodel: {
        // margin: 20,
        backgroundColor: 'white',
        borderRadius: responsiveHeight(1),
        // padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
    },

    modalViewPopUp: {
        // margin: 20,
        // marginHorizontal:responsiveHeight(1),
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
    titlestyle: {
        marginBottom: responsiveHeight(0.6),
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
        fontSize: responsiveHeight(1.2),
    },
    heading: {
        fontWeight: '700',
        fontSize: responsiveFontSize(1),
        width: responsiveHeight(13)
    },
    containerEachCard: {
        flex: 1,
        flexDirection: 'row',
        marginTop: responsiveHeight(1),
        width: responsiveHeight(27)
    },
    inputElement: {
        height: responsiveHeight(5),
        width: responsiveHeight(35),
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    linkText: {
        color: '#2196F3',
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
    inputElementSelect: {
        Height: responsiveHeight(3), width: responsiveHeight(30), borderColor: 'gray', borderWidth: 1, borderRadius: 5
    },
    eachidContainer: {
        borderRadius: responsiveHeight(0.4),
        backgroundColor: '#198754',
        width: responsiveHeight(10),
        justifyContent: 'center',
        alignItems: 'center'
    }

})
