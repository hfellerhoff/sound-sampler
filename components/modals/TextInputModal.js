import React, { useState, useEffect } from "react";

import { StyleSheet, Text, TextInput, View } from "react-native";
import { SCREEN_WIDTH } from "../../constants/Sizes";
import ButtonOpacity from "../buttons/ButtonOpacity";
import Modal from "./Modal";
import Colors from "../../constants/Colors";

/*
    A modal that dismisses with the text in its input if submitted or null if exited.
*/
const TextInputModal = props => {
  const { isVisible, onDismiss } = props;
  const { title, description, buttonTitle } = props;
  const [inputValue, setInputValue] = useState("");

  const submitModal = () => {
    onDismiss(inputValue);
  };

  useEffect(() => {
    if (!isVisible) {
      setInputValue("");
    }
  }, [isVisible]);

  const Title = () => {
    if (title) return <Text style={styles.title}>{title}</Text>;
    return <></>;
  };

  const Description = () => {
    if (description)
      return <Text style={styles.description}>{description}</Text>;
    return <></>;
  };

  const Buffer = () => {
    if (title && description) return <View style={{ marginBottom: 10 }} />;
    return <></>;
  };

  return (
    <Modal isVisible={isVisible} onDismiss={onDismiss}>
      <View style={styles.container}>
        <Title />
        <Buffer />
        <Description />
        <View style={{ marginBottom: 20 }} />
        <TextInput
          value={inputValue}
          onChangeText={text => setInputValue(text)}
          style={styles.input}
        />
        <ButtonOpacity
          title={buttonTitle}
          onPress={submitModal}
          style={styles.onSubmit}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH / 1.5,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 24,
    color: Colors.black,
    textAlign: "center"
  },

  description: {
    fontSize: 18,
    color: Colors.gray,
    marginBottom: 20,
    textAlign: "center"
  },

  input: {
    width: "100%",
    height: 40,
    marginBottom: 25,
    borderColor: "gray",
    borderBottomWidth: 3,
    borderRadius: 10,
    color: "#333",
    fontSize: 20,
    textAlign: "center"
  },

  button: {
    width: "100%"
  }
});

export default TextInputModal;
