import React, { useState, useEffect } from "react";
import FileDisplay from "./FileDisplay";
import FileController from "../util/FileController";

const FileManager = props => {
  const [files, setFiles] = useState([]);
  const {
    currentDirectory,
    setCurrentDirectory,
    isRecording,
    setIsRecording,
    shouldCreateNewDirectory,
    newDirectoryInformation,
    selectedUri,
    setSelectedUri,
    onDirectoryCreate,
    setIsLoading
  } = props;

  const exportData = async uri => {
    FileController.exportData(uri);
  };

  const changeName = async (oldUri, newName) => {
    FileController.changeFilename(oldUri, newName, files);
    setTimeout(() => updateFiles(), 50); // This is a workaround, as await doesn't work - look into Promises
  };

  const getDirectory = uri => {
    return FileController.fetchFilesFrom(uri);
  };

  const deleteFile = async uri => {
    FileController.deleteFile(uri);
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
    setIsLoading();

    if (shouldCreateNewDirectory) {
      FileController.createDirectory(
        newDirectoryInformation.uri,
        newDirectoryInformation.name
      );
      onDirectoryCreate();
    }

    updateFiles();
  }, [currentDirectory, shouldCreateNewDirectory]);

  useEffect(() => {
    if (!isRecording) pullCache(currentDirectory);
  }, [isRecording]);

  return (
    <FileDisplay
      files={files}
      getDirectory={getDirectory}
      deleteFile={deleteFile}
      currentDirectory={currentDirectory}
      setCurrentDirectory={setCurrentDirectory}
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
