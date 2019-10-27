import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { Audio } from 'expo-av';
// import FileManager from './FileManager';
import * as FileSystem from 'expo-file-system';

const fileSystem = [
	{
		title: 'Test',
		uri: FileSystem.documentDirectory
	}
];

const Sample = async (props) => {
	const { recording, sound: propSound } = props;
	const PlaybackStatusToSet = {
		progressUpdateIntervalMillis: 500,
		positionMillis: false,
		durationMillis: false,
		shouldPlay: false,
		rate: 1.0,
		shouldCorrectPitch: false,
		volume: 1.0,
		isMuted: false,
		isLooping: false,
		isPlaying: false
	};
	const sound = recording.createNewLoadedSoundAsync();
	const componentDidMount = async () => {
		try {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				playsInSilentModeIOS: true,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
				shouldDuckAndroid: true,
				staysActiveInBackground: true,
				playThroughEarpieceAndroid: true
			});

			await loadAudio(sound);
		} catch (e) {
			console.log(e);
		}
	};

	const loadAudio = async (props) => {
		const { sound } = props;
		try {
			const sound = new Audio.Sound();
			const source = {
				uri: FileManager.getURI
			};

			const status = {
				shouldPlay: sound.isPlaying,
				volume: sound.volume
			};

			sound.setOnPlaybackStatusUpdate();
			await sound.loadAsync(source, status, false);
		} catch (error) {
			alert(error);
		}
	};
	const handleLooping = async (props) => {
		const { sound } = props;
		if (sound.isLoaded) {
			if (sound.isLooping === true) {
				await sound.setIsLoopingAsync(true);
			} else if (sound.isLooping === false) {
				await sound.setIsLoopingAsync(false);
			}
			alert('Loop Button did not work!');
		}

		const handleFastForward = async (props) => {
			const { sound, isLoaded } = props;
			const durationMillis = sound.durationMillis;
			const positionMillis = sound.positionMillis;
			if (isLoaded) {
				if (durationMillis >= 10000) {
					await sound.playFromPositionAsync(positionMillis + 2000);
				} else if (durationMillis < 10000) {
					await sound.playFromPositionAsync(positionMillis + 1000);
				} else if (durationMillis < 5000) {
					await sound.playFromPositionAsync(positionMillis + 500);
				}
			}
		};
		const handleRewinding = async (props) => {
			const { sound, isLoaded } = props;
			const durationMillis = sound.durationMillis;
			const positionMillis = sound.positionMillis;
			if (isLoaded) {
				if (durationMillis >= 10000) {
					await sound.playFromPositionAsync(positionMillis - 2000);
				} else if (durationMillis < 10000) {
					await sound.playFromPositionAsync(positionMillis - 1000);
				} else if (durationMillis < 5000) {
					await sound.playFromPositionAsync(positionMillis - 500);
				}
			}
		};
		const onPlaybackStatusUpdate = (props) => {
			const { sound } = props;
			return sound.isBuffering;
		};

		const handlePlayPause = async (props) => {
			const { sound } = props;
			if (getPlayStatus) {
				await sound.pauseAsync();
			} else {
				await sound.playAsync();
			}
		};
		const getPlayStatus = async (props) => {
			const { sound } = props;
			return sound.isPlaying;
		};

		const renderFileInfo = (props) => {
			const { sound, currentIndex } = props;
			return sound ? (
				<View style={styles.trackInfo}>
					<Text style={[ styles.trackInfoText, styles.largeText ]}>{fileSystem[currentIndex].title}</Text>
				</View>
			) : null;
		};
		await componentDidMount();
		return (
			<View style={styles.container}>
				<View style={styles.controls}>
					<TouchableOpacity style={styles.control}>
						<Image
							source={require('../assets/ios-icons/rewind-ios.png')}
							style={{ width: 50, height: 50 }}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} onPress={handlePlayPause}>
						{playbackInstance.isPlaying ? (
							<Image
								source={require('../assets/ios-icons/pause-ios.png')}
								style={{ width: 50, height: 50 }}
							/>
						) : (
							<Image
								source={require('../assets/ios-icons/play-ios.png')}
								style={{ width: 50, height: 50 }}
							/>
						)}
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} onPress={handleFastForward}>
						<Image
							source={require('../assets/ios-icons/fast-forward-ios.png')}
							style={{ width: 50, height: 50 }}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} onPress={handleRewinding}>
						<Image
							source={require('../assets/ios-icons/rewind-ios.png')}
							style={{ width: 50, height: 50 }}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.controls}>
					<TouchableOpacity style={styles.control} onPress={handleLooping}>
						<Image source={require('../assets/ios-icons/loop-ios.png')} style={{ width: 50, height: 50 }} />
					</TouchableOpacity>
				</View>
				{renderFileInfo()}
			</View>
		);
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	albumCover: {
		width: 250,
		height: 250
	},
	trackInfo: {
		padding: 40,
		backgroundColor: '#fff'
	},

	trackInfoText: {
		textAlign: 'center',
		flexWrap: 'wrap',
		color: '#550088'
	},
	largeText: {
		fontSize: 22
	},
	smallText: {
		fontSize: 16
	},
	control: {
		margin: 20
	},
	controls: {
		flexDirection: 'row'
	}
});
export default Sample;
