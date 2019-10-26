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
		backgroundColor: '#ddd',
		alignItems: 'center',
		justifyContent: 'center'
	},
	border: {
		position: 'absolute',
		bottom: 20,
		width: 75,
		height: 75,
		borderColor: 'gray',
		borderWidth: 3,
		borderRadius: 40,
		alignItems: 'center',
		justifyContent: 'center',
		transform: [ { translateX: -(75 / 2) } ]
	},

	button: {
		width: 60,
		height: 60,
		backgroundColor: 'red',
		borderRadius: 30
	}
});
