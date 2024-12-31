import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SignInButton } from '@clerk/clerk-react'
import { useAuth } from '@clerk/clerk-expo'
import { useSQLiteContext } from 'expo-sqlite'
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { projects } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { router } from 'expo-router'
import Fab from '@/components/Fab'
import * as ContextMenu from 'zeego/context-menu';
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import Animated, { LinearTransition } from 'react-native-reanimated';

const Browse = () => {
  const { signOut } = useAuth()
  const db = useSQLiteContext()
  const drizzleDb = drizzle(db)
  const { data } = useLiveQuery(drizzleDb.select().from(projects), [])

  const isPro = true

  const onNewProject = () => {
    if (data.length >= 5 && !isPro) {
      //pro dialod
    } else {
      router.push('/browse/newproject')
    }
  }

  const onDeleteProject = async (id: number) => {
    await drizzleDb.delete(projects).where(eq(projects.id, id))
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>My Projects</Text>
          <TouchableOpacity onPress={onNewProject}>
            <Ionicons name="add" size={24} color={Colors.dark} />
          </TouchableOpacity>
        </View>
        <Animated.FlatList
             itemLayoutAnimation={LinearTransition}
          data={data}
          renderItem={({ item }) => (
            <ContextMenu.Root key={item.id}>
              <ContextMenu.Trigger>
                <TouchableOpacity style={styles.projectButton} onPress={() => {}}>
                  <Text style={{ color: item.color }}>#</Text>
                  <Text style={styles.projectButtonText}>{item.name}</Text>
                </TouchableOpacity>
              </ContextMenu.Trigger>
              <ContextMenu.Content>
                <ContextMenu.Item key={'delete'} onSelect={() => onDeleteProject(item.id)}>
                  <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
                  <ContextMenu.ItemIcon
                    ios={{
                      name: 'trash',
                      pointSize: 18,
                    }}
                    androidIconName='trash'
                  />
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Root>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={() => (
            <>
              <TouchableOpacity style={styles.clearButton} onPress={() => signOut()}>
                <Text style={styles.clearButtonText}>Log Out</Text>
              </TouchableOpacity>
            </>
          )}
        />

      </View>
      <Fab />
    </>
  )
}

export default Browse

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    flex: 1,
  },
  clearButton: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: Colors.primary,
    fontSize: 18,
  },
  projectButton: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
  },
  projectButtonText: {
    fontSize: 16,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightBorder,
  },
});


// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useState } from 'react';
// import { useAuth } from '@clerk/clerk-expo';
// import { useSQLiteContext } from 'expo-sqlite';
// import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
// import { projects } from '@/db/schema';
// import { eq } from 'drizzle-orm';
// import { router } from 'expo-router';
// import Fab from '@/components/Fab';
// import { Ionicons } from '@expo/vector-icons';
// import { Colors } from '@/constants/Colors';
// import Animated, { LinearTransition } from 'react-native-reanimated';
// import { Menu, Portal, Provider } from 'react-native-paper';

// const Browse = () => {
//   const { signOut } = useAuth();
//   const db = useSQLiteContext();
//   const drizzleDb = drizzle(db);
//   const { data } = useLiveQuery(drizzleDb.select().from(projects), []);
//   const isPro = true;

//   // State for menu visibility and position
//   const [visible, setVisible] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

//   const onNewProject = () => {
//     if (data?.length >= 5 && !isPro) {
//       // pro dialog
//     } else {
//       router.push('/browse/newproject');
//     }
//   };

//   const onDeleteProject = async (id: number) => {
//     await drizzleDb.delete(projects).where(eq(projects.id, id));
//     setVisible(false);
//   };

//   const openMenu = (project, event) => {
//     // Get the position of the touch event
//     const { pageX, pageY } = event.nativeEvent;
//     setMenuPosition({ x: pageX, y: pageY });
//     setSelectedProject(project);
//     setVisible(true);
//   };

//   const closeMenu = () => {
//     setVisible(false);
//     setSelectedProject(null);
//   };

//   return (
//     <Provider>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.sectionTitle}>My Projects</Text>
//           <TouchableOpacity onPress={onNewProject}>
//             <Ionicons name="add" size={24} color={Colors.dark} />
//           </TouchableOpacity>
//         </View>

//         <Animated.FlatList
//           itemLayoutAnimation={LinearTransition}
//           data={data}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.projectButton}
//               onPress={() => {}}
//               onLongPress={(event) => openMenu(item, event)}>
//               <Text style={{ color: item.color }}>#</Text>
//               <Text style={styles.projectButtonText}>{item.name}</Text>
//             </TouchableOpacity>
//           )}
//           ItemSeparatorComponent={() => <View style={styles.separator} />}
//           ListFooterComponent={() => (
//             <TouchableOpacity style={styles.clearButton} onPress={() => signOut()}>
//               <Text style={styles.clearButtonText}>Log Out</Text>
//             </TouchableOpacity>
//           )}
//         />

//         <Portal>
//           <Menu
//             visible={visible}
//             onDismiss={closeMenu}
//             anchor={menuPosition}
//             contentStyle={styles.menuContent}>
//             <Menu.Item
//               onPress={() => selectedProject && onDeleteProject(selectedProject.id)}
//               title="Delete"
//               leadingIcon="trash-can-outline"
//             />
//           </Menu>
//         </Portal>
//       </View>
//       <Fab />
//     </Provider>
//   );
// };

// export default Browse;

// const styles = StyleSheet.create({
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     margin: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   container: {
//     padding: 20,
//     flex: 1,
//   },
//   clearButton: {
//     padding: 14,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   clearButtonText: {
//     color: Colors.primary,
//     fontSize: 18,
//   },
//   projectButton: {
//     padding: 14,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     alignItems: 'center',
//     flexDirection: 'row',
//     gap: 14,
//   },
//   projectButtonText: {
//     fontSize: 16,
//   },
//   separator: {
//     height: StyleSheet.hairlineWidth,
//     backgroundColor: Colors.lightBorder,
//   },
//   menuContent: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     elevation: 3,
//   },
// });