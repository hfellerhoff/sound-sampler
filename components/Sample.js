import React from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import { Audio } from "expo-av";
import FileManager from "./FileManager";
const audioBookPlaylist = [
  {
    title: "Macarena",
    author: "Los Del Rios",
    uri:
      "https://archive.org/download/04MacarenaLosDelRio/04%20-%20Macarena%20-%20Los%20Del%20Rio.mp3"
  }
];

const getPlaybackData = async file => {
  const data = {
    title: file.name,
    sound: FileManager.getFile(file.uri)
  };
};

export default class App extends React.Component {
  state = {
    isPlaying: false,
    playbackInstance: null,
    currentIndex: 0,
    isLoaded: false,
    isLooping: false,
    volume: 1.0,
    isBuffering: true,
    positionMillis: null,
    durationMillis: null
  };

  async componentDidMount() {
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

      this.loadAudio();
    } catch (e) {
      console.log(e);
    }
  }

  async loadAudio() {
    const { currentIndex, isPlaying, volume } = this.state;

    try {
      const playbackInstance = new Audio.Sound();
      const source = {
        uri: audioBookPlaylist[currentIndex].uri
      };

      const status = {
        shouldPlay: isPlaying,
        volume: volume
      };

      playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      this.setState({
        playbackInstance,
        soundDuration: playbackInstance.durationMillis,
        soundPosition: playbackInstance.positionMillis
      });
    } catch (error) {
      alert(error);
    }
  }
  // async handleLooping() {
  // 	const {sound} = props;
  // 	const {playbackInstance, isLoaded } = this.state;
  // 	if (isLoaded) {
  // 		if (playbackInstance.isLooping === true) {
  // 			await playbackInstance.setIsLoopingAsync(true);
  // 		} else if (sound.isLooping === false) {
  // 			await playbackInstance.setIsLoopingAsync(false);
  // 		}
  // 		alert("Loop Button did not work!")
  // 	}

  // handleFastForward = async () => {
  // 	const {playbackInstance, isLoaded } = this.state;
  // 	const durationMillis = playbackInstance.durationMillis;
  // 	const positionMillis = playbackInstance.positionMillis;
  // 	if (isLoaded) {
  // 		if (durationMillis >= 10000) {
  // 			await this.playbackInstance.playFromPositionAsync(positionMillis + 2000);
  // 		} else if (durationMillis < 10000) {
  // 			await this.playbackInstance.playFromPositionAsync(positionMillis + 1000);
  // 		} else if (durationMillis < 5000) {
  // 			await this.playbackInstance.playFromPositionAsync(positionMillis + 500);
  // 		}
  // 	}
  // };
  // handleRewinding = async () => {
  // 	const {playbackInstance, isLoaded } = this.state;
  // 	const durationMillis = playbackInstance.durationMillis;
  // 	const positionMillis = playbackInstance.positionMillis;
  // 	if (isLoaded) {
  // 		if (durationMillis >= 10000) {
  // 			await this.playbackInstance.playFromPositionAsync(positionMillis - 2000);
  // 		} else if (durationMillis < 10000) {
  // 			await this.playbackInstance.playFromPositionAsync(positionMillis - 1000);
  // 		} else if (durationMillis < 5000) {
  // 			await this.playbackInstance.playFromPositionAsync(positionMillis - 500);
  // 		}
  // 	}
  // };
  onPlaybackStatusUpdate = status => {
    this.setState({
      isBuffering: status.isBuffering
    });
  };

  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state;
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();

    this.setState({
      isPlaying: !isPlaying
    });
  };

  renderFileInfo() {
    const { playbackInstance, currentIndex } = this.state;
    return playbackInstance ? (
      <View style={styles.trackInfo}>
        <Text style={[styles.trackInfoText, styles.largeText]}>
          {audioBookPlaylist[currentIndex].title}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {audioBookPlaylist[currentIndex].author}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {audioBookPlaylist[currentIndex].source}
        </Text>
      </View>
    ) : null;
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.control}>
            <Image
              source={require("../assets/ios-icons/rewind-ios.png")}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handlePlayPause}
          >
            {this.state.isPlaying ? (
              <Image
                source={require("../assets/ios-icons/pause-ios.png")}
                style={{ width: 50, height: 50 }}
              />
            ) : (
              <Image
                source={require("../assets/ios-icons/play-ios.png")}
                style={{ width: 50, height: 50 }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.control}>
            <Image
              source={require("../assets/ios-icons/fast-forward-ios.png")}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.control}>
            <Image
              source={require("../assets/ios-icons/loop-ios.png")}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.control}>
            <Image
              source={require("../assets/ios-icons/delete-ios.png")}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
        </View>
        {this.renderFileInfo()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  albumCover: {
    width: 250,
    height: 250
  },
  trackInfo: {
    padding: 40,
    backgroundColor: "#fff"
  },

  trackInfoText: {
    textAlign: "center",
    flexWrap: "wrap",
    color: "#550088"
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
    flexDirection: "row"
  }
});
