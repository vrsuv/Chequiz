import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // firebase authentication
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        navigation.navigate("Home", {
          name: username,
        });
      })
      .catch(error => alert(error.message))
  }

  const storeUser = async (name) => {
    try {
      await AsyncStorage.setItem('user', name);
      console.log(`user's name saved`);
    } catch (e) {
      console.log('Error saving users name: ', e)
    }
  };

  return (
    <View>
      <View style={styles.inputContainer}>
      <Text style = {{ color: '#000', fontSize: 20, margin: 30 }}>Welcome back!</Text>
        <Text style = {styles.textStyle}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          placeholder={"User name"}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize={"none"}
        />
        <Text style = {styles.textStyle}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          placeholder={"Password"}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          autoCapitalize={"none"}
        />
        <Text style = {[styles.textStyle, {marginLeft: "-5%"}]}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholder={"Email"}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize={"none"}
        />
      </View>
      <View style={{ justifyContent: "center", flex: 1, padding: 30 }}>
        <TouchableOpacity 
          style={styles.loginBtn}
          onPress={() => {
            storeUser(username);
            if (handleLogin()) {
              navigation.navigate("Home", {
              name: username
            })}
          }}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  textStyle: {
    fontSize: 15,
    color: '#000',
    marginRight: '60%',
  },
  input: {
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
    margin: 10,
    borderWidth: 0.5,
    color: '#000',
    borderColor: "grey",
    borderRadius: 10,
    width: 300,
  },
  loginBtn: {
    width: "100%",
    marginTop: "10%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffc0cb",
  },
  btnText: {
    fontSize: 15,
    color: "#000",
  },
});
