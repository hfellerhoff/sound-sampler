import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Audio } from "expo-av";
import FileDisplay from "./FileDisplay";
import { parseFilename } from "../util/Parser";

const FileManager = props => {
  const [files, setFiles] = useState([]);
  const {
    currentDirectory,
    setCurrentDirectory,
    isRecording,
    setIsRecording,
    shouldCreateNewDirectory,
    selectedUri,
    setSelectedUri
  } = props;

  const exportData = async uri => {
    Sharing.shareAsync(uri);
  };

  const changeName = async (oldUri, newName) => {
    const audioType = Platform.OS === "ios" ? ".caf" : ".m4a";
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      if (oldUri === file.uri) {
        const newTo = oldUri.replace(file.name, "");
        // eslint-disable-next-line no-await-in-loop
        const fileInfo = await FileSystem.getInfoAsync(file.uri);

        let parsedName;
        if (!fileInfo.isDirectory)
          parsedName = parseFilename(newName, audioType);
        else parsedName = parseFilename(newName);

        const options = {
          from: oldUri,
          to: newTo + parsedName
        };

        // eslint-disable-next-line no-await-in-loop
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
    const soundObject = new Audio.Sound();
    soundObject.setVolumeAsync(1);

    await soundObject
      .loadAsync({
        uri: soundUri
      })
      .then(() => {
        soundObject.playAsync();
      });
  };

  const createDirectory = async (uri, name) => {
    await FileSystem.makeDirectoryAsync(uri + name);
  };

  const makeFileList = async (
    uri // Default uri is 'FileSystem.documentDirectory'
  ) => {
    const tempData = [];
    await FileSystem.readDirectoryAsync(uri).then(async data => {
      // eslint-disable-next-line no-restricted-syntax
      for (const file of data) {
        // eslint-disable-next-line no-await-in-loop
        await FileSystem.getInfoAsync(currentDirectory + file).then(
          async fileInfo => {
            tempData.push({
              name: file,
              uri: currentDirectory + file,
              isDirectory: fileInfo.isDirectory
            });
          }
        );
      }
    });
    return tempData;
  };

  //   const deleteAllFiles = async () => {
  //     FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(data => {
  //       for (const file of data) {
  //         FileSystem.deleteAsync(FileSystem.documentDirectory + file);
  //       }
  //     });
  //   };

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
    await makeFileList(currentDirectory).then(newFiles => setFiles(newFiles));
  };

  const pullCache = async directory => {
    const audioDirectoryName = Platform.OS === "ios" ? "AV/" : "Audio/";
    const directoryName = FileSystem.cacheDirectory + audioDirectoryName;

    await FileSystem.readDirectoryAsync(directoryName).then(data => {
      data.forEach(file => {
        moveFile(directoryName + file, directory + file).then(() => {
          updateFiles();
        });
      });
    });
  };

  useEffect(() => {
    updateFiles();
    props.setIsLoading();
    // testFunction();
  }, [currentDirectory]); // currentDirectory

  useEffect(() => {
    if (props.shouldCreateNewDirectory) {
      createDirectory(
        props.newDirectoryInformation.uri,
        props.newDirectoryInformation.name
      );
      updateFiles();
      props.onDirectoryCreate();
    }
  }, [shouldCreateNewDirectory]);

  useEffect(() => {
    if (!props.isRecording) {
      pullCache(currentDirectory);
    }
  }, [isRecording]);

  return (
    <FileDisplay
      files={files}
      getDirectory={getDirectory}
      getFile={getFile}
      deleteFile={deleteFile}
      moveFile={moveFile}
      currentDirectory={currentDirectory}
      setCurrentDirectory={setCurrentDirectory}
      // movingOptions={movingOptions}
      // setMovingOptions={setMovingOptions}
      exportData={exportData}
      changeName={changeName}
      selectedUri={selectedUri}
      setSelectedUri={setSelectedUri}
      isRecording={isRecording}
      setIsRecording={setIsRecording}
    />
  );
};
export default FileManager;
