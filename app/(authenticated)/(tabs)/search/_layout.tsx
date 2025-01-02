import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';


const Layout = () => {
  return (

      <Stack
        screenOptions={{
          headerShadowVisible: false,
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Search',
            headerLargeTitle: true,
            // headerSearchBarOptions: {
            //   placeholder: 'Tasks, Projects, and More',
            //   tintColor: Colors.primary,
            //   // onChangeText: (query) => setSearchQuery(query),
            // },
          }}
        />
      </Stack>
  );
};

export default Layout;
