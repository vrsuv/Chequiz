import React, {useState} from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Haptics from 'expo-haptics';
import { useSettings } from '../components/Contexts';
import { useNavigation } from "@react-navigation/native";

const BottomNav = () => {
  const navigation = useNavigation();
  
  const { isHaptic } = useSettings();
  const handleTouch = () => {
    if (isHaptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            handleTouch();
            navigation.navigate("Home");
          }}
        >
          <Image
            source={require("../assets/home.png")}
            style={{ height: 25, width: null }}
            resizeMode="contain"
            resizeMethod="resize"
          />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            handleTouch();
            navigation.navigate("All Topics");
          }}
        >
          <Image
            source={require("../assets/book.png")}
            style={{ height: 25, width: null }}
            resizeMode="contain"
            resizeMethod="resize"
          />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            handleTouch();
            navigation.navigate("SubProgress");
          }}
        >
          <Image
            source={require("../assets/perfIcon.jpeg")}
            style={{ height: 28, width: null }}
            resizeMode="contain"
            resizeMethod="resize"
          />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            handleTouch();
            navigation.navigate("Settings");
          }}
        >
          <Image
            source={require("../assets/settings.png")}
            style={{ height: 30, width: null }}
            resizeMode="contain"
            resizeMethod="resize"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "9%",
    backgroundColor: "#fff",
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    justifyContent: 'space-around',
  },
});