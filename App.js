import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FileManager from './components/FileManager';
import Recorder from './components/Recorder';

export default function App() {
	const [ isRecording, setIsRecording ] = useState(false);

	return (
		<View style={styles.container}>
			<FileManager isRecording={isRecording} />
			<Recorder isRecording={isRecording} setIsRecording={setIsRecording} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
