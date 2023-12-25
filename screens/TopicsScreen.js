import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  Image, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import * as Haptics from 'expo-haptics';
import { useSettings } from '../components/Contexts';

import {dropdownStyle} from "../components/Styles.js";
import SelectOption from "../components/QuizSettings.js";
import BottomNav from "../components/bottomNav";

const TopicsCell = (props) => (
  <Cell 
  {...props}
    backgroundColor="transparent"
    highlightUnderlayColor="#ccc"
    cellContentView={
      <View style={[styles.container, styles.box]}>
        <Image style={styles.subImgStyle} source={props.subjImg}/>
        <Text style={styles.subTextStyle}>{props.subjName}</Text>
      </View>
    }
    onPress={props.action}
  />
);

const Topics = ({ navigation, route }) => {
  const {items, respSub} = route.params;
  const [selectOption, setSelectOption] = useState(null);
  const [diffLevel, setDiffLevel] = useState("");
  const [qnsNumber, setQnsNumber] = useState(0);
  const [time, setTime] = useState(0);
  const respSubItem = items.find(item => item.title === respSub);

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
      'Please choose your quiz settings',
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
      <View style={styles.container}>
      <Section 
        header={
          <View>
            <Text style={{fontSize: 20}}>{respSubItem.title}</Text>
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
        }}
        defaultButtonText={"Set Duration (mins)"}
      />
    </View>
      <ScrollView>
        <TableView style = {styles.shadowStyle}>
          <Section>
            <View style={styles.column}>
              {respSubItem.contents.map((content, i) =>
                <TouchableOpacity key={i}>
                <TopicsCell
                key = {i}
                  subjName = {content.name}
                  subjImg = {content.imgUri}
                  action = {() => {
                    handleTouch();
                    if (diffLevel !== "" && qnsNumber !== 0 && time !== 0) {
                      navigation.navigate("Quiz", {
                        selectedTopic: content.name,
                        diffLevel: diffLevel,
                        qnsNumber: qnsNumber,
                        time: time
                      })
                    } else {
                      checkTypes();
                    }
                  }}
                />
                </TouchableOpacity>
              )}
            </View>
          </Section>
          <TouchableOpacity
            onPress={() => {
              handleTouch();
              navigation.navigate("All Topics");
            }}
          >
            <Text style={styles.allTopicsText}>More topics → </Text>
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
    alignItems: 'center',
    flexDirection: 'column',
  },
  shadowStyle: {
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: "1%"
  },
  box: {
    width: "100%",
    height: "90%",
    borderRadius: 20,
    backgroundColor: '#ffc0cb',
    alignContent: 'center',
    marginVertical: 5,
    flexDirection: 'row',
  },
  subTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    margin: 10,
  },
  subImgStyle: {
    width: 100, 
    height: 100,
    borderRadius: 5,
    margin: 8,
    marginLeft: "8%",
  },
  allTopicsText: {
    fontSize: 18,
    textAlign: 'right',
    marginRight: "10%",
    textDecorationLine: 'underline',
  },
});

export default Topics;

