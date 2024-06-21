import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { ScrollView } from 'react-native-gesture-handler';


const User_Page = () => {
  const [roleCheck, setRoleCheck] = useState('');

  const [dataUsers, setDataUsers] = useState([]);
  const [loading, setLoading] = useState(true)
  async function fetchDataUser() {
    const role = await AsyncStorage.getItem('rolecheck');
    setRoleCheck(role)
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');

      const url = 'https://shubhansh7777.pythonanywhere.com/account/all/'


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

      const responseData = data.map(item => ({
        ...item,
        role: item.role.toUpperCase(),
        email: item.email.toUpperCase(),
        first_name: item.first_name.toUpperCase(),
        last_name: item.last_name.toUpperCase(),

      }));

      setDataUsers(responseData)
      // console.log(data); // Process the fetched data here
    } catch (error) {
      // console.error(error);
    }
    setLoading(false)
  }




  useFocusEffect(
    useCallback(() => {
      fetchDataUser();
    }, [])
  );


  const formatRole = (role) => {
    return role.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />


      {loading ? <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={loading} size="large" color="#0000ff" />
      </View> :
        <>
          <ScrollView>
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={styles.cellheadid}>ID</Text>

                <Text style={styles.cellhead}>USERNAME</Text>
                <Text style={styles.cellhead}>EMAIL</Text>
                <Text style={styles.cellhead}>ROLE</Text>

              </View>

              {
                dataUsers.map((item, index) => (
                  <View style={styles.row} key={item.id}>
                    <Text style={styles.cellid}>{index + 1}</Text>

                    <Text style={styles.cell}>{item.first_name} {item.last_name}</Text>
                    <Text style={styles.cell}>{item.email}</Text>
                    <Text style={[styles.cell, { fontWeight: '500' }]}>{formatRole(item.role)}  </Text>


                  </View>

                ))}


            </View>
          </ScrollView>
        </>
      }







    </SafeAreaView>
  )
}

export default User_Page

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  table: {
    borderWidth: 0.1,
    borderColor: "#C4C4C4",
    marginBottom: 10,
    marginTop: 30,
    paddingHorizontal: 20,
    // padding:
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",

  },
  cellhead: {
    width: responsiveHeight(8),
    height: responsiveHeight(8),
    borderWidth: 0.5,
    color: "black",
    padding: 10,
    textAlign: 'center',
    fontWeight: '700',
    borderColor: "#C4C4C4",
    flex: 1,

    fontSize: responsiveFontSize(1.2)

  },

  cellheadid: {

    borderWidth: 0.5,
    color: "black",
    fontWeight: '700',
    paddingTop: 10,
    borderWidth: 0.5,
    width: responsiveHeight(8),
    height: responsiveHeight(8),
    textAlign: "center",
    fontSize: responsiveFontSize(1.2),
    borderColor: "#C4C4C4",

  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 0.5,
    width: responsiveHeight(8),
    height: responsiveHeight(8),
    textAlign: "center",
    fontSize: responsiveFontSize(1),
    color: "black",
    borderColor: "#C4C4C4",



  },

  cellid: {

    paddingTop: 10,
    borderWidth: 0.5,
    width: responsiveHeight(8),
    height: responsiveHeight(8),
    textAlign: "center",
    fontSize: responsiveFontSize(1.2),
    color: "black",
    borderColor: "#C4C4C4",
  }
})