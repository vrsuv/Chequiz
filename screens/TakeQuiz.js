import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView,
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSettings } from '../components/Contexts';

import {dropdownStyle} from "../components/Styles.js";
import SelectOption from "../components/QuizSettings.js";
import BottomNav from "../components/bottomNav";

const TakeQuiz = ({ navigation, route }) => {
  const {selectedTopic} = route.params;
  const [selectOption, setSelectOption] = useState(null);
  const [diffLevel, setDiffLevel] = useState("");
  const [qnsNumber, setQnsNumber] = useState(0);
  const [time, setTime] = useState(0);

  const { isHaptic } = useSettings();
  const handleTouch = () => {
    if (isHaptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };
  
  const diffLevels = ['easy', 'medium', 'hard'];
  const nums = [5, 10];
  const timers = [1, 2, 5, 10];

  const checkTypes = () => {
    Alert.alert(
      'Input error',
      'Please choose your quiz settings.',
      [
        {
          text: 'Okay',
          onPress: () => {
            console.log('Okay button pressed.');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
        <Text style = {styles.textStyle}> You have chosen to take a quiz for {'\n'} {selectedTopic}.</Text>
        <View style = {{marginTop: "50%"}}>
          <View style = {dropdownStyle.dropAll}>
            <View style = {dropdownStyle.dropTwo}>
              <SelectOption
                buttonStyle={style = dropdownStyle.dropdown1}
                data={diffLevels}
                selectedValue={selectOption}
                onValueChange={(newOption) => {
                  setSelectOption(newOption);
                  setDiffLevel(newOption);
                }}
                defaultButtonText={"Set Difficulty level"}
              />
              <SelectOption
                buttonStyle={style = dropdownStyle.dropdown1}
                data={nums}
                selectedValue={selectOption}
                onValueChange={(newOption) => {
                  setSelectOption(newOption);
                  setQnsNumber(newOption);
                }}
                defaultButtonText={"Set No. of questions"}
              />
            </View>
          <SelectOption
            buttonStyle={style = dropdownStyle.dropdown2}
            data={timers}
            selectedValue={selectOption}
            onValueChange={(newOption) => {
              setSelectOption(newOption);
              setTime(newOption);
            }}
            defaultButtonText={"Set Duration (mins)"}
          />
        </View>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress = {() => {
              handleTouch();
              if (diffLevel !== "" && qnsNumber !== 0 && time !== 0) {
                navigation.navigate("Quiz", {
                  selectedTopic: selectedTopic,
                  diffLevel: diffLevel,
                  qnsNumber: qnsNumber,
                  time: time
                })
              } else {
                checkTypes();
              }
            }}
          >
            <Text style={{ fontSize: 15, color: '#000' }}>Take Quiz</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginTop: "10%",
    flexDirection: 'column',
    alignContent: 'center'
  },
  textStyle: {
    fontSize: 20, textAlign: 'center'
  },
  btnStyle: {
    width: "94%",
    margin: "3%",
    marginTop: "5%",
    borderRadius: 20,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffc0cb"
  },
});

export default TakeQuiz;

