import React from 'react';

import { View, StyleSheet, Image, Text } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants/Sizes';

const LoadingScreen = (props) => {
	return (
		<View style={styles.background}>
			<Image style={styles.image} source={require('../assets/EmptyLogo.jpg')} />
			<Text style={styles.text}>EARWORM</Text>
		</View>
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
		fontFamily: 'Liu Jian Mao Cao',
		cursive,
		textAlign: 'center',
		letterSpacing: 5
	}
});
export default LoadingScreen;
