import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TodoForm from '@/components/TodoForm'
import { useSQLiteContext } from 'expo-sqlite'
import { drizzle } from 'drizzle-orm/expo-sqlite'

const NewTodo = () => {
  const db = useSQLiteContext()
  const drizzleDb= drizzle(db)
  return (
    <TodoForm drizzleDb={drizzleDb}/>
  )
}

export default NewTodo

const styles = StyleSheet.create({})