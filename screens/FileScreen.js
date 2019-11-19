import React, { useState, useEffect } from "react";
import { View, StatusBar } from "react-native";
import * as FileSystem from "expo-file-system";
import FileManager from "../components/FileManager";
import Header from "../components/Header";
import { getNameFromUri, getParentDirectory } from "../util/Parser";
import TextInputModal from "../components/modals/TextInputModal";
import FileController from "../util/FileController";
import PlaybackModal from "../components/modals/PlaybackModal";
import Styles from "../constants/Styles";
import Colors from "../constants/Colors";

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

  // Handle file playing
  const [playbackInformation, setPlaybackInformation] = useState({
    uri: null,
    sound: null,
    shouldPlay: false,
    isLooping: false,
    volume: 1,
    positionMillis: 0
  });
  const [showPlaybackModal, setShowPlaybackModal] = useState(false);

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

  // File playback
  const onShowPlaybackModal = async uri => {
    setShowPlaybackModal(true);
    const sound = await FileController.fetchSoundFile(uri);
    setPlaybackInformation({
      uri,
      sound,
      shouldPlay: false
    });
  };
  const onPlaybackAttempt = () => {
    setPlaybackInformation({
      uri: playbackInformation.uri,
      sound: playbackInformation.sound,
      shouldPlay: true
    });
  };
  const onPlaybackAttemptLooping = () => {
      setPlaybackInformation({
        uri: playbackInformation.uri,
        sound: playbackInformation.sound,
        isLooping: true,
        shouldPlay: true,
      });
    };
  const onPlaybackAttemptFastForward = () => {
    setPlaybackInformation({
      uri: playbackInformation.uri,
      sound: playbackInformation.sound,
      positionMillis: playbackInformation.positionMillis += 2000,
      shouldPlay: true,
    });
  };
  const onPlaybackAttemptRewind = () => {
    setPlaybackInformation({
      uri: playbackInformation.uri,
      sound: playbackInformation.sound,
      positionMillis: playbackInformation.positionMillis -= 2000,
      shouldPlay: true,
    });
  };
  const onPlaybackModalDismiss = () => {
    setPlaybackInformation({
      uri: null,
      sound: null,
      shouldPlay: false
    });
    setShowPlaybackModal(false);
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
    setTimeout(() => onDoneLoading(), 1000);
  }, []);

  if (isVisible) {
    return (
      <View
        style={[Styles.transparentContainer, { backgroundColor: Colors.white }]}
      >
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
          playbackInformation={playbackInformation}
          setPlaybackInformation={setPlaybackInformation}
          requestPlayback={onShowPlaybackModal}
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
        <PlaybackModal
          isVisible={showPlaybackModal}
          onPlaybackAttempt={onPlaybackAttempt}
          onPlaybackAttemptLooping={onPlaybackAttemptLooping}
          onDismiss={onPlaybackModalDismiss}
          playbackInformation={playbackInformation}
          onPlaybackAttemptFastForward={onPlaybackAttemptFastForward}
          onPlaybackAttemptRewind={onPlaybackAttemptRewind}
        />
      </View>
    );
  }
  return <></>;
};

export default FileScreen;
