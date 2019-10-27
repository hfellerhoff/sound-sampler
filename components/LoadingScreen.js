import React, { useEffect, useState} from 'react';

import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants/Sizes';
import Animated, { Easing } from 'react-native-reanimated'
import { useTransition, bInterpolate } from "react-native-redash";
// atan2(<Image style={styles.image} source={require('../assets/Innerpulse.jpg')} />, 
//  		<Image style={styles.image} source={require('../assets/outerPulse.jpg')} />);

const LoadingScreen = ({ onPress }) => {
	const [changeLoop, setChangeLoop] = useState(false);

	const keyboardTransition = useTransition(
		changeLoop,
		changeLoop ? 0 : 1,
		changeLoop ? 1 : 0,
		1000,
		Easing.inOut(Easing.ease)
	);
	const innerImageWidth = bInterpolate(keyboardTransition, 1.1 * SCREEN_WIDTH / 1.25, SCREEN_WIDTH / 1.25);
	const innerImageHeight = bInterpolate(keyboardTransition, 1.1 * 1.5 * SCREEN_WIDTH / 1.25, 1.5 * SCREEN_WIDTH / 1.25);
	const innerTransitionStyle = {
		width: innerImageWidth,
		height: innerImageHeight,
	}

	// const outerImageScale = bInterpolate(keyboardTransition, SCREEN_WIDTH / 1.25, 1.1 * SCREEN_WIDTH / 1.25);
	// const outerTransitionStyle = {
	// 	width: outerImageScale,
	// 	height: outerImageScale,
	// }

	useEffect(() => {
		setTimeout(() => {
			setChangeLoop(!changeLoop)
		}, 1000);
	}, [changeLoop])

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.background}>
					<Animated.Image style={[styles.image, innerTransitionStyle]} source={require('../assets/EmptyLogo.jpg')} />
					{/* <Animated.Image style={[styles.image, outerTransitionStyle]} source={require('../assets/outerpulse.jpg')} /> */}
				
				<Text style={styles.text}>EARWORM</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

const imageSize = SCREEN_WIDTH / 1.25;
const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '#000000',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20
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
		position: 'absolute',
		top: SCREEN_HEIGHT / 2 - 48,
		left: 0,
		right: 0,
		color: '#02fffe',
		fontSize: 18,
		fontWeight: '400',
		fontFamily: 'Arial',
		textAlign: 'center',
		letterSpacing: 5
	}
});
export default LoadingScreen;
