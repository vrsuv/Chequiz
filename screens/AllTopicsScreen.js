import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { Cell, Section } from 'react-native-tableview-simple';
import { useSettings } from '../components/Contexts';
import * as Haptics from 'expo-haptics';
import axios from 'axios';

import {dropdownStyle} from "../components/Styles.js";
import SelectOption from "../components/QuizSettings.js";
import BottomNav from "../components/bottomNav";


const TopicCell = (props) => (
  <Cell {...props}
    backgroundColor="transparent"
    highlightUnderlayColor="#ccc"
    
    cellContentView = {
      <View style={[styles.topicsCont, styles.shadowStyle]}>
        <Text style={styles.textStyle}>{props.subjName}</Text>
      </View>
    }
    onPress={props.action}
  />
)

const AllTopics = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [selectOption, setSelectOption] = useState(null);
  const [diffLevel, setDiffLevel] = useState("");
  const [qnsNumber, setQnsNumber] = useState(0);
  const [time, setTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        'https://opentdb.com/api_category.php'
      );
      const subjects = response.data.trivia_categories;
      setCategories(subjects);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const renderItem = ({item}) => (
    <TopicCell
      subjName = {item.name}
      action = {() => {
        handleTouch();
        if (diffLevel !== "" && qnsNumber !== 0 && time !== 0) {
          navigation.navigate("Quiz", {
            selectedTopic: item.name,
            diffLevel: diffLevel,
            qnsNumber: qnsNumber,
            time: time
          })
        } else {
          checkTypes();
        }
      }}
    />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Section 
          header={
            <View>
              <Text style={styles.textStyle}>All topics' quizzes</Text>
            </View>
          }
        ></Section>
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
              console.log('ssjsjsj', newOption);
            }}
            defaultButtonText={"Set Duration (mins)"}
          />
        </View>
        <ScrollView style={{height: "100%"}}>
        {isLoading ? (
          <Text style = {styles.textStyle}>Loading...</Text>
        ) : (
          <ScrollView style={{height: "100%"}}>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
          </ScrollView>
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
  topicsCont: {
    margin: "1%",
    width: "100%",
    height: "90%",
    borderRadius: 5,
    backgroundColor: "#ffc0cb",
    justifyContent: 'center',
    flexDirection: 'row',
  },
  shadowStyle: {
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: "3%",
    color: "#000",
  },
});

export default AllTopics;


