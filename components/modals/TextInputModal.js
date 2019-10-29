import React, { useState, useEffect } from "react";

import { Text, TextInput, View } from "react-native";
import ButtonOpacity from "../buttons/ButtonOpacity";
import Modal from "./Modal";
import Styles from "../../constants/Styles";

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
    if (title) return <Text style={Styles.modalTitle}>{title}</Text>;
    return <></>;
  };

  const Description = () => {
    if (description)
      return <Text style={Styles.modalDescription}>{description}</Text>;
    return <></>;
  };

  const Buffer = () => {
    if (title && description) return <View style={{ marginBottom: 10 }} />;
    return <></>;
  };

  return (
    <Modal isVisible={isVisible} onDismiss={onDismiss}>
      <View style={Styles.modalContainer}>
        <Title />
        <Buffer />
        <Description />
        <View style={{ marginBottom: 20 }} />
        <TextInput
          value={inputValue}
          onChangeText={text => setInputValue(text)}
          style={Styles.modalTextInput}
        />
        <ButtonOpacity title={buttonTitle} onPress={submitModal} />
      </View>
    </Modal>
  );
};
export default TextInputModal;
