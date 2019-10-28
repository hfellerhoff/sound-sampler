import React, { useState, useEffect } from "react";

import { StyleSheet, View, FlatList, Platform, Text } from "react-native";
import { SCREEN_WIDTH, isiPhoneX } from "../constants/Sizes";
import FileCard from "./FileCard";

import { parseFilename } from "../util/Parser";
import RenameModal from "./modals/RenameModal";

const FileDisplay = props => {
  const {
    files,
    getDirectory,
    deleteFile,
    currentDirectory,
    setCurrentDirectory,
    changeName,
    exportData,
    getFile,
    selectedUri,
    setSelectedUri
  } = props;
  const [displayedFiles, setDisplayedFiles] = useState(files);
  const [, setSampleVisible] = useState(false);

  const onRequestDirectory = async uri => {
    const newFiles = [];
    await getDirectory(uri).then(directoryFiles => {
      directoryFiles.forEach(file => {
        newFiles.push(file);
      });
    });
    setCurrentDirectory(`${uri}/`);
    setDisplayedFiles(newFiles);
  };

  const onRequestDeleteFile = async uri => {
    deleteFile(uri);
  };

  const onRequestMoveFile = async uri => {
    exportData(uri);
    // setMovingOptions({
    // 	areMoving: true,
    // 	fromUri: uri,
    // 	toUri: null
    // });
    // setCurrentDirectory(FileSystem.documentDirectory);
    // alert('Transitioning into moving mode');
  };

  const onDismiss = name => {
    if (name) {
      changeName(selectedUri, parseFilename(name));
    }
    setSelectedUri(null);
  };

  const getCard = (item, index) => {
    let marginStyle = {};
    if (displayedFiles.length - 1 === index) {
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
        setSelectedUri={setSelectedUri}
        getFile={getFile}
      />
    );
  };

  const getPageContent = () => {
    if (displayedFiles.length > 0) {
      return (
        <FlatList
          style={styles.list}
          data={displayedFiles}
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

  useEffect(() => {
    setDisplayedFiles(files);
  }, [files]);

  useEffect(() => {
    if (selectedUri) {
      // alert('Sample visible');
      setSampleVisible(true);
    } else {
      // alert('Sample not visible');
      setSampleVisible(false);
    }
  }, [selectedUri]);

  return (
    <View styles={styles.container}>
      {getPageContent()}
      <RenameModal isVisible={!!selectedUri} dismiss={onDismiss} />
    </View>
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
