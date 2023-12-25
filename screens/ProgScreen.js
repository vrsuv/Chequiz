import React, {useState, useEffect} from "react";
import { 
  View, 
  Text, 
  StyleSheet,
  SafeAreaView, 
  Dimensions, 
  ScrollView 
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment';

import BottomNav from "../components/bottomNav";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const dayShort = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
const currentDay = moment().format('dddd'); 

const Progress = ({ route }) => {
  const {selectedTopic} = route.params;
  const [weeklyMarks, setWeeklyMarks] = useState([]);

  useEffect(() => {
    const getMarks = async () => {
      const marksArray = [];

      for (const day of days) {
        try {
          const quizKey = `${selectedTopic}_${day}`;
          const keyMarks = await AsyncStorage.getItem(quizKey);
          const keyMarksArr = JSON.parse(keyMarks || '[]');
          const highestMark = keyMarksArr.filter((mark) => mark === Math.max(...keyMarksArr));
          marksArray.push({ day, marks: highestMark });
        } catch (error) {
          console.error('Error fetching marks:', error);
        }
      }
      setWeeklyMarks(marksArray);
    };

    getMarks();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style = {styles.container}>
        <ScrollView style={{height: "100%"}}>
          <Text style={styles.topicText}>
            Weekly results for {selectedTopic}
          </Text>
          <Text style={styles.descriptionText}>
            (in the last 7 days){"\n"}Today is {currentDay}!
          </Text>
          {weeklyMarks.length > 0 && (
            <View style={styles.barChartCont}>

            {/* 
              Bar chart component, adapted from:
              Author: Mhret Aatifa
              Date Accessed: 12 September 2023
              Title of tutorial: "React Native Chart Kit"
              Type: Tutorial
              URL: https://morioh.com/a/71c5cd1909e1/react-native-chart-kit
            */}

              <BarChart
                data={{
                  labels: dayShort,
                  datasets: [
                    {
                      data: weeklyMarks.map((item) => (item.marks !== null ? item.marks : 0)),
                    },
                  ],
                }}
                width={Dimensions.get("window").width + 35}
                height={220}
                chartConfig={{
                  backgroundColor: "#FFFFFF",
                  backgroundGradientFrom: "#FFFFFF",
                  backgroundGradientTo: "#FFFFFF",
                  decimalPlaces: 0,
                  color: (opacity = 2) => `rgba(255, 99, 111, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
              />
            </View>
          )}
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
  barChartCont: {
    marginLeft: -35, 
    marginTop: "50%",
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  topicText: {
    fontSize: 20, 
    color: '#000', 
    marginTop: "10%",
    textAlign: 'center', 
  },
  descriptionText: {
    fontSize: 15, 
    color: '#000',
    textAlign: 'center', 
  },
});

export default Progress;


