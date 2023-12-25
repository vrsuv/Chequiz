import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  Alert, 
  TextInput,
  Switch
} from 'react-native';
import { Section, TableView } from 'react-native-tableview-simple';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from "../firebase";

import { useSettings } from '../components/Contexts';
import BottomNav from "../components/bottomNav";

const Settings = ({ navigation, route }) => {
  const { isHaptic, toggleHaptic } = useSettings();

  const startOver = () => {
    Alert.alert(
      'Are you sure?',
      'All progress from all quizzes will be reset',
      [
        {
          text: 'Yes',
          onPress: () => {
            try {
              AsyncStorage.clear();
              console.log('AsyncStorage data cleared.');
            } catch (error) {
              console.error('Error clearing AsyncStorage data:', error);
            }
          },
        },
        {
          text: 'No',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.container}>
      <Section 
        header={
          <View>
            <Text style={{fontSize: 20}}>Settings</Text>
          </View>
        }
      ></Section>
        <ScrollView> 
        <TableView>
          <View style = {styles.toggleStyle}>
            <Text>Enable Haptic Touch</Text>
            <Switch
              value={isHaptic}
              onValueChange={toggleHaptic}
            />
          </View>
          <TouchableOpacity
            style = {styles.cellStyle}
            onPress = {() => {
              startOver();
            }}>
            <Text style = {{color: 'red' }}>Start Over</Text>
          </TouchableOpacity>
        </TableView>
        </ScrollView>
      <BottomNav />
      </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: 'column',
  },
  cellStyle: {
    padding: 20,
    marginTop: "7%",
    backgroundColor: '#DEDEDE'
  },
  toggleStyle: {
    padding: 20,
    marginTop: "7%",
    backgroundColor: '#DEDEDE',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Settings;


