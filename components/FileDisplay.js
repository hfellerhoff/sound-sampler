import React, { useState, useEffect } from "react";

import { StyleSheet, View, FlatList, Platform, Text } from "react-native";
import {
  SCREEN_WIDTH,
  getStatusBarHeight,
  isiPhoneX
} from "../constants/Sizes";
import FileCard from "./FileCard";

const FileDisplay = props => {
  const { files, getDirectory } = props;
  const [displayedFiles, setDisplayedFiles] = useState(props.files);

  const onRequestDirectory = async uri => {
    const newFiles = await getDirectory(uri);
    setDisplayedFiles(newFiles);
  };

  const getFiles = () => (displayedFiles.length > 0 ? displayedFiles : files);

  const getCard = (item, index) => {
    let bottomStyle = {};
    if (getFiles().length - 1 === index) {
      if (isiPhoneX())
        bottomStyle = {
          marginBottom: 214
        };
      else if (Platform.OS === "ios") bottomStyle = { marginBottom: 180 };
      else bottomStyle = { marginBottom: 190 };
    }
    return (
      <FileCard
        style={bottomStyle}
        file={item}
        requestDirectory={onRequestDirectory}
      />
    );
  };

  const getPageContent = (item, index) => {
    if (getFiles().length > 0) {
      return (
        <FlatList
          style={styles.list}
          data={getFiles()}
          renderItem={({ item, index }) => getCard(item, index)}
          keyExtractor={file => file.uri}
        />
      );
    } else {
      return (
        <Text style={[styles.list, styles.errorText]}>
          No files found. Start recording to add some!
        </Text>
      );
    }
  };

  useEffect(() => {
    setDisplayedFiles(files);
  }, []);

  return <View styles={styles.container}>{getPageContent()}</View>;
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
