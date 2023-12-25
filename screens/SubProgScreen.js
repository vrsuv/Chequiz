import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { Cell } from 'react-native-tableview-simple';
import * as Haptics from 'expo-haptics';
import { useSettings } from '../components/Contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomNav from "../components/bottomNav";

const QuizProgCell = (props) => (
  <Cell {...props}
    backgroundColor="transparent"
    highlightUnderlayColor="#ccc"
    
    cellContentView = {
      <View style={[styles.subContainer, styles.shadowStyle]}>
        <Text style={styles.titleStyle}>{props.subjName}</Text>
      </View>
    }
    onPress={props.action}
  />
)

const SubProgScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  const { isHaptic } = useSettings();
  const handleTouch = () => {
    if (isHaptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  useEffect(() => {
    getTopics();
  }, []);

  const getTopics = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const uniqueTopics = [];
      allKeys.map((item) => {
        const words = item.split('_');
        if (words.length > 1) {
          topic = words[0]
          if (!uniqueTopics.includes(topic) && !topic.startsWith('EXPO')) {
            uniqueTopics.push(topic);
          }
        }
      })
      setCategories(uniqueTopics);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const renderItem = ({item}) => (
    <QuizProgCell
      subjName = {item}
      action = {() => {
        handleTouch();
        navigation.navigate("Progress", {
          selectedTopic: item,
        });
      }}
    />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        {categories.length === 0 ? (
          <Text style={{ textAlign: 'center', fontSize: 20, color: 'black',  marginTop: "10%" }}>
            No quizzes yet
          </Text>
        ) : (
          <Text style={{ textAlign: 'center', fontSize: 20, color: 'black',  marginTop: "10%" }}>
            Check your progress for:
          </Text>
        )}
        <ScrollView style={{height: "100%"}}>
          
          <View style = {{height: "100%", marginTop: "5%"}}>
            <FlatList
              data={categories}
              renderItem={renderItem}
              keyExtractor={(item) => item}
            />
          </View>
        </ScrollView>
      <BottomNav />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: 'column',
    height: "100%",
    width: "100%"
  },
  subContainer: {
    width: "100%",
    height: "90%",
    backgroundColor: "#ffc0cb",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  shadowStyle: {
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  titleStyle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
  },
});

export default SubProgScreen;


