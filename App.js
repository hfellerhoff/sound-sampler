import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import FileManager from "./components/FileManager";
import Recorder from "./components/Recorder";
import Header from "./components/Header";
import NewDirectoryModal from "./components/NewDirectoryModal";
import * as FileSystem from "expo-file-system";
import LoadingScreen from "./components/LoadingScreen";

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [showNewDirectoryModal, setShowNewDirectoryModal] = useState(false);
  const [shouldCreateNewDirectory, setShouldCreateNewDirectory] = useState(
    false
  );
  const [newDirectoryInformation, setNewDirectoryInformation] = useState({});

  const [currentParentDirectory, setCurrentParentDirectory] = useState(
    FileSystem.documentDirectory
  );

  const onCreateDirectoryAttempt = name => {
    setShowNewDirectoryModal(false);
    // alert(`Desired Directory Location: ${FileSystem.documentDirectory + currentParentDirectory + name}`);
    if (name && name !== "") {
      setNewDirectoryInformation({
        name: name,
        uri: currentParentDirectory
      });
      console.log(currentParentDirectory);
      setShouldCreateNewDirectory(true);
    }
  };

  const onDirectoryCreate = () => {
    setNewDirectoryInformation({});
    setShouldCreateNewDirectory(false);
  };

  if (isLoading) return <LoadingScreen onPress={() => setIsLoading(false)} />;
  else
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header title="Files" onPress={() => setShowNewDirectoryModal(true)} />
        <FileManager
          isRecording={isRecording}
          shouldCreateNewDirectory={shouldCreateNewDirectory}
          newDirectoryInformation={newDirectoryInformation}
          onDirectoryCreate={onDirectoryCreate}
          setIsLoading={() => setIsLoading(false)}
          currentParentDirectory={currentParentDirectory}
          setCurrentParentDirectory={setCurrentParentDirectory}
        />
        <Recorder isRecording={isRecording} setIsRecording={setIsRecording} />
        <NewDirectoryModal
          isVisible={showNewDirectoryModal}
          dismiss={onCreateDirectoryAttempt}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center"
  },
  border: {
    position: "absolute",
    bottom: 20,
    width: 75,
    height: 75,
    borderColor: "gray",
    borderWidth: 3,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateX: -(75 / 2) }]
  },

  button: {
    width: 60,
    height: 60,
    backgroundColor: "red",
    borderRadius: 30
  }
});

export default App;
