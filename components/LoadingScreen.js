import React from 'react'

import { View, StyleSheet } from 'react-native';

const LoadingScreen = (props) => {
    return <View style={styles.background} />
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'black'
    }
})

export default LoadingScreen