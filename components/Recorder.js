import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import RecorderDisplay from "./RecorderDisplay";

const Recorder = props => {
  const { isRecording, setIsRecording } = props;
  const [recording, setRecording] = useState(null);

  const [hasRecordingPermissions, setHasRecordingPermissions] = useState(false);

  const onRecordPress = () => {
    if (isRecording) stopRecording();
    else beginRecording();
  };

  const askForPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    setHasRecordingPermissions(status === "granted");
  };

  const beginRecording = async () => {
    setIsRecording(true);

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true
    });

    if (hasRecordingPermissions) {
      try {
        if (recording !== null) setRecording(null);
        const localRecording = new Audio.Recording();
        await localRecording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(localRecording);
        await localRecording.startAsync();
        setRecording(localRecording);
      } catch (error) {
        alert(error);
      }
    } else {
      alert(
        "Please enable Sampler to use your microphone, as the app will not work otherwise."
      );
    }
  };

  const stopRecording = async () => {
    await recording
      .stopAndUnloadAsync()
      .then(setIsRecording(false))
      .catch(() => {
        alert(error);
        setIsRecording(false);
      });
    const info = await FileSystem.getInfoAsync(recording.getURI());
  };

  useEffect(() => {
    askForPermissions();
  }, []);

  return <RecorderDisplay isRecording={isRecording} onPress={onRecordPress} />;
};

export default Recorder;
