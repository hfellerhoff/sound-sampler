import React from 'react';

import { StyleSheet, View, FlatList, Platform, Text } from 'react-native';
import { SCREEN_WIDTH, getStatusBarHeight, isiPhoneX } from '../constants/Sizes';
import FileCard from './FileCard';

const FileDisplay = (props) => {
	const { files } = props;

	const getCard = (item, index) => {
		let bottomStyle = {};
		if (files.length - 1 === index) {
			if (isiPhoneX())
				bottomStyle = {
					marginBottom: 214
				};
			else if (Platform.OS === 'ios') bottomStyle = { marginBottom: 180 };
			else bottomStyle = { marginBottom: 190 };
		}
		return <FileCard style={bottomStyle} file={item} />;
	};

	const getPageContent = (item, index) => {
		if (files.length > 0) {
			return (
				<FlatList
					style={styles.list}
					data={files}
					renderItem={({ item, index }) => getCard(item, index)}
					keyExtractor={(file) => file.uri}
				/>
			);
		} else {
			return <Text style={[ styles.list, styles.errorText ]}>No files found. Start recording to add some!</Text>;
		}
	};

	return <View styles={styles.container}>{getPageContent()}</View>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	list: {
		flex: 1,
		width: SCREEN_WIDTH,
		marginTop: 0
	},
	errorText: {
		marginTop: 20,
		fontSize: 16,
		textAlign: 'center',
		color: '#333'
	}
});

export default FileDisplay;
