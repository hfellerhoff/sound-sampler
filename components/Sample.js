import React, {useState, useEffect} from 'react';
import {Audio, Video} from 'expo-av';
import Recorder from "./Recorder";
import LoopButton from "./LoopButton";
const Sample = (props) => {
    const {sound, status} = props;
     /* required to load for playing */
    sound.loadAsync(sound, status, false);
    const handlePosition = (props) => {
        const {sound, status} = props;
        sound.setPositionAsync(0) //default until the slider starts to work
    };
    const handlePlaying = (props) => {
        const {sound, status} = props;
        if (sound.isPlaying === false) {
            sound.playFromPositionAsync(sound.positionMillis);
        } else if (sound.isPlaying === true) {
            sound.pauseAsync()
            ////playbackObject.playFromPositionAsync(millis)
            // we need logic for this so that they can play,stop, then play from same point
        } else {
            alert("Play Button did not work!");
        }
    };
    const handleVolume = (props) => {
        let value = 1; ////default until the slider/Volume Button starts to work
        const {sound, status} = props;
        /* Need to return a value between 0 and 1 from the slider component
            No idea how to implement this
            setting default as 1 for now
         */
        sound.setVolumeAsync(value)
    };
    const handleMute = (props) => {
        const {sound, status} = props;
        if (true === sound.isMuted) {
            sound.setIsMutedAsync(false);
        } else if (sound.isMuted === false) {
            sound.setIsMutedAsync(true);
        } else {
            alert("Mute Button did not work!")
        }
    };
    const handleLooping = (props) => {
        const {sound, status} = props;
        if (sound.isLooping === true) {
            sound.setIsLoopingAsync(true);
        } else if (sound.isLooping === false) {
            sound.setIsLoopingAsync(false);
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
        //Henry should handle this (he is better then me), but I think we would set an function running on a interval
        //changes the postion using
        //playbackObject.playFromPositionAsync(millis)
        //for every interval (e.g 2 seconds) change millis (e.g by 2000)
        //However, we should probably program logic into a new component for the UI (see FastForwardButton)
    };
    const handleRewinding = (props) => {
        const {sound, status} = props;
        //Henry should handle this (he is better then me), but I think we would set an function running on a interval
        //changes the postion using
        //playbackObject.playFromPositionAsync(millis)
        //for every interval (e.g 2 seconds) change millis (e.g by -2000)
        //However, we should probably program logic into a new component for the UI (see RewindButton)
    };
    const handleDeletion = (props) => {
        const {sound, status} = props;
        //Henry should handle this (he is better then me), but I think we would eventually call a new Sample
        alert("Are you sure you want to delete this sample? You can't get it back if you do!");
        //Render new html with options to either confirm or cancel the deletion, then program logic with that
    };

    // return (
    //      <LoopButton sound={sound} onPress={handleLooping}/>
    // )
    // );


};
//stolen from the recorder component, probably wont work but I am horrendous with CSS
const styles = StyleSheet.create({
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
export default Sample;
