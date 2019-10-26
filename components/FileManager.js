import React, { useState, useEffect } from 'react';
import FileDisplay from './FileDisplay';
import { DUMMY_FILES } from '../constants/Dummy';
import * as FileSystem from 'expo-file-system';

const FileManager = (props) => {
	const [ files, setFiles ] = useState([]);

	const getDirectory = (uri) => {
		//Need to check to make sure URI is a valid directory
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
				console.log(file);
				tempData.push({
					name: file,
					uri: FileSystem.documentDirectory + file,
					isDirectory: false,
					children: []
					//Eventually add isDirectory
				});
			});
		});
		return tempData;
	};

	const moveFile = async (oldUri, newUri) => {
		const options = {
			from: oldUri,
			to: newUri
		};
		await FileSystem.moveAsync(options);
	};

	useEffect(() => {
		const newFiles = makeFileList(FileSystem.documentDirectory);
		console.log(newFiles);
		setFiles(DUMMY_FILES);
	}, []);

	// useEffect(() =>
	// {
	// 	if(!isRecording)
	// 	{
	// 		pullCache();
	// 	}
	// }, [props.isRecording]);

	return <FileDisplay files={files} getDirectory={getDirectory} getFile={getFile} />;
};

export default FileManager;
