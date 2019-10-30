import React from "react";

import { StyleSheet, FlatList, Platform, Text } from "react-native";

import { SCREEN_WIDTH, isiPhoneX } from "../constants/Sizes";
import FileCard from "./FileCard";

import Recorder from "./Recorder";

const FileDisplay = props => {
  const {
    files,
    deleteFile,
    currentDirectory,
    setCurrentDirectory,
    requestRename,
    exportData,
    isRecording,
    setIsRecording,
    playbackInformation,
    setPlaybackInformation,
    requestPlayback
  } = props;

  const onRequestDirectory = async uri => {
    setCurrentDirectory(`${uri}/`);
  };

  const onRequestDeleteFile = async uri => {
    deleteFile(uri);
  };

  const onRequestMoveFile = async uri => {
    exportData(uri);
  };

  const getCard = (item, index) => {
    let marginStyle = {};
    if (files.length - 1 === index) {
      if (isiPhoneX())
        marginStyle = {
          marginBottom: 214
        };
      else if (Platform.OS === "ios") marginStyle = { marginBottom: 180 };
      else marginStyle = { marginBottom: 190 };
    }
    return (
      <FileCard
        bottomStyle={marginStyle}
        file={item}
        requestDirectory={onRequestDirectory}
        deleteFile={onRequestDeleteFile}
        moveFile={onRequestMoveFile}
        currentDirectory={currentDirectory}
        requestRename={requestRename}
        playbackInformation={playbackInformation}
        setPlaybackInformation={setPlaybackInformation}
        requestPlayback={requestPlayback}
      />
    );
  };

  const getPageContent = () => {
    if (files.length > 0) {
      return (
        <FlatList
          style={styles.list}
          data={files}
          renderItem={({ item, index }) => getCard(item, index)}
          keyExtractor={file => file.uri}
        />
      );
    }
    return (
      <Text style={[styles.list, styles.errorText]}>
        No files found. Start recording to add some!
      </Text>
    );
  };

  /*
      ~ Not working: would love to get it working though ~
      
      const modalDescription = selectedUri
      ? `Enter a new name for ${getNameFromUri(selectedUri)}`
      : "";
  */
  return (
    <>
      {getPageContent()}
      <Recorder isRecording={isRecording} setIsRecording={setIsRecording} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    flex: 1,
    width: SCREEN_WIDTH,
    marginTop: 0
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#333"
  }
});

export default FileDisplay;
