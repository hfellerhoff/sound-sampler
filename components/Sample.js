import React, {useState, useEffect} from 'react';
import {Audio, Video} from 'expo-av';
import Recorder from "./Recorder";
import LoopButton from "./LoopButton";
import DeleteButton from "./DeleteButton";
import FileManager from "./FileManager";
const Sample = (props) => {
    const {sound} = props;
     /* required to load for playing */
    sound.loadAsync(sound, status, false);
    const handlePosition = (props) => {
        const {sound, status} = props;
        sound.setPositionAsync(0) //default until the slider starts to work
    };
    const handlePlaying = (props) => {
        const {sound} = props;
        if (sound.isPlaying === false) {
            sound.playFromPositionAsync(sound.positionMillis);
        } else if (sound.isPlaying === true) {
            sound.stopAsync();
            ////playbackObject.playFromPositionAsync(millis)
            // we need logic for this so that they can play,stop, then play from same point
        } else {
            alert("Play Button did not work!");
        }
    };
    const handleVolume = (props) => {
        let value = 1; ////default until the slider/Volume Button starts to work
        const {sound} = props;
        /* Need to return a value between 0 and 1 from the slider component
            No idea how to implement this
            setting default as 1 for now
         */
        sound.setVolumeAsync(value)
    };
    const handleMute = (props) => {
        const {sound} = props;
        if (true === sound.isMuted) {
            sound.setIsMutedAsync(false);
        } else if (sound.isMuted === false) {
            sound.setIsMutedAsync(true);
        } else {
            alert("Mute Button did not work!")
        }
    };
    const handleLooping = (props) => {
        const {sound} = props;
        if (sound.isLooping === true) {
            sound.setIsLoopingAsync(true);
        } else if (sound.isLooping === false) {
            sound.setIsLoopingAsync(false);
        }
        alert("Loop Button did not work!")
    };
    const handleTrimming = (props) => {
        const {sound} = props;
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
        const {sound, millis} = props;
        //Henry should handle this (he is better then me), but I think we would set an function running on a interval
        if (sound.durationMillis >= 10000) {
            sound.playFromPositionAsync(millis + 2000)
        }
        else if (sound.durationMillis < 10000) {
            sound.playFromPositionAsync(millis + 1000)
        }
        else if (sound.durationMillis < 5000) {
            sound.playFromPositionAsync(millis + 500)
        }
        //for every interval (e.g 2 seconds) change millis (e.g by 2000)
        //However, we should probably program logic into a new component for the UI (see FastForwardButton)
    };
    const handleRewinding = (props) => {
        const {sound, millis} = props;
        //Henry should handle this (he is better then me), but I think we would set an function running on a interval
        if (sound.durationMillis >= 10000) {
            sound.playFromPositionAsync(millis - 2000)
        }
        else if (sound.durationMillis < 10000) {
            sound.playFromPositionAsync(millis - 1000)
        }
        else if (sound.durationMillis < 5000) {
            sound.playFromPositionAsync(millis - 500)
        }
        //Henry should handle this (he is better then me), but I think we would set an function running on a interval
        //However, we should probably program logic into a new component for the UI (see RewindButton)
    };
    const handleDeletion = (props) => {
        const {sound} = props;
        FileManager.deleteFile(sound.uri);
        //Render new html with options to either confirm or cancel the deletion, then program logic with that
    };
    const getPosition = (props) => {
        const {sound} = props;
        let position = sound.positionMillis;
        return position;
    };

    // return (
    //      <LoopButton sound={sound} onPress={handleLooping}/>
    //      <DeleteButton uri ={sound.uri} onPress={deleteFile(sound.uri)} />
    //      <FastForward sound={sound} onPress={handleFastForward}/>
         //May have to call in the position of the millis, but I don't think so
    //      <RewindButton sound={sound}  onPress={handleRewinding}/>
        //May have to call in the position of the millis, but I don't think so
    //        <PauseAndPlayButton sound={sound} onPress={handlePlaying} ></PauseAndPlayButton>
    //      <TimeStamp sound={sound}/>
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
