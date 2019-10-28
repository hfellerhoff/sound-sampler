import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

/*
    Accepted props:
        style: Affects the containing view of the button's style
        title: Sets the title of the button
        titleStyle: Affects the button text's style
*/
const Button = (props) => {
	const { style, title, titleStyle } = props;
	return (
		<View style={{ ...styles.button, ...style }}>
			<Text style={{ ...styles.title, ...titleStyle }}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 25,
		paddingVertical: 15,
		margin: 20,
		backgroundColor: Colors.button.background,
		borderRadius: 10,
		...Styles.boxShadow
	},

	title: {
		color: Colors.button.title,
		fontSize: 24,
		fontWeight: '700'
	}
});

export default Button;
