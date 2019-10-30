import React from "react";

import { Text, View } from "react-native";

import ButtonOpacity from "../buttons/ButtonOpacity";
import Modal from "./Modal";
import { getNameFromUri } from "../../util/Parser";
import Styles from "../../constants/Styles";
import Slider from "../sliders/Slider";

const PlaybackModal = props => {
  const {
    isVisible,
    onDismiss,
    onPlaybackAttempt,
    playbackInformation
  } = props;
  const { uri } = playbackInformation;
  const name = getNameFromUri(uri);

  return (
    <Modal isVisible={isVisible} onDismiss={onDismiss}>
      <View style={Styles.modalContainer}>
        <Text style={Styles.modalTitle}>{name}</Text>
        <Slider lineStyle={{ marginTop: 40, marginBottom: 20 }} />
        <ButtonOpacity title="Play" onPress={onPlaybackAttempt} />
      </View>
    </Modal>
  );
};

export default PlaybackModal;
