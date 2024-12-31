import { Button, Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'

const AuthenticatedLayout = () => {
  const { height } = useWindowDimensions();
  return (
    <Stack>
        <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
        <Stack.Screen 
        name="task/[id]" 
        options={{
          title: '',
          // Platform specific presentation
          presentation: Platform.select({
            ios: 'formSheet',
            android: 'modal'  // or 'transparentModal' for a more sheet-like appearance
          }),
          // iOS specific options
          ...Platform.select({
            ios: {
              sheetAllowedDetents: height > 700 ? [0.6, 0.9] : 'fitToContents',
              sheetGrabberVisible: true,
              sheetCornerRadius: 10,
              sheetExpandsWhenScrolledToEdge: false,
              headerShown:true,
              headerLeft:()=><Button title='cancel' onPress={()=>router.back()}/>
            }
          }),
        }}
      />
        <Stack.Screen name='task/new' options={{headerShown:false, presentation:'modal'}}/>
        <Stack.Screen 
        name="task/date-selector" 
        options={{
          title: 'Schedule',
          // Platform specific presentation
          presentation: Platform.select({
            ios: 'formSheet',
            android: 'modal'  // or 'transparentModal' for a more sheet-like appearance
          }),
          // iOS specific options
          ...Platform.select({
            ios: {
              title:'Schedule',
              sheetAllowedDetents: height > 700 ? [0.6, 0.9] : 'fitToContents',
              sheetGrabberVisible: true,
              sheetCornerRadius: 10,
              sheetExpandsWhenScrolledToEdge: false,
            }
          }),
        }}
      />
    </Stack>
  )
}

export default AuthenticatedLayout

const styles = StyleSheet.create({})