import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';


const TabsLayout = () => {
    return (
        <Tabs        
        screenOptions={{
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.dark,
            headerShown:false
        }}

        >
            <Tabs.Screen 
                name="today" 
                options={{ 
                    title: 'Today', 
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="calendar" size={24} color="black" />
                    ),
                }} 
            />
            <Tabs.Screen 
                name="upcoming" 
                options={{
                    title: 'Upcoming',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="time-outline" size={size} color={color} />
                    ),
                }} 
            />
            <Tabs.Screen 
                name="search" 
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search-outline" size={size} color={color} />
                    ),
                }} 
            />
            <Tabs.Screen 
                name="browse" 
                options={{
                    title: 'Browse',
                    headerTitleAlign:'center',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book-outline" size={size} color={color} />
                    ),
                }} 
            />
        </Tabs>
    );
};

export default TabsLayout;

const styles = StyleSheet.create({});
