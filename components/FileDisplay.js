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
		await getDirectory(uri).then((directoryFiles) => {
			for (const file of directoryFiles) {
				newFiles.push(file);
			}
		});
		console.log(newFiles);
		const parentDirectory = getParentDirectory(uri);
		console.log('Parent Directory: ' + parentDirectory);
		setCurrentParentDirectory(parentDirectory);
		console.log('Requested Directory: ' + uri);
		setDisplayedFiles(newFiles);
	};

	const onRequestDeleteFile = async (uri) => {
		deleteFile(uri);
	};

	const getAbleToMoveToParentDirectory = (index) => {
		if (displayedFiles[index] && displayedFiles[index] !== null && displayedFiles[index] !== undefined) {
			return displayedFiles[index].uri === currentParentDirectory ? true : false;
		} else {
			return false;
		}
	};

	const getCard = (item, index) => {
		let marginStyle = {};
		if (displayedFiles.length - 1 === index) {
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
				ableToMoveToParentDirectory={getAbleToMoveToParentDirectory(index)}
			/>
		);
	};

	const getPageContent = (item, index) => {
		if (displayedFiles.length > 0) {
			return (
				<FlatList
					style={styles.list}
					data={displayedFiles}
					renderItem={({ item, index }) => getCard(item, index)}
					keyExtractor={(file) => file.uri}
				/>
			);
		} else {
			return <Text style={[ styles.list, styles.errorText ]}>No files found. Start recording to add some!</Text>;
		}
	};

	useEffect(
		() => {
			setDisplayedFiles(files);
		},
		[ files ]
	);

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
