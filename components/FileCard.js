import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Animated from "react-native-reanimated";
import { SCREEN_WIDTH } from "../constants/Sizes";
import Icons from "../constants/Icons";
import Colors from "../constants/Colors";

const FileCard = ({
  file,
  bottomStyle,
  onPress,
  onLongPress,
  onSwipeRight,
  onSwipeLeft
}) => {
  const { uri, isDirectory } = file;

  const borderColor = isDirectory ? Colors.primary : Colors.gray;
  const image = isDirectory ? Icons.folder : Icons.audio;

  const LeftActions = () => {
    return (
      <View style={styles.leftAction}>
        <Animated.Text style={styles.leftActionText}>Export</Animated.Text>
      </View>
    );
  };

  const RightActions = () => {
    return (
      <View style={styles.rightAction}>
        <Text style={styles.rightActionText}>Delete</Text>
      </View>
    );
  };

  return (
    <>
      <View style={{ marginTop: 10 }} />
      <Swipeable
        renderLeftActions={LeftActions}
        renderRightActions={RightActions}
        onSwipeableLeftWillOpen={() => onSwipeRight(uri, isDirectory)}
        onSwipeableRightWillOpen={() => onSwipeLeft(uri)}
      >
        <View>
          <TouchableWithoutFeedback
            onPress={() => onPress(uri, isDirectory)}
            delayPressIn={100}
            onLongPress={() => onLongPress(uri)}
          >
            <View style={[styles.item, { borderColor }]}>
              <Image source={image} style={styles.image} />
              <Text style={styles.itemText}>{file.name}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Swipeable>
      <View style={bottomStyle} />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    height: "auto",
    padding: 10,
    width: SCREEN_WIDTH - 20,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.13,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "flex-start",
    borderWidth: 2,
    flexDirection: "row"
  },
  itemText: {
    marginLeft: 10,
    flex: 1,
    alignSelf: "center"
  },
  image: {
    height: 20,
    width: 20
  },
  leftAction: {
    backgroundColor: Colors.fileLeftAction,
    justifyContent: "center",
    alignSelf: "center",
    left: 10,
    width: SCREEN_WIDTH - 20,
    height: "100%",
    borderRadius: 10
  },
  rightAction: {
    backgroundColor: Colors.fileRightAction,
    justifyContent: "center",
    alignSelf: "center",
    right: -10,
    width: SCREEN_WIDTH - 20,
    height: "100%",
    borderRadius: 10,
    alignItems: "flex-end"
  },
  leftActionText: {
    color: "white",
    paddingHorizontal: 10,
    fontWeight: "600"
  },
  rightActionText: {
    color: "white",
    paddingHorizontal: 10,
    fontWeight: "600"
  }
});

export default FileCard;
