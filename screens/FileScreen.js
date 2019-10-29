import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import * as FileSystem from "expo-file-system";
import FileManager from "../components/FileManager";
import Header from "../components/Header";
import {
  getNameFromUri,
  getParentDirectory,
  parseFilename
} from "../util/Parser";
import Colors from "../constants/Colors";
import TextInputModal from "../components/modals/TextInputModal";

const FileScreen = ({ isVisible, onDoneLoading }) => {
  const [isRecording, setIsRecording] = useState(false);

  const [showNewDirectoryModal, setShowNewDirectoryModal] = useState(false);
  const [shouldCreateNewDirectory, setShouldCreateNewDirectory] = useState(
    false
  );
  const [newDirectoryInformation, setNewDirectoryInformation] = useState({});

  const [currentDirectory, setCurrentDirectory] = useState(
    FileSystem.documentDirectory
  );

  const [selectedUri, setSelectedUri] = useState(null);

  const onCreateDirectoryAttempt = name => {
    setShowNewDirectoryModal(false);
    const parsedName = parseFilename(name);
    if (parsedName) {
      setNewDirectoryInformation({
        name: parsedName,
        uri: currentDirectory
      });
      setShouldCreateNewDirectory(true);
    }
  };

  const onDirectoryCreate = () => {
    setNewDirectoryInformation({});
    setShouldCreateNewDirectory(false);
  };

  const onMoveBackDirectory = () => {
    if (currentDirectory !== FileSystem.documentDirectory) {
      setCurrentDirectory(`${getParentDirectory(currentDirectory)}/`);
    }
  };

  const getHeaderTitle = () => {
    if (currentDirectory === FileSystem.documentDirectory) return "Files";
    return getNameFromUri(currentDirectory);
  };

  useEffect(() => {
    setTimeout(() => onDoneLoading(), 1000);
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
          selectedUri={selectedUri}
          setSelectedUri={setSelectedUri}
        />
        <TextInputModal
          title="New Directory"
          description="Enter a name for the new directory."
          buttonTitle="Create"
          isVisible={showNewDirectoryModal}
          onDismiss={onCreateDirectoryAttempt}
        />
        {/* <LoadingScreen
            isLoading={isLoading}
            onPress={() => setIsLoading(false)}
          /> */}
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
