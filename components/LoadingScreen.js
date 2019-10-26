import React from 'react'

import { View, StyleSheet, Image } from 'react-native';
import { SCREEN_WIDTH } from '../constants/Sizes';

const LoadingScreen = (props) => {
    return (
        <View style={styles.background}>
            <Image style={styles.image} source={require('../assets/EmptyLogo.jpg')}/>
        </View>
        
    )
}

const imageSize = SCREEN_WIDTH / 1.25;
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: imageSize,
        height: imageSize * 1.5
    }
})

export default LoadingScreen