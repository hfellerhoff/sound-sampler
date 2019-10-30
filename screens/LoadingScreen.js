import React, { useEffect, useState } from "react";

import { StyleSheet, Text, StatusBar } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { useTransition, bInterpolate } from "react-native-redash";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/Sizes";

const image = require("../assets/EmptyLogo.png");

const LoadingScreen = ({ isVisible, isAnimating, onAnimateOut }) => {
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

  useEffect(() => {
    setTimeout(() => {
      setChangeLoop(!changeLoop);
    }, 1000);
  }, [changeLoop]);

  // KNOWN ANDROID ISSUE: Image opacity does not fade as quickly as
  // the background's. A simple fix may be to just get a background
  // image that is only a PNG with no background.
  const opacityTransitionTiming = 500;
  const opacityTransition = useTransition(
    isVisible,
    isVisible ? 0 : 1,
    isVisible ? 1 : 0,
    opacityTransitionTiming,
    Easing.inOut(Easing.ease)
  );
  const opacity = bInterpolate(opacityTransition, 1, 0);
  const opacityStyle = { opacity };

  useEffect(() => {
    if (!isVisible) setTimeout(() => onAnimateOut(), opacityTransitionTiming);
  }, [isVisible]);

  if (isVisible || isAnimating) {
    return (
      <Animated.View style={{ ...styles.background, ...opacityStyle }}>
        <StatusBar barStyle="light-content" />
        <Animated.Image
          style={[styles.image, innerTransitionStyle]}
          source={image}
        />
        <Text style={styles.text}>EARWORM</Text>
      </Animated.View>
    );
  }
  return <></>;
};

const imageSize = SCREEN_WIDTH / 1.25;
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    top: 0,
    left: 0,
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
    // fontFamily: "Arial", // Commented because it needs to be loaded with Font.loadAsync()
    textAlign: "center",
    letterSpacing: 5
  }
});
export default LoadingScreen;
