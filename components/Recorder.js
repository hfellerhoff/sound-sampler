import React from 'react';
import RecorderDisplay from './RecorderDisplay';

const Recorder = (props) => {
	const { isRecording, setIsRecording } = props;
	const onStartRecord = () => setIsRecording(!isRecording);

	return <RecorderDisplay isRecording={isRecording} onPress={onStartRecord} />;
};

export default Recorder;
