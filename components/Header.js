import React from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image
} from "react-native";
import { STATUS_BAR_HEIGHT, SCREEN_WIDTH } from "../constants/Sizes";
import Colors from "../constants/Colors";
import Icons from "../constants/Icons";

const Header = ({ title, onPress, onGoBack }) => {
  const image =
    title === "Files" ? (
      <></>
    ) : (
      <Image source={Icons.rightCaret} style={styles.caret} />
    );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar} />
      <View style={{ backgroundColor: Colors.primary }}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={onGoBack}>
            <View style={styles.titleContainer}>
              {image}
              <Text style={styles.title}>{title}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity style={styles.imageButton} onPress={onPress}>
            <Image source={Icons.addFolder} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const statusBarHeight = STATUS_BAR_HEIGHT;
const styles = StyleSheet.create({
  statusBar: {
    marginTop: -statusBarHeight,
    height: statusBarHeight + (Platform.OS === "android" ? 10 : 0),
    backgroundColor: Colors.primary
  },
  container: {
    marginTop: Platform.OS === "android" ? 24 : 0,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.26,
    elevation: 5
  },

  header: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row"
  },

  titleContainer: {
    marginLeft: 15,
    marginBottom: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },

  title: {
    color: "#eee",
    fontWeight: "bold",
    fontSize: 36,
    flex: 1
  },

  imageButton: {
    alignItems: "center",
    justifyContent: "center"
  },

  image: {
    height: 30,
    width: 30,
    marginRight: 15,
    marginTop: Platform.OS === "android" ? 12 : 3
  },

  caret: {
    height: 25,
    width: 25,
    marginRight: 5,
    marginTop: 3
  }
});
