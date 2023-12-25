import React from 'react';
import { 
  StyleSheet, 
  Image, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity 
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSettings } from '../components/Contexts';
import Svg, { G, Circle } from "react-native-svg";

const Results = ({ navigation, route }) => {
  const {totalQues, selectedTopic, marks, timeTaken, quizTime} = route.params

  const percentage = (marks / totalQues.length) * 100;
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;
  const results = circleCircumference - (circleCircumference * percentage) / 100;

  const passed = percentage >= 50;
  const timeUp = timeTaken === (quizTime - 1) || timeTaken === (quizTime - 2) || timeTaken === quizTime;

  const { isHaptic } = useSettings();
  const handleTouch = () => {
    if (isHaptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };


  return (
    <SafeAreaView style={{height: "100%", backgroundColor: '#FFFFFF'}}>
    <View style = {styles.container}>
      <Text style = {styles.headStyle}>Topic: {selectedTopic}{"\n"}Your Results: </Text>

      {/* 
      Donut chart component, adapted from:
      Author: Francisco Mendes
      Date Accessed: 11 September 2023
      Title of tutorial: "How to Create a Donut Chart using React Native SVG"
      Type: Tutorial
      URL: https://dev.to/franciscomendes10866/how-to-create-a-donut-chart-using-react-native-svg-30m9
      */}
      
      <View style = {styles.donutContainer}>
        <Svg height="160" width="160" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#f1f1f1"
              fill="transparent"
              strokeWidth="20"
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke= "#fc6c85"
              fill="transparent"
              strokeWidth="20"
              strokeDasharray={circleCircumference}
              strokeDashoffset={results}
              strokeLinecap="round"
            />
          </G>
        </Svg>
        <Text style = {styles.textStyle}>{marks}/ {totalQues.length} </Text>
      </View>
      <View style={styles.wordCont}>
        {timeUp ? (
          <Text style = {styles.wordStyle}>Times up!</Text>
        ) : (
          <Text style = {styles.wordStyle}>Time taken: {timeTaken} seconds</Text>
        )}
        {passed ? (
          <Text style = {styles.wordStyle}>Well done!</Text>
        ) : (
          <Text style = {styles.wordStyle}>Better luck next time!</Text>
        )}
      </View>
        

      <View style = {styles.symbolsStyle}>
        <View style={{flexDirection: 'column', }}>
          <TouchableOpacity
            onPress={() => {
              handleTouch();
              navigation.navigate("All Topics")
            }}
          >
            <Image
              source={require("../assets/retry.png")}
              style={{ height: 30, width: null }}
              resizeMode="contain"
              resizeMethod="resize"
            />
            <Text>Retry</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'column' }}>
          <TouchableOpacity
            onPress={() => {
              handleTouch();
              navigation.navigate("Home");
            }}
          >
            <Image
              source={require("../assets/home.png")}
              style={{ height: 30, width: null }}
              resizeMode="contain"
              resizeMethod="resize"
            />
            <Text>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  headStyle: {
    fontSize: 18,
    textAlign: 'center', 
    marginTop: "5%"
  },
  donutContainer: {
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: "5%"
  },
  textStyle: {
    fontSize: 18,
    position: "absolute",
    textAlign: "center",
    color: "#394867",
  },
  wordStyle: {
    fontSize: 18,
    marginTop: "2%",
    textAlign: "center",
    color: "#000",
  },
  wordCont: {
    alignItems: "center", 
    justifyContent: "center", 
    margin: "5%"
  },
  symbolsStyle: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginTop: "5%"
  },
});


export default Results;



