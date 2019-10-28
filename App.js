import React, { useState } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import * as FileSystem from "expo-file-system";
import FileManager from "./components/FileManager";
import Recorder from "./components/Recorder";
import Header from "./components/Header";
import LoadingScreen from "./components/LoadingScreen";
import {
  getNameFromUri,
  getParentDirectory,
  parseFilename
} from "./util/Parser";
import Colors from "./constants/Colors";
import TextInputModal from "./components/modals/TextInputModal";

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [showNewDirectoryModal, setShowNewDirectoryModal] = useState(false);
  const [shouldCreateNewDirectory, setShouldCreateNewDirectory] = useState(
    false
  );
  const [newDirectoryInformation, setNewDirectoryInformation] = useState({});

  const [currentDirectory, setCurrentDirectory] = useState(
    FileSystem.documentDirectory
  );
  // const [ movingOptions, setMovingOptions ] = useState({
  // 	areMoving: false,
  // 	fromUri: null,
  // 	toUri: null
  // });
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
      // alert(FileSystem.documentDirectory);
      // alert(getParentDirectory(currentDirectory));
    }
  };

  const getHeaderTitle = () => {
    if (currentDirectory === FileSystem.documentDirectory) return "Files";
    return getNameFromUri(currentDirectory);
  };

  // const onFileMove = () => {
  // 	alert('onFileMove');
  // 	setMovingOptions({
  // 		areMoving: true,
  // 		toUri: currentDirectory,
  // 		fromUri: movingOptions.fromUri
  // 	});
  // };

  const onFileManagerFinishedLoading = () => {
    // () => setIsLoading(false)
  };

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
        setIsLoading={onFileManagerFinishedLoading}
        currentDirectory={currentDirectory}
        setCurrentDirectory={setCurrentDirectory}
        selectedUri={selectedUri}
        setSelectedUri={setSelectedUri}
      />
      {/* {selectedUri ? (
        <></>
      ) : (
        <Recorder isRecording={isRecording} setIsRecording={setIsRecording} />
      )} */}
      <TextInputModal
        title="New Directory"
        description="Enter a name for the new directory."
        buttonTitle="Create"
        isVisible={showNewDirectoryModal}
        onDismiss={onCreateDirectoryAttempt}
      />
      <LoadingScreen
        isLoading={isLoading}
        onPress={() => setIsLoading(false)}
      />
    </View>
  );
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

export default App;
