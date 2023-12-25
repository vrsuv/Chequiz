import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Intro = ({ navigation }) => {
  const [guestBtn, setGuestBtn] = useState(false);
  const [nickname, setNickname] = useState('');

  const handleGuestBtn = () => {
    setGuestBtn(true);
  };

  const setName = (text) => {
    setNickname(text);
  };

  const storeUser = async (name) => {
    try {
      await AsyncStorage.setItem('user', name);
      console.log('nickname saved');
    } catch (e) {
      console.log('Error saving users name: ', e)
    }
  };

  return (
    <View style={{ flex: 1, alignContent: 'center' }}>
      <ImageBackground
        resizeMode="cover"
        source={require("../assets/quiz-background.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
        <Text style = {styles.appName}>CHEQUIZ</Text>
          {!guestBtn && (
          <>
            <TouchableOpacity
              style={[styles.credBtn, styles.shadowStyle]}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
            <Text style={styles.btnText}>SIGN UP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.credBtn, styles.shadowStyle]}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.btnText}>LOGIN</Text>
            </TouchableOpacity>
          </>
          )}

          {!guestBtn ? (
            <TouchableOpacity
              style={styles.guestBtn}
              onPress={() => {
                handleGuestBtn();
              }}
            >
              <Text style={styles.guestText}>GUEST</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Text style={styles.guestText}>Enter a Nickname!</Text>
              
              <TextInput
                style={[styles.guestTextInput, styles.shadowStyle]}
                placeholder="Enter a nickname"
                value={nickname}
                onChangeText={setName}
              />
              <TouchableOpacity
                style={styles.guestBtn}
                onPress={() => {
                  storeUser(nickname);
                  navigation.navigate("Home", {
                    name: nickname
                  })
                }}
              >
                <Text style={styles.guestText}>Continue as Guest</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30 ,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  appName: {
    fontSize: 35,
    fontFamily: 'Trebuchet MS',
    marginBottom: 30,
    color: "#fff",
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  credBtn: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    backgroundColor: '#ffc0cb',
  },
  btnText: {
    fontSize: 15,
    color: "#000",
  },
  guestBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 300,
  },
  guestText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  guestTextInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  shadowStyle: {
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
