import React, { useState, useEffect } from 'react';

import { StyleSheet, View, FlatList, Platform, Text } from 'react-native';
import { SCREEN_WIDTH, getStatusBarHeight, isiPhoneX } from '../constants/Sizes';
import FileCard from './FileCard';
import * as FileSystem from 'expo-file-system';

import { getParentDirectory, getNameFromUri } from '../util/Parser';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Sample from './Sample';
import RenameModal from './RenameModal';

const FileDisplay = (props) => {
	const {
		files,
		getDirectory,
		deleteFile,
		currentDirectory,
		setCurrentDirectory,
		moveFile,
		exportData,
		getFile,
		movingOptions,
		setMovingOptions
	} = props;
	const [ displayedFiles, setDisplayedFiles ] = useState(props.files);
	const [ sampleVisible, setSampleVisible ] = useState(false);

	const onRequestDirectory = async (uri) => {
		const newFiles = [];
		await getDirectory(uri).then((directoryFiles) => {
			for (const file of directoryFiles) {
				newFiles.push(file);
			}
		});
		console.log(newFiles);
		setCurrentDirectory(uri + '/');
		console.log('Requested Directory: ' + uri);
		setDisplayedFiles(newFiles);
	};

	const onRequestDeleteFile = async (uri) => {
		console.log(uri);
		deleteFile(uri);
	};

	const onRequestMoveFile = async (uri) => {
		console.log(uri);
		exportData(uri);
		// setMovingOptions({
		// 	areMoving: true,
		// 	fromUri: uri,
		// 	toUri: null
		// });
		// setCurrentDirectory(FileSystem.documentDirectory);
		// alert('Transitioning into moving mode');
	};

	const onDismiss = () => {
		setSelectedUri(null);
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
				moveFile={onRequestMoveFile}
				currentDirectory={currentDirectory}
				setSelectedUri={setSelectedUri}
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

	useEffect(
		() => {
			if (selectedUri) {
				// alert('Sample visible');
				console.log(selectedUri);
				setSampleVisible(true);
			} else {
				// alert('Sample not visible');
				console.log(selectedUri);
				setSampleVisible(false);
			}
		},
		[ selectedUri ]
	);

	const getSound = async () => {
		if (selectedUri) return getFile(selectedUri);
		else return null;
	};

	return (
		<View styles={styles.container}>
			{getPageContent()}
			<RenameModal isVisible={selectedUri ? true : false} dismiss={onDismiss} />
			{/* <Sample sound={getSound()} /> */}
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
	},
	errorText: {
		marginTop: 20,
		fontSize: 16,
		textAlign: 'center',
		color: '#333'
	}
});

export default FileDisplay;
