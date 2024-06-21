

import { StyleSheet, Text, View, ActivityIndicator, Modal, Pressable, Linking, ToastAndroid, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { Entypo } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';

const data = [
    { key: 'close', value: 'close' },
    { key: 're-work', value: 're-work' },
];
const Tickets = () => {
    const [loading, setLoading] = useState(true)
    const [getTotalTickets, setDataAlltickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])
    const [checkRole, setRoleCheck] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [getopenmodelticket, setTicketmodelopend] = useState(false)
    const [openObjectTicket, setTicketobjectSave] = useState({})

    const [openModalveifyticket, setopenModalveifyticket] = useState(false)
    const [elementoptionverify, setelementoptionverify] = useState('')


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [getImagesverification, setimageverification] = useState({})
    const [selectedImage, setSelectedImage] = useState(null);



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

            // const ticketdataupperCase=data.map(each=>({
            //     ...each,
            //     title:each.title.toUpperCase(),
            //     description:each.description.toUpperCase(),
            //     // status:each.status.toUpperCase(),
            //     // agent:each.agent.toUpperCase(),
            //     // state:each.state.toUpperCase(),
            //     // severity:each.severity.toUpperCase(),
                
            //   }))
            setDataAlltickets(data)
            filterTickets(data, selectedFilter)
        } catch (error) {
            console.error(error);
        }
        setLoading(false)
    }




    const filterTickets = (tickets, filter) => {
        const verificationTickets = tickets.filter(eachVerifi => eachVerifi.status === 'verification')
        if (filter === 'local') {
            setFilteredTickets(verificationTickets.filter(ticket => ticket.state === 'telangana'));
        } else if (filter === 'non-local') {
            setFilteredTickets(verificationTickets.filter(ticket => ticket.state !== 'telangana'));
        } else {
            setFilteredTickets(verificationTickets);
        }
    }








    
    async function fetchDataverification(){
        const role = await AsyncStorage.getItem('rolecheck');
        setRoleCheck(role)
        try {
            const jwtToken = await AsyncStorage.getItem('jwtToken');

            const url = `https://shubhansh7777.pythonanywhere.com/ticket/${openObjectTicket.id}/verification/`


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
            // setProducts(data)
            setimageverification(data)
            // console.log(data); // Process the fetched data here
        } catch (error) {
            // console.error(error);
        }
        setLoading(false)
    };


    useFocusEffect(
        useCallback(() => {
            fetchDataAllTickets();

        }, [])
    );




    useEffect(() => {
        filterTickets(getTotalTickets, selectedFilter);

    }, [selectedFilter, getTotalTickets]);

    const handleOpenTicket = async(eachObject) => {
        setTicketmodelopend(!getopenmodelticket)
        setTicketobjectSave(eachObject)
        fetchDataverification()
        // filterverify()

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

    const handleOnChange = (newValue) => {
        setelementoptionverify(newValue);
        // Update the state with the new selected value
    };



    const onhandleverifyticket = async (verifyid) => {
        console.log(verifyid.id, 'verifyid')
        // /ticket/id/active/

        try {
            const jwtToken = await AsyncStorage.getItem('jwtToken');
            const updatestatus = { status: elementoptionverify }


            const response = await fetch(`https://shubhansh7777.pythonanywhere.com//ticket/${verifyid.id}/judgement/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(updatestatus)
            });

            if (!response.ok) {


                const erroractiveAssigntickets = await response.json();
                console.log(erroractiveAssigntickets, 'newupdate')

                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseAssignticket = await response.json();


            console.log(responseAssignticket, 'new')
            await fetchDataAllTickets();

            ToastAndroid.show('Successfully Verifiy ticket', ToastAndroid.SHORT);


        } catch (error) {
            console.error('new', error);
        }

        setLoading(false)
        setopenModalveifyticket(!openModalveifyticket)

    }

    // const verificationTicketcheck = getTotalTickets.filter(eachVerifi => eachVerifi.status === 'VERIFICATION')
    // console.log(filteredTickets.length, 'verificationTicketcheck')

    // getTotalTickets

  

    const handleImagePress = (url) => {
        console.log('ghhhhjjjjjjj')
        setSelectedImage(url);
        setIsModalVisible(true);

        setTicketmodelopend(!getopenmodelticket);
    };

    const closeModal = () => {
        setIsModalVisible(false);

        // setIsModalVisible(false);
        setSelectedImage(null);
        setTicketmodelopend(!getopenmodelticket);

    };


    const handlecloserworkmodelopen=()=>{
        setTicketmodelopend(!getopenmodelticket);
     setopenModalveifyticket(!openModalveifyticket)
    }
    const closerworkmodelopen=()=>{
        setTicketmodelopend(!getopenmodelticket);
     setopenModalveifyticket(!openModalveifyticket)
    }

    console.log(getImagesverification, 'gghghg')
   console.log(selectedImage,'hh')



    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ? (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator animating={loading} size="large" color="#0000ff" />
                </View>
            ) : (
                <>
                    <Text style={{ fontSize: responsiveHeight(2), marginHorizontal: responsiveHeight(2), fontWeight: '500', marginTop: responsiveHeight(2), marginLeft: responsiveHeight(4), fontSize: responsiveHeight(1.4) }}>SELECT TICKETS</Text>
                    <View style={{ borderColor: '#C4C4C4', borderWidth: 2, marginTop: responsiveHeight(1), marginHorizontal: responsiveHeight(4), borderRadius: responsiveHeight(1), marginBottom: responsiveHeight(5) }}>

                        <Picker
                            selectedValue={selectedFilter}
                            onValueChange={(itemValue) => setSelectedFilter(itemValue)}
                        >
                            <Picker.Item label="ALL TICKETS" value="all" style={{ fontSize: responsiveFontSize(1.2) ,fontWeight:'600'}} />
                            <Picker.Item label="LOCAL TICKETS" value="local" style={{ fontSize: responsiveFontSize(1.2) ,fontWeight:'600'}} />
                            <Picker.Item label="NON-LOCAL TICKETS" value="non-local" style={{ fontSize: responsiveFontSize(1.2),fontWeight:'600' }} />
                        </Picker>
                    </View>
                    {/* {verificationTickets.l} */}

                    {filteredTickets.length === 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                                                <Text style={styles.viewTicketText}>ViewTicket</Text>
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
                                    <ScrollView style={{ marginTop: responsiveHeight(8), flex: 1 }}>
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




                                            <Pressable onPress={handlecloserworkmodelopen} style={{ backgroundColor: '#52c41a', padding: responsiveHeight(1.1), borderRadius: responsiveHeight(0.4), marginBottom: responsiveHeight(2) }}>
                                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.3) }}>Verifiy</Text>
                                            </Pressable >

                                        </View>
                                    </ScrollView>
                                </View>
                            </Modal>


                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={openModalveifyticket}
                                onRequestClose={() => {
                                    // Alert.alert('Modal has been closed.');
                                    setopenModalveifyticket(!openModalveifyticket)
                                }}>
                                <View style={styles.centeredView}>
                                    <ScrollView style={{ marginTop: responsiveHeight(25) }}>

                                        <View style={[styles.modalView,]}>
                                            <View style={{ alignSelf: 'flex-end' }}>
                                                <Pressable style={{ alignSelf: 'flex-end', marginRight: responsiveHeight(1.5), marginTop: responsiveHeight(1) }} onPress={closerworkmodelopen
                                                }>
                                                    <Entypo name="cross" size={responsiveHeight(4)} color="black" />
                                                </Pressable>
                                            </View>

                                            <View style={styles.containercomments}>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Text style={{ fontWeight: '500' }}>COMMENT :</Text>
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
                                                                        <Text style={{ fontSize: responsiveFontSize(1.2), fontWeight: '500' }}>IMAGE {index + 1}</Text>
                                                                    </TouchableOpacity>
                                                                ))
                                                        }
                                                    </View>





                                                </View>
                                            <View style={{ marginTop: responsiveHeight(0.2), padding: responsiveHeight(3) }}>
                                                {/* <Text>Select </Text> */}
                                                <View >

                                                    <SelectList
                                                        data={data}
                                                        setSelected={handleOnChange}
                                                        search={false}
                                                    />
                                                </View>



                                                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
                                                    <Pressable
                                                        style={[styles.button, styles.buttonSubmit]}
                                                        onPress={() => onhandleverifyticket(openObjectTicket)}>
                                                        <Text style={styles.textStyle}>SUBMIT</Text>
                                                    </Pressable>



                                                    <Pressable
                                                        style={[styles.button, styles.buttonClose]}
                                                        onPress={closerworkmodelopen}>
                                                        <Text style={styles.textStyle}>CLOSE</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </View> 
                                    </ScrollView>
                                </View>
                            </Modal>


                                                    <Modal animationType="slide"
                                                        transparent={true}
                                                        visible={isModalVisible}
                                                        onRequestClose={
                                                            closeModal
                                                        }>
                                                        <View style={styles.modalContent}>
                                                            <TouchableOpacity onPress={closeModal} style={styles.closeButtonimage}>
                                                                <Text style={styles.closeButtonText}>CLOSE</Text>
                                                            </TouchableOpacity>
                                                            <Image
                                                                source={{ uri: selectedImage }}
                                                                style={styles.fullImage}
                                                                // resizeMode="contain"
                                                            />

                                                        </View>
                                                    </Modal>



                        </ScrollView>


                    }

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
        fontSize: responsiveHeight(1),
        color: '#000000',
        fontWeight:'500'
    },
    titlestyle: {
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
        fontWeight: '600',
        fontSize: responsiveHeight(1),
    },
    heading: {
        fontWeight: '800',
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
        fontSize: responsiveFontSize(1),
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
        fontWeight: 'bold', width: responsiveHeight(11), fontSize: responsiveFontSize(1)
    },
    valueText: {
        flexWrap: 'wrap', width: responsiveHeight(27), fontSize: responsiveFontSize(1)
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
    },
    containercomments: {
        marginHorizontal: responsiveHeight(2.5),
        width: Dimensions.get('window').width * 0.7,
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
        margin:2
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


})
