import React from 'react';

import { StyleSheet, View, FlatList, Platform, Text } from 'react-native';
import { SCREEN_WIDTH, getStatusBarHeight, isiPhoneX } from '../constants/Sizes';
import { DUMMY_FILES } from '../constants/Dummy';
import FileCard from './FileCard';

const FileDisplay = (props) => {
	return (
		<View styles={styles.container}>
			<FlatList
				style={styles.list}
				data={DUMMY_FILES}
				renderItem={({ item }) => <FileCard file={item} />}
				keyExtractor={(file) => file.uri}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	list: {
		flex: 1,
		width: SCREEN_WIDTH,
		marginTop: 0
	}
});

export default FileDisplay;
