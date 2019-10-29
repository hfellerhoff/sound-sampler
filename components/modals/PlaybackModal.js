import React from "react";

import { Text, View } from "react-native";

import ButtonOpacity from "../buttons/ButtonOpacity";
import Modal from "./Modal";
import { getNameFromUri } from "../../util/Parser";
import Styles from "../../constants/Styles";

const PlaybackModal = props => {
  const {
    isVisible,
    onDismiss,
    onPlaybackAttempt,
    playbackInformation
  } = props;
  const { uri } = playbackInformation;
  const name = getNameFromUri(uri);

  //   const title = `Click to play ${name}`;

  return (
    <Modal isVisible={isVisible} onDismiss={onDismiss}>
      <View style={Styles.modalContainer}>
        <Text style={Styles.modalTitle}>{name}</Text>
        <ButtonOpacity title="Play" onPress={onPlaybackAttempt} />
      </View>
    </Modal>
  );
};

export default PlaybackModal;
