import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Details = () => {
    //extract the route params in expo
    const { id } = useLocalSearchParams()
  return (
    <View>
      <Text>Movie Details: {id}</Text>
    </View>
  )
}

export default Details

const styles = StyleSheet.create({})