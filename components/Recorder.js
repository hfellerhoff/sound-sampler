import React, { useState, useEffect } from 'react';
import {Audio} from 'expo-av';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
//import Sample from './Sample';
import RecorderDisplay from "./RecorderDisplay";
const Recorder = (props) => {
	// const [ isRecording, setIsRecording ] = useState(false);
	const { isRecording, setIsRecording } = props;
	const [ recording, setRecording ] = useState(null);

	const [ hasRecordingPermissions, setHasRecordingPermissions ] = useState(false);

	const handleRecordPress = () => {
		if (isRecording) stopRecording();
		else beginRecording();
	};

	const askForPermissions = async () => {
		const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
		setHasRecordingPermissions(status === 'granted');
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
				await localRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
				setRecording(localRecording);
				await localRecording.startAsync();
				// alert('Recording!');
			} catch (error) {
				alert(error);
			}
		} else {
			alert('Please enable Sampler to use your microphone, as the app will not work otherwise.');
		}
	};

	const stopRecording = async () => {
		try {
			await localRecording.stopAndUnloadAsync();
			setIsRecording(false);

		} catch (error) {
			alert(error);
			setIsRecording(false);
		}
		const info = await FileSystem.getInfoAsync(recording.getURI());
		alert(`FILE INFO: ${JSON.stringify(info)}`);
	};

	useEffect(() => {
		askForPermissions();
	}, []);

	return <RecorderDisplay isRecording={isRecording} onPress={handleRecordPress} />;
	// const newSample = localRecording.createNewLoadedSoundAsync();
	// const playBackStatus = newSample.playBackStatus;
	// return <Sample sound={newSample} status={playBackStatus}/>
};

export default Recorder;
