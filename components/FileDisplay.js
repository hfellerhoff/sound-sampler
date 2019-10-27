import React, { useState, useEffect } from 'react';

import { StyleSheet, View, FlatList, Platform, Text } from 'react-native';
import { SCREEN_WIDTH, getStatusBarHeight, isiPhoneX } from '../constants/Sizes';
import FileCard from './FileCard';

import { getParentDirectory, getNameFromUri } from '../util/Parser';

const FileDisplay = (props) => {
	const { files, getDirectory, deleteFile, currentParentDirectory, setCurrentParentDirectory } = props;
	const [ displayedFiles, setDisplayedFiles ] = useState(props.files);

	const onRequestDirectory = async (uri) => {
		const newFiles = [
			{
				uri: uri,
				name: getNameFromUri(uri),
				isDirectory: true
			}
		];
		newFiles.push(await getDirectory(uri));
		setCurrentParentDirectory(getParentDirectory(uri));
		console.log('Requested Directory: ' + uri);
		console.log('Parent Directory: ' + getParentDirectory(uri));
		setDisplayedFiles(newFiles);
	};

	const onRequestDeleteFile = async (uri) => {
		deleteFile(uri);
	};

	const getFiles = () => (displayedFiles.length > 0 ? displayedFiles : files);

	const getCard = (item, index) => {
		let marginStyle = {};
		if (getFiles().length - 1 === index) {
			if (isiPhoneX())
				marginStyle = {
					marginBottom: 214
				};
			else if (Platform.OS === 'ios') marginStyle = { marginBottom: 180 };
			else marginStyle = { marginBottom: 190 };
		}
		return (
			<FileCard
				bottomStyle={marginStyle}
				file={item}
				requestDirectory={onRequestDirectory}
				deleteFile={onRequestDeleteFile}
				moveFile={() => alert('Move file!')}
				currentParentDirectory={currentParentDirectory}
				ableToMoveToParentDirectory={
					displayedFiles !== undefined ? getParentDirectory(displayedFiles[index].uri) ===
					currentParentDirectory ? (
						true
					) : (
						false
					) : (
						false
					)
				}
			/>
		);
	};

	const getPageContent = (item, index) => {
		if (getFiles().length > 0) {
			return (
				<FlatList
					style={styles.list}
					data={getFiles()}
					renderItem={({ item, index }) => getCard(item, index)}
					keyExtractor={(file) => file.uri}
				/>
			);
		} else {
			return <Text style={[ styles.list, styles.errorText ]}>No files found. Start recording to add some!</Text>;
		}
	};

	useEffect(() => {
		setDisplayedFiles(files);
	}, []);

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
