import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors'; // Replace with your color constants

const DropdownMenu = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleMenu = () => setIsVisible(!isVisible);

  // Handle closing the menu
  const handleCloseMenu = () => setIsVisible(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Ionicons name="ellipsis-horizontal-outline" size={32} color={Colors.primary} />
      </TouchableOpacity>

      <Modal
        isVisible={isVisible}
        onBackdropPress={handleCloseMenu} // Close on backdrop press
        onBackButtonPress={handleCloseMenu} // Close on back button press (Android)
        backdropColor="rgba(0, 0, 0, 0.3)" // Transparent backdrop
        backdropOpacity={0.3}
        animationIn="fadeInDown" // Menu slides down from the button
        animationOut="fadeOutUp" // Menu disappears upwards
        useNativeDriver={true}
        style={styles.modal}
      >
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => { console.log('Item 1 clicked'); handleCloseMenu(); }} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Copy</Text>
            <Feather name="link" size={24} color="black" />
          </TouchableOpacity>
          <View style={{width:'100%', backgroundColor:Colors.backgroundAlt, height:'10',}}/>
          <TouchableOpacity onPress={() => { console.log('Item 2 clicked'); handleCloseMenu(); }} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Select Tasks</Text>
            <Ionicons name="checkbox-outline" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.seprator}/>
          
          <TouchableOpacity onPress={() => { console.log('Item 3 clicked'); handleCloseMenu(); }} style={styles.menuItem}>
            <Text style={styles.menuItemText}>View</Text>
            <Ionicons name="eye-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { console.log('Item 4 clicked'); handleCloseMenu(); }} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Activity Log</Text>
            <Ionicons name="analytics-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align the button to the left
    alignItems: 'center',
    padding: 10,
  },
  menuButton: {
    // backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 25,
  },
  modal: {
    justifyContent: 'flex-start',  // Ensures menu starts from the button
    margin: 0, // Remove default margins
    alignItems: 'flex-start', // Align the menu to start from the button
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 12,
    // paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Add shadow on Android
    width: 200, // Fixed width of the menu
    position: 'absolute', // Position the dropdown on top of the button
    top: 120, // Adjust depending on button height and position
    right: 50, // Align to the left edge of the button
  },
  seprator:{
    backgroundColor:Colors.backgroundAlt, 
    height:3
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal:20,
    width:'100%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'

  },

  menuItemText: {
    fontSize: 18,
    color: 'black',

  },
});

export default DropdownMenu;
