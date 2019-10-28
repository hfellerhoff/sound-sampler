import React, { useState, useEffect } from 'react';
import { Audio, Video } from 'expo-av';
import Sample from './Sample';
import Button from './basic/CustomButton';
import { Icon } from 'expo/build/removed.web';
import { Image, View } from 'react-native-reanimated';
const TimeStamp = (props) => {
	//const ICON_POSITION = new Icon(require('../assets/ios-icons/'), 20, 14);
	const { sound } = props;
	const millis = sound.positionMillis;
	const getMMSSFromMillis = (props) => {
		const { millis } = props;
		const totalSeconds = millis / 1000;
		const seconds = Math.floor(totalSeconds % 60);
		const minutes = Math.floor(totalSeconds / 60);

		const padWithZero = (number) => {
			const string = number.toString();
			if (number < 10) {
				return '0' + string;
			}
			return string;
		};
		return padWithZero(minutes) + ':' + padWithZero(seconds);
	};
	return (
		//needs work but hopefully work as a basic concept
		<View style={styles}>
			<h3>{getMMSSFromMillis(millis)}</h3>
		</View>
	);
};
/* I will let someone else do the animations because I am a loser
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
 */
const styles = StyleSheet.create({
	border: {
		position: 'absolute',
		bottom: 20,
		width: 75,
		height: 75,
		borderColor: 'gray',
		borderWidth: 3,
		borderRadius: 40,
		alignItems: 'center',
		justifyContent: 'center',
		transform: [ { translateX: -(75 / 2) } ]
	},

	button: {
		width: 60,
		height: 60,
		backgroundColor: 'red',
		borderRadius: 30
	},
	image: {
		//adjust the image (though Brianna and Alexa will probably do their own illustrations
	}
});

export default TimeStamp;
