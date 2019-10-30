import React, { useState } from "react";

import { View, StyleSheet, Text } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Colors from "../../constants/Colors";
import { SCREEN_WIDTH } from "../../constants/Sizes";
import interpolate from "../../util/Interpolater";

const { Value, event, sub, Extrapolate, cond, eq, call } = Animated;

const Slider = props => {
  const { width, lineStyle, circleStyle } = props;

  const sliderWidth = width || SCREEN_WIDTH / 1.5;
  const sliderMargin = (SCREEN_WIDTH - sliderWidth) / 2;
  const sliderLowerBound = sliderMargin;
  const sliderUpperBound = SCREEN_WIDTH - sliderMargin - 30;

  const [value, setValue] = useState(0);
  const [absoluteX] = useState(new Value(sliderMargin));
  const [gestureState] = useState(new Value(-1));

  const onGestureEvent = event([
    {
      nativeEvent: {
        absoluteX,
        state: gestureState
      }
    }
  ]);

  const clampedAbsoluteX = absoluteX.interpolate({
    inputRange: [sliderLowerBound, sliderUpperBound],
    outputRange: [sliderLowerBound, sliderUpperBound],
    extrapolate: Extrapolate.CLAMP
  });

  const onRelease = absX => {
    const v = interpolate(absX, sliderLowerBound, sliderUpperBound);
    setValue(v);
  };

  return (
    <>
      <Text>{value}</Text>
      <View style={{ ...styles.line, ...lineStyle, width: sliderWidth }}>
        <Animated.Code>
          {() =>
            cond(
              eq(gestureState, State.ACTIVE),
              call([clampedAbsoluteX], onRelease)
            )
          }
        </Animated.Code>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onGestureEvent}
        >
          <Animated.View
            style={[
              styles.circle,
              circleStyle,
              {
                left: sub(clampedAbsoluteX, sliderMargin)
              }
            ]}
          />
        </PanGestureHandler>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 3,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    alignContent: "center",
    justifyContent: "center"
  }
});

export default Slider;
