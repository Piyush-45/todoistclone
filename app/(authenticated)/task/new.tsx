import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSQLiteContext } from 'expo-sqlite'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { todos } from '@/db/schema'

const New = () => {
  return (
    <View>
      <Text>New</Text>
    </View>
  )
}

export default New

const styles = StyleSheet.create({})