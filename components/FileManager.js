<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import FileDisplay from "./FileDisplay";
import { DUMMY_FILES } from "../constants/Dummy";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const FileManager = props => {
  const [files, setFiles] = useState([]);

  const testFunction = async () => {};

  const changeName = async (oldUri, newName) => {
    for (const file of files) {
      if (oldUri === file.uri) {
        let newTo = oldUri.replace(file.name, "");
        const options = {
          from: oldUri,
          to: newTo + newName
        };

        await FileSystem.copyAsync(options).then(() => {
          FileSystem.deleteAsync(oldUri).then(() => {
            updateFiles();
          });
        });
      }
    }
  };

  const getDirectory = uri => {
    return makeFileList(uri);
  };

  const getFile = async soundUri => {
    const soundObject = new Audio.soundO();
    await soundObject.loadAsync({
      uri: soundUri
    });
    return soundObject;
  };

  const createDirectory = async (uri, name) => {
    console.log("Making directory:" + uri + name);
    await FileSystem.makeDirectoryAsync(uri + name);
  };

  const makeFileList = async (
    uri //Default uri is 'FileSystem.documentDirectory'
  ) => {
    let tempData = [];
    await FileSystem.readDirectoryAsync(uri).then(async data => {
      for (const file of data) {
        await FileSystem.getInfoAsync(FileSystem.documentDirectory + file).then(
          async fileInfo => {
            tempData.push({
              name: file,
              uri: FileSystem.documentDirectory + file,
              isDirectory: fileInfo.isDirectory
            });
          }
        );
      }
    });
    return tempData;
  };

  const deleteAllFiles = async () => {
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(data => {
      for (const file of data) {
        FileSystem.deleteAsync(FileSystem.documentDirectory + file);
      }
    });
  };

  const deleteFile = async uri => {
    await FileSystem.deleteAsync(uri);
    setTimeout(() => updateFiles(), 250);
  };

  const moveFile = async (oldUri, newUri) => {
    const options = {
      from: oldUri,
      to: newUri
    };
    await FileSystem.moveAsync(options);
  };

  const updateFiles = async () => {
    await makeFileList(FileSystem.documentDirectory).then((
      newFiles //props.currentDirectory
    ) => setFiles(newFiles));
  };

  const pullCache = async currentDirectory => {
    const audioDirectoryName = Platform.OS === "ios" ? "AV/" : "Audio/";
    const directoryName = FileSystem.cacheDirectory + audioDirectoryName;

    await FileSystem.readDirectoryAsync(directoryName).then(data => {
      for (const file of data) {
        moveFile(directoryName + file, currentDirectory + file).then(() => {
          updateFiles();
        });
      }
    });
  };

  useEffect(() => {
    updateFiles();
    props.setIsLoading();
    // testFunction();
  }, []); //props.currentDirectory

  useEffect(() => {
    if (props.shouldCreateNewDirectory) {
      createDirectory(
        props.newDirectoryInformation.uri,
        props.newDirectoryInformation.name
      );
      updateFiles();
      props.onDirectoryCreate();
    }
  }, [props.shouldCreateNewDirectory]);

  useEffect(() => {
    if (!props.isRecording) {
      pullCache(props.currentDirectory);
    }
  }, [props.isRecording]);

  return (
    <FileDisplay
      files={files}
      getDirectory={getDirectory}
      getFile={getFile}
      deleteFile={deleteFile}
      currentDirectory={props.currentDirectory}
      setCurrentDirectory={props.setCurrentDirectory}
    />
  );
=======
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import FileDisplay from './FileDisplay';
import { DUMMY_FILES } from '../constants/Dummy';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const FileManager = (props) => {
	const [ files, setFiles ] = useState([]);

	const testFunction = async () => {};

	const changeName = async (oldUri, newName) => {
		for (const file of files) {
			if (oldUri === file.uri) {
				let newTo = oldUri.replace(file.name, '');
				const options = {
					from: oldUri,
					to: newTo + newName
				};

				await FileSystem.copyAsync(options).then(() => {
					FileSystem.deleteAsync(oldUri).then(() => {
						updateFiles();
					});
				});
			}
		}
	};

	const getDirectory = (uri) => {
		return makeFileList(uri);
	};

	const getFile = async (soundUri) => {
		const soundObject = new Audio.soundO();
		await soundObject.loadAsync({
			uri: soundUri
		});
		return soundObject;
	};

	const createDirectory = async (uri, name) => {
		console.log(uri + name);
		await FileSystem.makeDirectoryAsync(uri + name);
	};

	const makeFileList = async (
		uri //Default uri is 'FileSystem.documentDirectory'
	) => {
		let tempData = [];
		await FileSystem.readDirectoryAsync(uri).then(async (data) => {
			for (const file of data) {
				await FileSystem.getInfoAsync(FileSystem.documentDirectory + file).then(async (fileInfo) => {
					tempData.push({
						name: file,
						uri: FileSystem.documentDirectory + file,
						isDirectory: fileInfo.isDirectory
					});
				});
			}
		});
		return tempData;
	};

	const deleteAllFiles = async () => {
		FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then((data) => {
			for (const file of data) {
				FileSystem.deleteAsync(FileSystem.documentDirectory + file);
			}
		});
	};

	const deleteFile = async (uri) => {
		await FileSystem.deleteAsync(uri);
		setTimeout(() => updateFiles(), 250);
	};

	const moveFile = async (oldUri, newUri) => {
		const options = {
			from: oldUri,
			to: newUri
		};
		await FileSystem.moveAsync(options);
	};

	const updateFiles = async () => {
		await makeFileList(props.currentDirectory).then((newFiles) => setFiles(newFiles));
	};

	const pullCache = async (currentDirectory) => {
		const audioDirectoryName = Platform.OS === 'ios' ? 'AV/' : 'Audio/';
		const directoryName = FileSystem.cacheDirectory + audioDirectoryName;

		await FileSystem.readDirectoryAsync(directoryName).then((data) => {
			for (const file of data) {
				moveFile(directoryName + file, currentDirectory + file).then(() => {
					updateFiles();
				});
			}
		});
	};

	useEffect(
		() => {
			updateFiles();
			props.setIsLoading();
			// testFunction();
		},
		[ props.currentDirectory ]
	);

	useEffect(
		() => {
			if (props.shouldCreateNewDirectory) {
				createDirectory(props.newDirectoryInformation.uri, props.newDirectoryInformation.name);
				updateFiles();
				props.onDirectoryCreate();
			}
		},
		[ props.shouldCreateNewDirectory ]
	);

	useEffect(
		() => {
			if (!props.isRecording) {
				pullCache(props.currentDirectory);
			}
		},
		[ props.isRecording ]
	);

	return (
		<FileDisplay
			files={files}
			getDirectory={getDirectory}
			getFile={getFile}
			deleteFile={deleteFile}
			currentDirectory={props.currentDirectory}
			setCurrentDirectory={props.setCurrentDirectory}
		/>
	);
>>>>>>> 061d70f385b5ef96f74c2b29b7b7e25e2cc3bb62
};
export default FileManager;
