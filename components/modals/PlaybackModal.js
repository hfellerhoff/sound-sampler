import React, {useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity, TouchableHighlight} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Ionicons} from '@expo/vector-icons';
import ButtonOpacity from "../buttons/ButtonOpacity";
import Modal from "./Modal";
import {getNameFromUri} from "../../util/Parser";
import Styles from "../../constants/Styles";
import Slider from "../sliders/Slider";

const PlaybackModal = props => {
    const [volume, setVolume] = useState(1);
    const {
        isVisible,
        onDismiss,
        onPlaybackAttempt,
        onPlaybackAttemptLooping,
        playbackInformation,
        onPlaybackAttemptFastForward,
        onPlaybackAttemptRewind
    } = props;
    const {uri} = playbackInformation;
    const name = getNameFromUri(uri);

    return (
        //convert IconButtons to components
        <Modal isVisible={isVisible} onDismiss={onDismiss}>
            <View style={Styles.modalContainer}>
                <Text style={Styles.modalTitle}>{name}</Text>
                <View style={styles.Container}>
                    <Icon.Button name="fast-backward" size={40} color="purple" backgroundColor={"white"} onPress={onPlaybackAttemptRewind}/>
                    <Slider lineStyle={{marginTop: 40, marginBottom: 20}} playbackInformation={playbackInformation}/>
                    <Icon.Button name="fast-forward" size={40} color="purple" backgroundColor={"white"} onPress={onPlaybackAttemptFastForward}/>
                </View>
                <View style={styles.Container}>
                    <TouchableHighlight color="purple">
                        <Icon name="sync" size={40} color="purple" backgroundColor={"white"} onPress={onPlaybackAttemptLooping}/>
                    </TouchableHighlight>
                    <Icon.Button name="crop-alt" size={40} color="purple" backgroundColor={"white"}>WIA</Icon.Button>
                </View>
                <ButtonOpacity title="Play" onPress={onPlaybackAttempt}/>
            </View>
        </Modal>
    );
};

export default PlaybackModal;

// @ts-ignore
const styles = StyleSheet.create({
    Container: {
        flex: 0,
        alignItems: 'center',
        color: 'purple',
        backgroundColor: 'white',
        flexDirection: 'row',
    }
});