import React, {useState, useEffect} from 'react';
import {Audio, Video} from 'expo-av';
import Recorder from "./Recorder";
const Sample = (props) => {
    const {sound, status} = props;
    sound.unloadAsync(); /* required to load for playing */
    sound.loadAsync(sound, status, false)
//     const getStatus= [  //useful for later use
//         isLoaded: playbackObject.PlaybackStatus.isLoaded,
//         //isLoaded : a boolean set to true if it is playable, false if sound is not playable
//         uri: playbackObject.PlaybackStatus.uri, //Jordan may especially need this
//         //uri : the location of the media source.
//         durationMillis: playbackObject.PlaybackStatus.durationMillis, //Jordan may especially need this
//         //durationMillis : the duration of the media in milliseconds.
//         //This is only present if the media has a duration
//         //(note that in some cases, a media file's duration is readable on Android, but not on iOS).
//         positionMillis: playbackObject.PlaybackStatus.positionMillis,
//         //positionMillis : the current position of playback in milliseconds.
//         shouldPlay : playbackObject.PlaybackStatus.shouldPlay,
//         //shouldPlay : a boolean describing if the media is supposed to play.
//         isPlaying: playbackObject.PlaybackStatus.isPlaying,
//         //isPlaying : a boolean describing if the media is currently playing.
//         isBuffering: playbackObject.PlaybackStatus.isBuffering,//May be useful for UI
//         //isBuffering : a boolean describing if the media is currently buffering.
//         rate: playbackObject.PlaybackStatus.rate, //could be useful for fast forwarding and rewinding
//         //rate : the current rate of the media.
//         shouldCorrectPitch: playbackObject.PlaybackStatus.shouldCorrectPitch, //could be useful later features
//         //shouldCorrectPitch : a boolean describing if we are correcting the pitch for a changed rate.
//         volume: playbackObject.PlaybackStatus.volume, //could be useful for slider
//         //volume : the current volume of the audio for this media.
//         //Value is set to 0-1
//         isMuted: playbackObject.PlaybackStatus.isMuted,
//         //isMuted : a boolean describing if the audio of this media is currently muted.
//         isLooping : playbackObject.PlaybackStatus.isLooping,
//         //isLooping : a boolean describing if the media is currently looping.
//         didJustFinish : playbackObject.PlaybackStatus.didJustFinish
//     //didJustFinish : a boolean describing if the media just played to completion at the time that this status was received.
//     //When the media plays to completion, the function passed in setOnPlaybackStatusUpdate() is called exactly once with didJustFinish set to true.
//     //didJustFinish is never true in any other case.
// ]
    const handlePosition = (props) => {
        const {sound, status} = props;
        const playbackObject = {sound: sound, status}
        playbackObject.setPositionAsync(0) //default until the slider starts to work
    };
    const handlePlaying = (props) => {
        const {sound, status} = props;
        const playbackObject = {sound: sound, status}
        if (playbackObject.PlaybackStatus.isPlaying === false) {
            playbackObject.playFromPositionAsync(playbackObject.PlaybackStatus.positionMillis);
        } else if (playbackObject.PlaybackStatus.isPlaying === true) {
            playbackObject.pauseAsync()
            ////playbackObject.playFromPositionAsync(millis)
            // we need logic for this so that they can play,stop, then play from same point
        } else {
            alert("Play Button did not work!");
        }
    };
    const handleVolume = (props) => {
        let value = 1; ////default until the slider/Volume Button starts to work
        const {sound, status} = props;
        const playbackObject = {sound: sound, status}
        /* Need to return a value between 0 and 1 from the slider component
            No idea how to implement this
            setting default as 1 for now
         */
        playbackObject.setVolumeAsync(value)
    };
    const handleMute = (props) => {
        const {sound, status} = props;
        const playbackObject = {sound: sound, status};
        if (true == playbackObject.PlaybackStatus.isMuted) {
            playbackObject.setIsMutedAsync(false);
        } else if (playbackObject.PlaybackStatus.isMuted === false) {
            playbackObject.setIsMutedAsync(true);
        } else {
            alert("Mute Button did not work!")
        }
    };
    const handleLooping = (props) => {
        const {sound, status} = props;
        const playbackObject = {sound: sound, status}
        if (playbackObject.PlaybackStatus.isLooping === true) {
            playbackObject.setIsLoopingAsync(true);
        } else if (playbackObject.PlaybackStatus.isLooping === false) {
            playbackObject.setIsLoopingAsync(false);
        }
        alert("Loop Button did not work!")
    };
    const handleTrimming = (props) => {
        const {sound, status} = props;
        const playbackObject = {sound: sound, status};
        //Henry should handle this (he is better then me), but I think we would eventually call a new Sample
        /*
            const start: Create a constant for the desired start postion from the user
            const end: Create a constart for the desired end position from the user
            const playbackObject = await Audio.Sound.createAsync(
            {
                durationMillis: end - start;
         */
    };
    const handleFastForward = (props) => {
        const {sound, status} = props;
        const playbackObject = {sound: sound, status};
        //Henry should handle this (he is better then me), but I think we would set an function running on a interval
        //changes the postion using
        //playbackObject.playFromPositionAsync(millis)
        //for every interval (e.g 2 seconds) change millis (e.g by 2000)
        //However, we should probably program logic into a new component for the UI (see FastForwardButton)
    };
    const handleRewinding = (props) => {
        const {sound, status} = props;
        const playbackObject = {sound: sound, status};
        //Henry should handle this (he is better then me), but I think we would set an function running on a interval
        //changes the postion using
        //playbackObject.playFromPositionAsync(millis)
        //for every interval (e.g 2 seconds) change millis (e.g by -2000)
        //However, we should probably program logic into a new component for the UI (see RewindButton)
    };
    const handleDeletion = (props) => {
        const {sound, status} = props;
        const playbackObject = {sound: sound, status};
        //Henry should handle this (he is better then me), but I think we would eventually call a new Sample
        alert("Are you sure you want to delete this sample? You can't get it back if you do!");
        //Render new html with options to either confirm or cancel the deletion, then program logic with that
    };

    return (
        <h1>It worked</h1>
    );
    /*
     catch (error) {
     An error occurred!
    }
     */

};
//stolen from the recorder component, probably wont work but I am horrendous with CSS
// const styles = StyleSheet.create({
//     border: {
//         position: 'absolute',
//         bottom: 20,
//         width: 75,
//         height: 75,
//         borderColor: 'gray',
//         borderWidth: 3,
//         borderRadius: 40,
//         alignItems: 'center',
//         justifyContent: 'center',
//         transform: [ { translateX: -(75 / 2) } ]
//     },
//
//     button: {
//         width: 60,
//         height: 60,
//         backgroundColor: 'red',
//         borderRadius: 30
//     }
// });
export default Sample;
