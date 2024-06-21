import { Button, StyleSheet, Text, Touchable, TouchableOpacity, View, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const About_Page = () => {
  const navigation = useNavigation()
  return (
    <View>
      <StatusBar style="dark" />

      <Text>About_Page</Text>
      <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
        <Text>AboutButton</Text>
      </TouchableOpacity>
    </View>
  )
}

export default About_Page

const styles = StyleSheet.create({})