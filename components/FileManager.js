import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import FileDisplay from './FileDisplay';
import { DUMMY_FILES } from '../constants/Dummy';
import * as FileSystem from 'expo-file-system';

const FileManager = (props) => {
	const [ files, setFiles ] = useState([]);

	const getDirectory = (uri) => {
		return makeFileList(uri);
	};
	const getFile = async (uri) => {
		//Need to run check to make sure URI is valid
		//Need to throw exception if invalid
		const soundObject = new Audio.soundO();
		await soundObject.loadAsync({
			uri: FileSystem.documentDirectory + 'small.mp4'
		});
		return soundObject;
	};

	const makeFileList = async (
		uri //Default uri is 'FileSystem.documentDirectory'
	) => {
		let tempData = [];
		await FileSystem.readDirectoryAsync(uri).then((data) => {
			data.forEach((file) => {
				tempData.push({
					name: file,
					uri: FileSystem.documentDirectory + file,
					isDirectory: false
					//Eventually add isDirectory
				});
			});
		});
		return tempData;
	};

	const deleteAllFiles = async () => {
		FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then((data) => {
			data.forEach((file) => {
				FileSystem.deleteAsync(FileSystem.documentDirectory + file);
			});
		});
	};

	const deleteFile = async (uri) => {
		FileSystem.deleteAsync(uri);
	};

	const moveFile = async (oldUri, newUri) => {
		const options = {
			from: oldUri,
			to: newUri
		};
		console.log(`Moving file at ${oldUri} to ${newUri}`);
		await FileSystem.moveAsync(options);
	};

	const updateFiles = async () => {
		await pullCache().then(() => {
			makeFileList(FileSystem.documentDirectory)
				.then((newFiles) => setFiles(newFiles))
				.catch((error) => alert(error));
		});
	};

	useEffect(() => {
		updateFiles();
	}, []);

	const pullCache = async () => {
		const audioDirectoryName = Platform.OS === 'ios' ? 'AV/' : 'Audio/';
		const directoryName = FileSystem.cacheDirectory + audioDirectoryName;

		await FileSystem.readDirectoryAsync(directoryName).then((data) => {
			data.forEach((file) => {
				moveFile(directoryName + file, FileSystem.documentDirectory + file);
			});
		});
	};

	useEffect(
		() => {
			if (!props.isRecording) {
				updateFiles();
			}
		},
		[ props.isRecording ]
	);

	return <FileDisplay files={files} getDirectory={getDirectory} getFile={getFile} />;
};

export default FileManager;
