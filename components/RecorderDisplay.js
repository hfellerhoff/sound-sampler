import React from 'react';
import Animated, { Easing } from 'react-native-reanimated';
import { bInterpolate, useTransition } from 'react-native-redash';

import { View, TouchableWithoutFeedback, StyleSheet, Platform } from 'react-native';
import { BOTTOM_BAR_HEIGHT } from '../constants/Sizes';
import Colors from '../constants/Colors';

const RecordingButton = (props) => {
	const { isRecording, onPress } = props;

	const transition = useTransition(
		isRecording,
		isRecording ? 0 : 1,
		isRecording ? 1 : 0,
		200,
		Easing.inOut(Easing.ease)
	);

	const size = bInterpolate(transition, 25, 60);
	const borderRadius = bInterpolate(transition, 2.5, 30);

	const buttonTransitionStyle = {
		width: size,
		height: size,
		borderRadius: borderRadius
	};

	return (
		<View>
			<TouchableWithoutFeedback onPress={onPress}>
				<Animated.View style={styles.border}>
					<Animated.View style={[ styles.button, buttonTransitionStyle ]} />
				</Animated.View>
			</TouchableWithoutFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	border: {
		position: 'absolute',
		bottom: BOTTOM_BAR_HEIGHT * 2 + 90 + (Platform.OS === 'android' ? 10 : 0),
		width: 75,
		height: 75,
		borderColor: Colors.recordingButtonBorder,
		borderWidth: 3,
		borderRadius: 40,
		alignItems: 'center',
		justifyContent: 'center',
		transform: [ { translateX: -(75 / 2) } ],
		backgroundColor: Colors.recordingButtonBackground
	},

	button: {
		width: 60,
		height: 60,
		backgroundColor: Colors.recordingButton,
		borderRadius: 30
	}
});

export default RecordingButton;
