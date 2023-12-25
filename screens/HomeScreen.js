import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Cell, Section } from 'react-native-tableview-simple';
import * as Haptics from 'expo-haptics';
import { useSettings } from '../components/Contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SelectOption from "../components/QuizSettings.js";
import ProgCard from "../components/ProgCard";
import BottomNav from "../components/bottomNav";

const subjData = [
  {
    "name": "Science",
    "imgUri": require('../assets/science.jpg')
  },
  {
    "name": "Entertainment",
    "imgUri": require('../assets/entertainment.jpg')
  }
]

const topicsData = {
  items: [
    { "title": "Science",
      "contents": [
        {
          "name": "Science & Nature",
          "imgUri": require('../assets/nature.jpg')
        },
        {
          "name": "Science: Computers",
          "imgUri": require('../assets/computer.jpg')
        },
        {
          "name": "Science: Mathematics",
          "imgUri": require('../assets/maths.jpg')
        },
        {
          "name": "Science: Gadgets",
          "imgUri": require('../assets/gadgets.jpg')
        },
    ]},
    { "title": "Entertainment",
      "contents": [
        {
          "name": "Entertainment: Books",
          "imgUri": require('../assets/sciBooks.jpg')
        },
        {
          "name": "Entertainment: Film",
          "imgUri": require('../assets/films.jpg')
        },
        {
          "name": "Entertainment: Music",
          "imgUri": require('../assets/music.jpg')
        },
        {
          "name": "Entertainment: Comics",
          "imgUri": require('../assets/comics.jpg')
        },
]}]}

const pieData = [
  { 
    value: 30,
    svg: { fill: '#E57373' },
    key: 'pie-1',
  },
  {
    value: 45,
    svg: { fill: '#81C784' },
    key: 'pie-2',
  },
  {
    value: 25,
    svg: { fill: '#64B5F6' },
    key: 'pie-3',
  },
];

const barChartData = [
  { label: "Mon", value: 20 },
  { label: "Tue", value: 45 },
  { label: "Wed", value: 30 },
  { label: "Thu", value: 10 },
  { label: "Fri", value: 50 },
];

const lineData = [10, 15, 7, 20, 12, 5]

const SubjCell = (props) => (
  <Cell {...props}
    backgroundColor="transparent"
    highlightUnderlayColor="#ccc"
    
    cellContentView = {
      <View style={[styles.subContainer, styles.shadowStyle]}>
        <Image style={styles.imgStyle} source={props.subjImg}/>
        <Text style={styles.subText}>{props.subjName}</Text>
      </View>
    }
    onPress={props.action}
  />
)

export default function Home({navigation}) {
  const [topics, setTopics] = useState([]);
  const [selectOption, setSelectOption] = useState(null);
  const [uname, setUname] = useState('');

  const { isHaptic } = useSettings();
  const handleTouch = () => {
    if (isHaptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };


  const fetchUser = async () => {
    try {
      const nameOfUser = await AsyncStorage.getItem('user');
      setUname(nameOfUser)
    } catch (error) {
      console.error('Error fetching users name:', error);
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        'https://opentdb.com/api_category.php'
      );
      const subjects = response.data.trivia_categories;
      setTopics(subjects.map(item => item.name))
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchCategories();
  }, []);

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <ScrollView style={{ height: "100%" }}>
          {/* welcoming container */}
          <View style={styles.introContainer}>
            <Text style={styles.helloStyle}>Hello {uname}!</Text>
            <Text style={styles.appStyle}>CHEQUIZ</Text>
          </View>

          <View style = {[styles.searchStyle, styles.shadowStyle]}>
            <SelectOption
              buttonStyle={styles.searchBtn}
              data={topics}
              selectedValue={selectOption}
              onValueChange={(newOption) => {
                navigation.navigate("TakeQuiz", {
                  selectedTopic: newOption
                })
              }}
              defaultButtonText={"Select a topic"}
            />
          </View>

          {/* subjects container */}
          <Text style={styles.titleStyle}>Explore Subjects</Text>
          <Section>
          <View style={{ flexDirection: 'row',  justifyContent: 'center'}}>
            {subjData.map((item, i) => (
              <TouchableOpacity key={i}>
              <SubjCell
                key = {i}
                subjName = {item.name}
                subjImg = {item.imgUri}
                action={() => {
                  handleTouch();
                  navigation.navigate("Topics", {
                  items: topicsData.items,
                  respSub: item.name
                })
                }}
              />
              </TouchableOpacity>
            ))}
          </View>
          </Section>
          <TouchableOpacity
            onPress={() => {
              handleTouch();
              navigation.navigate("All Topics");
            }}
          >
            <Text style={styles.allTopicsText}>All topics → </Text>
          </TouchableOpacity>

          {/* progress container */}
          <View style={{ width: "100%"}}>
            <Text style={styles.titleStyle}>Track Your Progress</Text>
            <View>
              <ProgCard 
                pieData={pieData} 
                barChartData={barChartData} 
                lineData={lineData}
                onPress={() => {
                  handleTouch();
                  navigation.navigate("SubProgress");
                }}
              />
            </View>
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
  introContainer: {
    width: "100%",
    height: "9%",
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  helloStyle: {
    fontSize: 25,
    fontFamily: 'Trebuchet MS',
    color: "#fc6c85",
    marginLeft: "5%",
    marginTop: "5%",
  },
  appStyle: {
    fontSize: 25,
    fontFamily: 'Trebuchet MS',
    color: "#fc6c85",
    marginRight: "5%",
    marginTop: "5%",
  },
  searchStyle: {
    alignItems: 'center',
    shadowColor: '#171717',
    marginTop: "5%",
  },
  searchBtn: {
    width: "98%",
    height: 40,
    marginBottom: "2%",
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  subContainer: {
    width: 150,
    height: 160,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowStyle: {
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  imgStyle: {
    width: 115,
    height: 115,
  },
  subText: {
    fontSize: 18,
    marginTop: 5,
    color: "#000",
  },
  titleStyle: {
    fontSize: 20,
    color: "#000",
    marginLeft: "5%",
    marginTop: "10%",
  },
  allTopicsText: {
    fontSize: 18,
    textAlign: 'right',
    marginRight: "10%",
    textDecorationLine: 'underline',
  },
});







