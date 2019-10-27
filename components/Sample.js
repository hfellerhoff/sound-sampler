import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { Audio } from 'expo-av'
import FileManager from "./FileManager";
const fileSystem = [
    {
        title: "Test",
        uri:
            FileManager.getURI

    }
    ]
const Sample = async (props)  => {
    const {recording} = props;
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
    await playBackInstance = recording.createNewLoadedSoundAsync();
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

            await loadAudio(playBackInstance)
        } catch (e) {
            console.log(e)
        }
    }

    const loadAudio = async (props) => {
        const {playBackInstance} = props;
        try {
            const playbackInstance = new Audio.Sound();
            const source = {
                uri: FileManager.getURI
            };

            const status = {
                shouldPlay: playBackInstance.isPlaying,
                volume: playBackInstance.volume
            };

            playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
            await playbackInstance.loadAsync(source, status, false);

        } catch (error) {
            alert(error);
        }
    };
    const handleLooping = async (props) => {
        const {sound} = props;
        const {playbackInstance, isLoaded} = this.state;
        if (isLoaded) {
            if (playbackInstance.isLooping === true) {
                await playbackInstance.setIsLoopingAsync(true);
            } else if (sound.isLooping === false) {
                await playbackInstance.setIsLoopingAsync(false);
            }
            alert("Loop Button did not work!")
        }

        const handleFastForward = async (props) => {
            const {playbackInstance, isLoaded} = props;
            const durationMillis = playbackInstance.durationMillis;
            const positionMillis = playbackInstance.positionMillis;
            if (isLoaded) {
                if (durationMillis >= 10000) {
                    await playbackInstance.playFromPositionAsync(positionMillis + 2000);
                } else if (durationMillis < 10000) {
                    await playbackInstance.playFromPositionAsync(positionMillis + 1000);
                } else if (durationMillis < 5000) {
                    await playbackInstance.playFromPositionAsync(positionMillis + 500);
                }
            }
        };
        const handleRewinding = async (props) => {
            const {playbackInstance, isLoaded} = props;
            const durationMillis = playbackInstance.durationMillis;
            const positionMillis = playbackInstance.positionMillis;
            if (isLoaded) {
                if (durationMillis >= 10000) {
                    await playbackInstance.playFromPositionAsync(positionMillis - 2000);
                } else if (durationMillis < 10000) {
                    await playbackInstance.playFromPositionAsync(positionMillis - 1000);
                } else if (durationMillis < 5000) {
                    await playbackInstance.playFromPositionAsync(positionMillis - 500);
                }
            }
        };
        const onPlaybackStatusUpdate = (props) => {
            const {playbackInstance} = props;
            return playbackInstance.isBuffer;
        };

        const handlePlayPause = async (props) => {
            const {playbackInstance} = props;
            if (getPlayStatus) {
                await playbackInstance.pauseAsync()
            } else {
                await playbackInstance.playAsync();
            }

        };
        const getPlayStatus = async (props) => {
            const {playbackInstance} = props;
            return playbackInstance.isPlaying;
        };

        const renderFileInfo = (props) => {
            const {playbackInstance, currentIndex} = props;
            return playbackInstance ? (
                <View style={styles.trackInfo}>
                    <Text style={[styles.trackInfoText, styles.largeText]}>
                        {fileSystem[currentIndex].title}
                    </Text>
                </View>
            ) : null
        }
        return (
            <View style={styles.container}>
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.control}>
                        <Image source={require('../assets/ios-icons/rewind-ios.png')} style={{width: 50, height: 50}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.control} onPress={handlePlayPause}>
                        {playbackInstance.isPlaying ? (
                            <Image source={require('../assets/ios-icons/pause-ios.png')}
                                   style={{width: 50, height: 50}}/>
                        ) : (
                            <Image source={require('../assets/ios-icons/play-ios.png')}
                                   style={{width: 50, height: 50}}/>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.control}>
                        <Image source={require('../assets/ios-icons/fast-forward-ios.png')}
                               style={{width: 50, height: 50}}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.control}>
                        <Image source={require('../assets/ios-icons/loop-ios.png')} style={{width: 50, height: 50}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.control}>
                        <Image source={require('../assets/ios-icons/delete-ios.png')} style={{width: 50, height: 50}}/>
                    </TouchableOpacity>
                </View>
                {renderFileInfo()}
            </View>
        );
    };
}

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