import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import * as FileSystem from "expo-file-system";
import FileManager from "../components/FileManager";
import Header from "../components/Header";
import { getNameFromUri, getParentDirectory } from "../util/Parser";
import Colors from "../constants/Colors";
import TextInputModal from "../components/modals/TextInputModal";

const FileScreen = ({ isVisible, onDoneLoading }) => {
  // Handle general app state
  const [isRecording, setIsRecording] = useState(false);
  const [currentDirectory, setCurrentDirectory] = useState(
    FileSystem.documentDirectory
  );

  // Handle directory creation
  const [newDirectoryInformation, setNewDirectoryInformation] = useState({});
  const [showNewDirectoryModal, setShowNewDirectoryModal] = useState(false);
  const [shouldCreateNewDirectory, setShouldCreateNewDirectory] = useState(
    false
  );

  // Handle file renaming
  const [fileRenameInformation, setFileRenameInformation] = useState({});
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [shouldRenameFile, setShouldRenameFile] = useState(false);

  // Directory creation
  const onCreateDirectoryAttempt = name => {
    setShowNewDirectoryModal(false);
    if (name) {
      setNewDirectoryInformation({
        name,
        uri: currentDirectory
      });
      setShouldCreateNewDirectory(true);
    }
  };

  const onDirectoryCreate = () => {
    setNewDirectoryInformation({});
    setShouldCreateNewDirectory(false);
  };

  // File renaming
  const onShowRenameModal = uri => {
    setFileRenameInformation({
      uri,
      name: null
    });
    setShowRenameModal(true);
  };

  const onRenameAttempt = newName => {
    setShowRenameModal(false);
    if (newName) {
      setFileRenameInformation({
        uri: fileRenameInformation.uri,
        name: newName
      });
      setShouldRenameFile(true);
    }
  };

  const onRenameComplete = () => {
    setFileRenameInformation(null);
    setShouldRenameFile(false);
  };

  // Handle moving back a directory
  const onMoveBackDirectory = () => {
    if (currentDirectory !== FileSystem.documentDirectory) {
      setCurrentDirectory(`${getParentDirectory(currentDirectory)}/`);
    }
  };

  // Get the header title
  const getHeaderTitle = () => {
    if (currentDirectory === FileSystem.documentDirectory) return "Files";
    return getNameFromUri(currentDirectory);
  };

  // Handle the loading screen
  useEffect(() => {
    setTimeout(() => onDoneLoading(), 500);
  }, []);

  if (isVisible) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header
          title={getHeaderTitle()}
          onPress={() => setShowNewDirectoryModal(true)}
          onGoBack={onMoveBackDirectory}
        />
        <FileManager
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          shouldCreateNewDirectory={shouldCreateNewDirectory}
          newDirectoryInformation={newDirectoryInformation}
          onDirectoryCreate={onDirectoryCreate}
          onDoneLoading={onDoneLoading}
          currentDirectory={currentDirectory}
          setCurrentDirectory={setCurrentDirectory}
          requestRename={onShowRenameModal}
          fileRenameInformation={fileRenameInformation}
          shouldRenameFile={shouldRenameFile}
          onRenameFile={onRenameComplete}
        />
        <TextInputModal
          title="New Directory"
          description="Enter a name for the new directory."
          buttonTitle="Create"
          isVisible={showNewDirectoryModal}
          onDismiss={onCreateDirectoryAttempt}
        />
        <TextInputModal
          title="Rename File"
          description="Enter a new name for the file."
          buttonTitle="Submit"
          isVisible={showRenameModal}
          onDismiss={onRenameAttempt}
        />
      </View>
    );
  }
  return <></>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white
  }
});

export default FileScreen;
