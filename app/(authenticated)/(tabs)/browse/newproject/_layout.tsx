import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'

const NewProjectLayout = () => {
  return (
    <Stack screenOptions={{ 
      headerShadowVisible: false,
        contentStyle: { backgroundColor: Colors.backgroundAlt },
        headerTintColor: Colors.primary,
        headerTitleStyle: { color: '#000' },
    }}>
      <Stack.Screen name='index'
        options={{
          title: 'New Project',
          headerTransparent: true,
          headerLeft: () => (
            <Button title="Cancel" onPress={() => router.dismiss()} color={Colors.primary} />
          ),
        }} />

      <Stack.Screen name='color-selector'  
      options={{
          title: 'Color',
          headerTransparent: true,
        }} />
    </Stack>
  )
}

export default NewProjectLayout

const styles = StyleSheet.create({})