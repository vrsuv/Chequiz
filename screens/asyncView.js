import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncView = ({ navigation }) => {
  const [storedData, setStoredData] = useState({});

  // Define fetchData function in the component's outer scope
  const fetchData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const data = await AsyncStorage.multiGet(keys);

      // Convert the data into an object for easier display
      const dataObject = {};
      data.forEach(([key, value]) => {
        dataObject[key] = value;
      });

      setStoredData(dataObject);
    } catch (error) {
      console.error('Error fetching AsyncStorage data:', error);
    }
  };

  useEffect(() => {
    // Call fetchData when the component mounts
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stored Data in AsyncStorage:</Text>
      <Text style={styles.data}>{JSON.stringify(storedData, null, 2)}</Text>
      <Button title="Refresh Data" onPress={fetchData} />
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  data: {
    fontSize: 14,
    fontFamily: 'monospace',
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
});

export default AsyncView;
