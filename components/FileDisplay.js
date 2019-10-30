import React, { useState, useEffect } from "react";

import { StyleSheet, FlatList, Platform, Text, ScrollView } from "react-native";

import { SCREEN_WIDTH, isiPhoneX } from "../constants/Sizes";
import FileCard from "./FileCard";

import Recorder from "./Recorder";

const FileDisplay = props => {
  const {
    files,
    requestDelete,
    requestRename,
    requestExport,
    requestPlayback,
    currentDirectory,
    setCurrentDirectory,
    isRecording,
    setIsRecording
  } = props;

  const [displayedFiles, setDisplayedFiles] = useState(files);
  const [direction, setDirection] = useState("right");

  const onRequestDirectory = async uri => {
    setCurrentDirectory(`${uri}/`);
  };

  const onSwipeLeft = async uri => {
    requestDelete(uri);
  };

  const onSwipeRight = async uri => {
    requestExport(uri);
  };

  const onPress = async (uri, isDirectory) => {
    if (isDirectory) {
      onRequestDirectory(uri);
    } else {
      requestPlayback(uri);
    }
  };
  const onLongPress = async uri => {
    requestRename(uri);
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
        onPress={onPress}
        onLongPress={onLongPress}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
    );
  };

  const getContent = () => {
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

  const [offset, setOffset] = useState(0);
  const [scrollView, setScrollView] = useState(null);
  const onScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.x;
    const d = currentOffset > offset ? "right" : "left";
    setOffset(currentOffset);
    setDirection(d);
  };

  const scrollTo = index => {
    if (scrollView) {
      scrollView.scrollTo({ x: index * SCREEN_WIDTH });
    }
  };

  useEffect(() => {
    setDisplayedFiles(files);
  }, [files]);

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        bounces={false}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        ref={view => setScrollView(view)}
        scrollEventThrottle={0}
      >
        {getContent()}
      </ScrollView>
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
