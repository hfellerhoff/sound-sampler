import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

const Button = (props) => {
	return (
		<TouchableOpacity onPress={() => props.onPress(props.title)}>
			<View style={{ ...styles.button, ...props.style }}>
				<Text style={styles.title}>{props.title}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 25,
		paddingVertical: 15,
		margin: 20,
		backgroundColor: Colors.primary,
		borderRadius: 10,
		elevation: 10,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.26
	},

	title: {
		color: 'white',
		fontSize: 24,
		fontWeight: '700'
	}
});

export default Button;
