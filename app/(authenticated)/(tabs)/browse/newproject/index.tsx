import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSQLiteContext } from 'expo-sqlite'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { Link, router, Stack, useGlobalSearchParams } from 'expo-router'
import { Colors, DEFAULT_PROJECT_COLOR } from '@/constants/Colors'
import { projects } from '@/db/schema'
import { Ionicons } from '@expo/vector-icons'
import {useHeaderHeight} from "@react-navigation/elements"
const Page = () => {
  const db = useSQLiteContext()
  const drizzleDb = drizzle(db)

  const [projectName, setProjectName] = useState('');
  // ** color-selector page is dictating the bg color via router
  
  const { bg } = useGlobalSearchParams<{ bg?: string }>();
  const [selectedColor, setSelectedColor] = useState<string>(DEFAULT_PROJECT_COLOR);

  const headerHeight = Platform.select({
    ios:44,
    android:56
  })

  useEffect(() => {
    if (bg) {
      setSelectedColor(bg);
    }
  }, [bg]);

  const onCreateProject = async () => {
    await drizzleDb.insert(projects).values({
      name: projectName,
      color: selectedColor,
    });
    console.log("data created")
    router.dismiss();
  };
  return (
    <View style={{marginTop:headerHeight}}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={onCreateProject} disabled={projectName === ''}>
              <Text style={projectName === '' ? styles.btnTextDisabled : styles.btnText}>
                Create
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
 <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={projectName}
          onChangeText={setProjectName}
          placeholder="Name"
          autoFocus
        />
        <Link href="/browse/newproject/color-selector" asChild>
          <TouchableOpacity style={styles.btnItem}>
            <Ionicons name="color-palette-outline" size={24} color={Colors.dark} />
            <Text style={styles.btnItemText}>Color</Text>
            <View style={[styles.colorPreview, { backgroundColor: selectedColor }]} />
            <Ionicons name="chevron-forward" size={22} color={Colors.dark} />
          </TouchableOpacity>
        </Link>

       
      </View>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  btnTextDisabled: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.dark,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.primary,
  },
  container: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  input: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightBorder,
    padding: 12,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  btnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    gap: 12,
  },
  btnItemText: {
    fontSize: 16,
    flex: 1,
    fontWeight: '500',
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});