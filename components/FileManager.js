import React, { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import FileDisplay from "./FileDisplay";
import FileController from "../util/FileController";

const waitTime = 50;

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
    FileController.exportData(uri);
  };

  const changeName = async (oldUri, newName) => {
    FileController.changeFilename(oldUri, newName, files);
    setTimeout(() => updateFiles(), waitTime); // await doesn't work - look into Promises
  };

  const getDirectory = uri => {
    return FileController.fetchFilesFrom(uri);
  };

  const deleteFile = async uri => {
    FileController.deleteFile(uri); // await doesn't work - look into Promises
    setTimeout(() => updateFiles(), 250);
  };

  const updateFiles = async () => {
    await FileController.fetchFilesFrom(currentDirectory).then(newFiles =>
      setFiles(newFiles)
    );
  };

  const pullCache = async directoryUri => {
    FileController.moveCacheToDirectory(directoryUri).then(() => updateFiles());
  };

  useEffect(() => {
    updateFiles();
    props.setIsLoading();
  }, [currentDirectory]);

  useEffect(() => {
    if (props.shouldCreateNewDirectory) {
      FileSystem.createDirectory(
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
      getFile={FileController.fetchAndPlaySoundFile}
      deleteFile={deleteFile}
      moveFile={FileController.moveFile}
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
