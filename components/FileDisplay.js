import React from 'react';

import { StyleSheet, View, FlatList, Platform, Text } from 'react-native';
import { SCREEN_WIDTH, getStatusBarHeight, isiPhoneX } from '../constants/Sizes';
import FileCard from './FileCard';

const FileDisplay = (props) => {
	const { files } = props;

	const getPageContent = () => {
		if (files.length > 0) {
			return (
				<FlatList
					style={styles.list}
					data={files}
					renderItem={({ item }) => <FileCard file={item} />}
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
