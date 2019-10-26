import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const audio = require('../assets/ios-icons/audio-wave.png');
const folder = require('../assets/ios-icons/folder.png');

const FileCard = ({ file }) => {
	const { uri, name, isDirectory } = file;

	const borderColor = isDirectory ? 'blue' : 'gray';
	const image = isDirectory ? folder : audio;

	return (
		<View>
			<TouchableOpacity
				onPress={() =>
					alert(
						`File Name: ${name}, File URI: ${uri}, isDirectory: ${isDirectory}, borderColor: ${borderColor} `
					)}
			>
				<View style={[ styles.item, { borderColor: borderColor } ]}>
					<Image source={image} style={styles.image} />
					<Text style={styles.itemText}>{file.name}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	item: {
		height: 'auto',
		padding: 10,
		marginBottom: 10,
		width: '90%',
		backgroundColor: '#fff',
		elevation: 3,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.13,
		borderRadius: 10,
		alignSelf: 'center',
		justifyContent: 'flex-start',
		borderWidth: 2,
		flexDirection: 'row'
	},
	itemText: {
		marginLeft: 10
	},
	image: {
		height: 20,
		width: 20
	}
});

export default FileCard;
