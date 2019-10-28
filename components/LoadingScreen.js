import React, { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  StatusBar
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { useTransition, bInterpolate } from "react-native-redash";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/Sizes";

const image = require("../assets/EmptyLogo.jpg");

const LoadingScreen = ({ onPress, isLoading }) => {
  const [changeLoop, setChangeLoop] = useState(false);

  const keyboardTransition = useTransition(
    changeLoop,
    changeLoop ? 0 : 1,
    changeLoop ? 1 : 0,
    1000,
    Easing.inOut(Easing.ease)
  );
  const innerImageWidth = bInterpolate(
    keyboardTransition,
    (1.1 * SCREEN_WIDTH) / 1.25,
    SCREEN_WIDTH / 1.25
  );
  const innerImageHeight = bInterpolate(
    keyboardTransition,
    (1.1 * 1.5 * SCREEN_WIDTH) / 1.25,
    (1.5 * SCREEN_WIDTH) / 1.25
  );
  const innerTransitionStyle = {
    width: innerImageWidth,
    height: innerImageHeight
  };

  // const outerImageScale = bInterpolate(keyboardTransition, SCREEN_WIDTH / 1.25, 1.1 * SCREEN_WIDTH / 1.25);
  // const outerTransitionStyle = {
  // 	width: outerImageScale,
  // 	height: outerImageScale,
  // }

  useEffect(() => {
    setTimeout(() => {
      setChangeLoop(!changeLoop);
    }, 1000);
  }, [changeLoop]);

  if (isLoading) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.background}>
          <StatusBar barStyle="light-content" />
          <Animated.Image
            style={[styles.image, innerTransitionStyle]}
            source={image}
          />
          {/* <Animated.Image style={[styles.image, outerTransitionStyle]} source={require('../assets/outerpulse.jpg')} /> */}

          <Text style={styles.text}>EARWORM</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return <></>;
};

const imageSize = SCREEN_WIDTH / 1.25;
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    // position: "absolute",
    top: 0,
    left: 0,
    // left: (SCREEN_WIDTH - imageSize * 1.1) / 2,
    width: imageSize,
    height: imageSize * 1.5
  },
  text: {
    position: "absolute",
    top: SCREEN_HEIGHT / 2 - 35,
    left: 10,
    right: 0,
    color: "#02fffe",
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "Arial",
    textAlign: "center",
    letterSpacing: 5
  }
});
export default LoadingScreen;
