import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthenticatedLayout = () => {
  const { height } = useWindowDimensions();
  return (
    <Stack>
        <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
        <Stack.Screen name='task/[id]' options={{
          title: '',
          presentation: 'formSheet',
          sheetAllowedDetents: height > 700 ? [0.22] : 'fitToContents',
          sheetGrabberVisible: false,
          sheetCornerRadius: 10,
          headerShown: false,
          sheetExpandsWhenScrolledToEdge: false,
        }}/>
        <Stack.Screen name='task/new' options={{headerShown:false, presentation:'modal'}}/>
    </Stack>
  )
}

export default AuthenticatedLayout

const styles = StyleSheet.create({})