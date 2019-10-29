import React from "react";

import {
  View,
  Text,
  StyleSheet,
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
    <View style={styles.container}>
      <View style={styles.statusBar} />
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={onGoBack}>
          <View style={styles.titleContainer}>
            {image}
            <Text style={styles.title}>{title}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View>
          <TouchableOpacity onPress={onPress}>
            <Image source={Icons.addFolder} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

const statusBarHeight = STATUS_BAR_HEIGHT;
const styles = StyleSheet.create({
  statusBar: {
    height: statusBarHeight,
    backgroundColor: Colors.primary
  },
  container: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.26,
    elevation: 5
  },
  header: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 5
  },

  titleContainer: {
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

  image: {
    height: 30,
    width: 30
  },

  caret: {
    height: 25,
    width: 25,
    marginRight: 5,
    marginTop: 3
  }
});
