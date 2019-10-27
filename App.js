import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import FileManager from './components/FileManager';
import Recorder from './components/Recorder';
import Header from './components/Header';
import NewDirectoryModal from './components/NewDirectoryModal';
import * as FileSystem from 'expo-file-system';
import LoadingScreen from './components/LoadingScreen';
import { getNameFromUri, getParentDirectory } from './util/Parser';
import Button from './components/basic/AnotherCustomButton';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './constants/Sizes';
import Colors from './constants/Colors';

const App = () => {
	const [ isRecording, setIsRecording ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(true);

	const [ showNewDirectoryModal, setShowNewDirectoryModal ] = useState(false);
	const [ shouldCreateNewDirectory, setShouldCreateNewDirectory ] = useState(false);
	const [ newDirectoryInformation, setNewDirectoryInformation ] = useState({});

	const [ currentDirectory, setCurrentDirectory ] = useState(FileSystem.documentDirectory);
	const [ movingOptions, setMovingOptions ] = useState({
		areMoving: false,
		fromUri: null,
		toUri: null
	});
	const [ selectedUri, setSelectedUri ] = useState(null);

	const onCreateDirectoryAttempt = (name) => {
		setShowNewDirectoryModal(false);
		// alert(`Desired Directory Location: ${FileSystem.documentDirectory + currentParentDirectory + name}`);
		if (name && name !== '') {
			setNewDirectoryInformation({
				name: name,
				uri: currentDirectory
			});
			console.log(currentDirectory);
			setShouldCreateNewDirectory(true);
		}
	};

	const onDirectoryCreate = () => {
		setNewDirectoryInformation({});
		setShouldCreateNewDirectory(false);
	};

	const onMoveBackDirectory = () => {
		if (currentDirectory !== FileSystem.documentDirectory) {
			setCurrentDirectory(getParentDirectory(currentDirectory) + '/');
			// alert(FileSystem.documentDirectory);
			// alert(getParentDirectory(currentDirectory));
		}
	};

	const getHeaderTitle = () => {
		if (currentDirectory === FileSystem.documentDirectory) return 'Files';
		else return getNameFromUri(currentDirectory);
	};

	const onFileMove = () => {
		alert('onFileMove');
		setMovingOptions({
			areMoving: true,
			toUri: currentDirectory,
			fromUri: movingOptions.fromUri
		});
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />
			<Header
				title={getHeaderTitle()}
				onPress={() => setShowNewDirectoryModal(true)}
				onGoBack={onMoveBackDirectory}
			/>
			<FileManager
				isRecording={isRecording}
				shouldCreateNewDirectory={shouldCreateNewDirectory}
				newDirectoryInformation={newDirectoryInformation}
				onDirectoryCreate={onDirectoryCreate}
				setIsLoading={() => setIsLoading(false)}
				currentDirectory={currentDirectory}
				setCurrentDirectory={setCurrentDirectory}
				selectedUri={selectedUri}
				setSelectedUri={setSelectedUri}
			/>
			{movingOptions.areMoving ? (
				<Button
					title="Move Here"
					onPress={() => onFileMove()}
					style={{
						position: 'absolute',
						bottom: SCREEN_HEIGHT / 8,
						left: -SCREEN_WIDTH / 4,
						backgroundColor: Colors.fileLeftAction
					}}
				/>
			) : (
				<Recorder isRecording={isRecording} setIsRecording={setIsRecording} />
			)}
			<NewDirectoryModal isVisible={showNewDirectoryModal} dismiss={onCreateDirectoryAttempt} />
			<LoadingScreen isLoading={isLoading} onPress={() => setIsLoading(false)} />
		</View>
	);
};

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

export default App;
