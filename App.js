import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import FileManager from './components/FileManager';
import Recorder from './components/Recorder';
import Header from './components/Header';

export default function App() {
	const [ isRecording, setIsRecording ] = useState(false);

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />
			<Header title="Files" />
			<FileManager isRecording={isRecording} />
			<Recorder isRecording={isRecording} setIsRecording={setIsRecording} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#eee',
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
