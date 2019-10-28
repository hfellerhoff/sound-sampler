import React, { useState, useEffect } from "react";

import { StyleSheet, Text, TextInput } from "react-native";
import { SCREEN_WIDTH } from "../../constants/Sizes";
import ButtonOpacity from "../buttons/ButtonOpacity";
import Modal from "./Modal";

const NewDirectoryModal = props => {
  const { isVisible, dismiss } = props;
  const [inputValue, setInputValue] = useState("");

  const onSubmit = () => {
    dismiss(inputValue);
  };

  const onDismiss = () => {
    dismiss(null);
  };

  useEffect(() => {
    if (!isVisible) {
      setInputValue("");
    }
  }, [isVisible]);

  return (
    <Modal isVisible={isVisible} dismiss={onDismiss}>
      <Text style={styles.inputTitle}>Add Directory</Text>
      <TextInput
        value={inputValue}
        onChangeText={text => setInputValue(text)}
        style={styles.input}
      />
      <ButtonOpacity title="Create" onPress={onSubmit} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    fontSize: 24,
    color: "gray",
    marginBottom: 20
  },

  input: {
    width: SCREEN_WIDTH / 1.5,
    height: 40,
    marginBottom: 30,
    borderColor: "gray",
    borderBottomWidth: 3,
    borderRadius: 10,
    color: "#333",
    fontSize: 20,
    textAlign: "center"
  }
});

export default NewDirectoryModal;
