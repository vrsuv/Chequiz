import React, {useState, useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  Button, 
  Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSettings } from '../components/Contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import he from 'he';
import moment from 'moment';

const Quiz = ({ navigation, route }) => {  
  const {selectedTopic, diffLevel, qnsNumber, time} = route.params;
  const [subID, setSubID] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [correctAns, setCorrectAns] = useState([]);
  const [allOptions, setAllOptions] = useState([]);
  const [currentQuesIndex, setCurrentQuesIndex] = useState(0);
  const [marks, setMarks] = useState(0);
  const [ansClicked, setAnsClicked] = useState(null);

  const [quizTime] = useState(time * 60);
  const [timeLeft, setTimeLeft] = useState(quizTime);
  const [isTimer, setIsTimer] = useState(true);
  const [timeTaken, setTimeTaken] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const currentDay = moment().format('dddd'); 

  const { isHaptic } = useSettings();
  const handleTouch = () => {
    if (isHaptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  useEffect(() => {
    resetMarks();
  }, []);

  const fetchCategoriesID = async () => {
    try {
      const response = await axios.get('https://opentdb.com/api_category.php');
      const categoriesRes = response.data.trivia_categories;
      const selectedCategory = categoriesRes.find(category => category.name.includes(selectedTopic));
      if (selectedCategory) {
        setSubID(selectedCategory.id);
      } else {
        console.log(`'${selectedTopic}' was not found.`);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchQuestions = async (subID, qnsNumber, diffLevel) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://opentdb.com/api.php?amount=${qnsNumber}&category=${subID}&difficulty=${diffLevel}&type=multiple`);
      // get questions
      const questionsList = response.data.results.map(result => he.decode(result.question));
      if (questionsList) {
        setQuestions(questionsList);
      } else {
        console.log(`${selectedTopic} has no questions`);
      }

      // get correct answer
      const correct_answer = response.data.results.map(result => he.decode(result.correct_answer));
      if (correct_answer) {
        setCorrectAns(correct_answer);
      } else {
        console.log('correct answers error: ', error);
      }

      // get wrong answers
      const wrong_answers = response.data.results.map(result => {
        const decoded_answers = result.incorrect_answers.map(item => he.decode(item));
        return decoded_answers;
      });
      
      // combine answers
      allAnsChoices(wrong_answers, correct_answer);
      setIsLoading(false);
    } catch (error) {
      console.log('questions cant be fetched: ', error)
    }
  }

  // combine and shuffle correct and wrong options
  const allAnsChoices = async (wrong_answer, correct_answer) => {
    correct_answer.map((correct, index) => {
      wrong_answer[index].push(correct);
    })
    const all_options = wrong_answer
    all_options.map((item, index) => {
      all_options[index].sort(() => Math.random() - 0.5);
    })
    setAllOptions(all_options);
  }
  
  useEffect(() => {
    fetchCategoriesID();
    if (subID !== 0) {
      fetchQuestions(subID, qnsNumber, diffLevel);
    }
  }, [subID]);
  
  const saveQuizReport = async (day, marks) => {
    try {
      const quizKey = `${selectedTopic}_${day}`;
      const prevMarks = await AsyncStorage.getItem(quizKey)
      let quizMarksArray = prevMarks ? JSON.parse(prevMarks) : [];

      // reset after 5 attempts
      if (quizMarksArray.length >= 5) {
        quizMarksArray = [];
      }
      quizMarksArray.push(marks);

      await AsyncStorage.setItem(`${selectedTopic}_${day}`, JSON.stringify(quizMarksArray));
    } catch (error) {
      console.error('Error saving marks to AsyncStorage:', error);
    }
  };

  const nextQuestion = () => {
    if (currentQuesIndex < questions.length - 1) {
      setCurrentQuesIndex(currentQuesIndex + 1);
      setAnsClicked(null)
    } 
  };

  const checkAns = (selectedAns, rightAns) => {
    let newMarks = marks;
    if (ansClicked !== null) {
      return;
    } else {
      if (selectedAns === rightAns) {
        newMarks += 1;
      }
    }
    setMarks(newMarks);
    setAnsClicked(selectedAns); 
  };

  const resetMarks = () => {
    try {
      setMarks(0);
    } catch (error) {
      console.error('Error resetting marks:', error);
    }
  };

  const exitQuiz = () => {
    Alert.alert(
      'Are you sure?',
      'Exiting the quiz will not save your marks.',
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    if (!isLoading) {
      if (timeLeft > 0 && isTimer) {
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000); // every 1 sec, timer goes down by 1 sec

        return () => {
          clearInterval(timer);
          setTimeTaken(quizTime - timeLeft);
        };
      } else if (timeLeft <= 1) {
        setIsTimer(false); // stops the timer from going below 0
        if (marks > 0) {
          setMarks(0);
          saveQuizReport(currentDay, 0);
          submitQuiz();
        }
      } 
    }
  }, [isLoading, timeLeft, isTimer]);

  const countdown = (timeLeft) => {
    const mins = Math.floor(timeLeft / 60);
    const secs = (timeLeft % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  const submitQuiz = () => {
    navigation.navigate("Results", {
      totalQues: questions,
      selectedTopic: selectedTopic,
      marks: marks,
      timeTaken: timeTaken,
      quizTime: quizTime
    });
    resetMarks();
  };

  return (
    <SafeAreaView style={{height: "100%", backgroundColor: '#ffc0cb'}}>
    <View style = {styles.container}>
      <Text>Topic: {selectedTopic}</Text>
      <Text>Time Remaining: {countdown(timeLeft)}</Text>

        <View style={[styles.questionContainer, styles.shadowStyle]}>
          <Text style = {{fontSize: 15}}>Question: {currentQuesIndex + 1}/{questions.length}</Text>
          {isLoading ? (
            <Text style = {styles.questionText}>Loading...</Text>
          ) : (
            <Text style = {styles.questionText}>{questions[currentQuesIndex]}</Text>
          )}
          
          {allOptions[currentQuesIndex]?.map((option, index) => (
            <TouchableOpacity 
              style={[
                styles.optionsText,
                ansClicked === option && correctAns[currentQuesIndex] === option && { backgroundColor: 'green' },
                ansClicked === option && !correctAns.includes(option) && { backgroundColor: 'red' },
                ansClicked && correctAns[currentQuesIndex] === option && { backgroundColor: 'green' }
              ]}
              key={index}
              onPress={() => {
                handleTouch();
                checkAns(option, correctAns[currentQuesIndex]);
              }}
            >
              <Text style = {{fontSize: 18}}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      <View style = {styles.exitButtonStyle}>
        <Button
          title="Exit quiz"
          onPress = {() => {
            handleTouch();
            exitQuiz();
          }}
        />
      </View>
      <View style={styles.nextStyle}>
      {currentQuesIndex < questions.length - 1 ? ( 
      <Button
        title="Next"
        onPress={() => {
          handleTouch();
          nextQuestion();
        }}
        disabled={ansClicked === null}
      />
    ) : ( 
      <Button
        title="Submit"
        onPress={() => {
          handleTouch();
          submitQuiz();
          saveQuizReport(currentDay, marks);
        }}
        disabled={ansClicked === null}
      />
    )}
    </View>
    </View>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#ffc0cb'
  },
  shadowStyle: {
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  questionContainer: {
    width: "100%",
    height: "80%",
    marginTop: "5%",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  optionsText: {
    height: "7%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffc0cb',
    borderRadius: 10,
    margin: 5,
  },
  exitButtonStyle: {
    width: 100,
    flexDirection: 'column',
    position: 'absolute',
    top: "60%",
    left: "2%"
  },
  nextStyle: {
    flexDirection: 'column',
    width: 100,
    position: 'absolute',
    top: "60%",
    right: "2%"
  },
});

export default Quiz;






