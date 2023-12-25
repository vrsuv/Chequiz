import React, { useEffect } from "react";
import Intro from "./screens/IntroScreen.js";
import SignUp from "./screens/SignUp.js";
import Login from "./screens/Login.js";
import Home from "./screens/HomeScreen";
import TakeQuiz from "./screens/TakeQuiz.js";
import Topics from "./screens/TopicsScreen";
import AllTopics from "./screens/AllTopicsScreen";
import Quiz from "./screens/QuizScreen";
import Results from "./screens/ResultsScreen.js";
import Progress from "./screens/ProgScreen.js";
import SubProgScreen from "./screens/SubProgScreen.js";
import Settings from "./screens/SettingsScreen.js";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { SetSettings } from './components/Contexts.js';

const Stack = createStackNavigator();
const App = () => {
  return (
    <>
    <SetSettings>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          <Stack.Screen name="TakeQuiz" component={TakeQuiz} options={{ headerShown: false }}/>
          <Stack.Screen name="Topics" component={Topics} options={{ headerShown: false }}/>
          <Stack.Screen name="All Topics" component={AllTopics} options={{ headerShown: false }}/>
          <Stack.Screen name="Quiz" component={Quiz} options={{ headerShown: false }}/>
          <Stack.Screen name="Results" component={Results} options={{ headerShown: false }}/>
          <Stack.Screen name="Progress" component={Progress} options={{ headerShown: false }}/>
          <Stack.Screen name = "SubProgress" component={SubProgScreen} options={{ headerShown: false }}/>
          <Stack.Screen name = "Settings" component={Settings} options={{ headerShown: false }}/>
          
        </Stack.Navigator>
      </NavigationContainer>
    </SetSettings>
    </>
  );
};

export default App;


