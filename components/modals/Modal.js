import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";

import Animated, { Easing } from "react-native-reanimated";
import { bInterpolate, useTransition } from "react-native-redash";

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  BOTTOM_BAR_HEIGHT
} from "../../constants/Sizes";

/*
	Props to provide:
	@boolean isVisisble: If the modal should be visible or not
	@func onDismiss: The function the modal should call when isVisible becomes false
	@ui children: The UI elements to place inside of the modal
*/

const animationTiming = 200;
const Modal = props => {
  const { isVisible, onDismiss, children } = props;

  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [keyboardDidShowListener, setKeyboardDidShowListener] = useState(null);
  const [keyboardDidHideListener, setKeyboardDidHideListener] = useState(null);

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const keyboardTransition = useTransition(
    isKeyboardShown,
    isKeyboardShown ? 0 : 1,
    isKeyboardShown ? 1 : 0,
    animationTiming,
    Easing.inOut(Easing.ease)
  );
  const visibleTransition = useTransition(
    isVisible,
    isVisible ? 0 : 1,
    isVisible ? 1 : 0,
    animationTiming,
    Easing.inOut(Easing.ease)
  );

  const marginBottom = bInterpolate(keyboardTransition, keyboardHeight, 0);
  const opacity = bInterpolate(visibleTransition, 0.25, 0);
  const bottom = bInterpolate(visibleTransition, 0, -300);

  const modalTransitionStyle = { marginBottom };
  const backgroundTransitionStyle = { opacity };
  const bottomTransitionStyle = { bottom };

  const onKeyboardShow = e => {
    setKeyboardHeight(e.endCoordinates.height);
    setIsKeyboardShown(true);
  };
  const onKeyboardHide = () => {
    setIsKeyboardShown(false);
  };

  const onBackgroundTap = () => {
    if (!isKeyboardShown) onDismiss();
    else Keyboard.dismiss();
  };

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      setKeyboardDidShowListener(
        Keyboard.addListener("keyboardWillShow", onKeyboardShow)
      );
      setKeyboardDidHideListener(
        Keyboard.addListener("keyboardWillHide", onKeyboardHide)
      );
      // alert('Keyboard listeners created.');
    }

    if (!isVisible && keyboardDidShowListener && keyboardDidHideListener) {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      // alert('Keyboard listeners removed.');
    }

    if (!isVisible) {
      setTimeout(() => {
        setIsAnimating(false);
        setIsKeyboardShown(false);
      }, animationTiming);
    }
  }, [isVisible]);

  if (isVisible || isAnimating) {
    return (
      <View style={styles.fullScreen}>
        <TouchableWithoutFeedback onPress={onBackgroundTap}>
          <Animated.View
            style={{ ...styles.background, ...backgroundTransitionStyle }}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.container,
            ...bottomTransitionStyle,
            ...modalTransitionStyle
          }}
        >
          {children}
          <View style={{ height: BOTTOM_BAR_HEIGHT }} />
        </Animated.View>
      </View>
    );
  }

  return <></>;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingBottom: 30,
    paddingTop: 30,
    width: SCREEN_WIDTH,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,

    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.26,
    elevation: 5
  },

  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },

  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "black",
    opacity: 0.25
  },

  inputTitle: {
    fontSize: 24,
    color: "gray",
    marginBottom: 20
    // alignSelf: 'flex-start',
    // marginLeft: 10
  },

  input: {
    width: SCREEN_WIDTH / 1.5,
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 3,
    borderRadius: 10,
    color: "#333",
    fontSize: 20,
    textAlign: "center"
  }
});

export default Modal;
