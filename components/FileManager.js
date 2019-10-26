import React, { useState, useEffect } from 'react';
import FileDisplay from './FileDisplay';

const FileManager = (props) => {
	const [ files, setFiles ] = useState([]);

	const getDirectory = (uri) => {
		//Need to check to make sure URI is a valid directory
		return(makeFileList(uri));
	};
	const getFile = async(uri) => {
		//Need to run check to make sure URI is valid 
		//Need to throw exception if invalid
		const soundObject = new Audio.soundO();
		await soundObject.loadAsync({
			uri: FileSystem.documentDirectory + "small.mp4"
		  });
		return soundObject;
	};

	const makeFileList = (uri) => //Default uri is 'FileSystem.documentDirectory'
	{
		let tempData = [];
		await FileSystem.readDirectoryAsync(uri).then(
		  data => {
			data.forEach(file => {
			  tempData.push({
				name: file,
				uri: FileSystem.documentDirectory + file
				//Eventually add isDirectory 
			  });
			});
		  }
		);
		return tempData;
	}

	const moveFile = (oldUri, newUri) =>
	{
		const options = {
			from: oldUri,
			to: newUri
		  };
		  await FileSystem.moveAsync(options);
	}

	useEffect(() => {
		setFiles(makeFileList(FileSystem.documentDirectory));
	}, [])

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
