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
    onDirectoryCreate,
    requestRename,
    fileRenameInformation,
    shouldRenameFile,
    onRenameFile,
    playbackInformation,
    setPlaybackInformation,
    requestPlayback
  } = props;

  const exportData = async uri => {
    FileController.exportData(uri);
  };

  // const changeName = async (oldUri, newName) => {
  //   FileController.changeFilename(oldUri, newName);
  //   setTimeout(() => updateFiles(), 50); // This is a workaround, as await doesn't work - look into Promises
  // };

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

  const onFinishedRecording = async () => {
    FileController.moveCacheToDirectory(currentDirectory).then(() =>
      updateFiles()
    );
  };

  const createDirectory = async information => {
    FileController.createDirectory(information.uri, information.name);
    onDirectoryCreate();
    updateFiles();
  };

  const renameFile = async information => {
    onRenameFile();
    await FileController.changeFilename(information.uri, information.name);
    updateFiles();
  };

  useEffect(() => {
    if (shouldCreateNewDirectory) createDirectory(newDirectoryInformation);
  }, [shouldCreateNewDirectory]);

  useEffect(() => {
    if (shouldRenameFile) renameFile(fileRenameInformation);
  }, [shouldRenameFile]);

  useEffect(() => {
    if (!isRecording) onFinishedRecording();
  }, [isRecording]);

  useEffect(() => {
    updateFiles();
  }, [currentDirectory]);

  return (
    <FileDisplay
      files={files}
      getDirectory={getDirectory}
      deleteFile={deleteFile}
      currentDirectory={currentDirectory}
      setCurrentDirectory={setCurrentDirectory}
      exportData={exportData}
      isRecording={isRecording}
      setIsRecording={setIsRecording}
      requestRename={requestRename}
      playbackInformation={playbackInformation}
      setPlaybackInformation={setPlaybackInformation}
      requestPlayback={requestPlayback}
    />
  );
};
export default FileManager;
