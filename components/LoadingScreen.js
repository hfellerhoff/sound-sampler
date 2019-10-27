import React from 'react';

import { View, StyleSheet, Image, Text } from 'react-native';
<<<<<<< HEAD
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants/Sizes'; 

const LoadingScreen = (props) => {
    return (
        <View style={styles.background}>
            <Image style={styles.image} source={require('../assets/EmptyLogo.jpg')} />
            <Text style={styles.text} >EARWORM</Text>
        </View>
        
    )
=======
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants/Sizes';

const LoadingScreen = (props) => {
	return (
		<View style={styles.background}>
			<Image style={styles.image} source={require('../assets/EmptyLogo.jpg')} />
			<Text style={styles.text}>EARWORM</Text>
		</View>
	);
>>>>>>> a1989a63142f070455c0d4e392afbf270184eb19
};

const imageSize = SCREEN_WIDTH / 1.25;
const styles = StyleSheet.create({
<<<<<<< HEAD
    background: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    image: {
        width: imageSize,
        height: imageSize * 1.5
    },
    text: {
        position: 'absolute',
        top: SCREEN_HEIGHT / 2 - 48,
        left: 0,
        right: 0,
        color: '#02fffe',
        fontSize: 18,
        fontWeight: '400',
        fontFamily: 'Liu Jian Mao Cao', cursive,
        textAlign: 'center',
        letterSpacing: 5
    }
})
// const [ isLoading, setIsLoading ] = useState(true);

/* if (isLoading) {
    return (
        <LoadingScreen>
            {/* <View>
                <Header style={styles.text}>[Earworm]</Header>
            </View> */
        /* </LoadingScreen>
    );
}
else {
    return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header title="Files" />
        <FileManager isRecording={isRecording} />
        <Recorder isRecording={isRecording} setIsRecording={setIsRecording} />
    </View>
    );
} */
export default LoadingScreen
=======
	background: {
		flex: 1,
		backgroundColor: '#000000',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20
	},
	image: {
		width: imageSize,
		height: imageSize * 1.5
	},
	text: {
		position: 'absolute',
		top: SCREEN_HEIGHT / 2 - 48,
		left: 0,
		right: 0,
		color: '#02fffe',
		fontSize: 18,
		fontWeight: '400',
		fontFamily: 'Liu Jian Mao Cao',
		cursive,
		textAlign: 'center',
		letterSpacing: 5
	}
});
export default LoadingScreen;
>>>>>>> a1989a63142f070455c0d4e392afbf270184eb19
