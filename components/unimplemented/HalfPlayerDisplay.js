import React, { useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import Icons from '../../constants/Icons';
import HalfPlayer from './HalfPlayer';
import { onGestureEvent } from 'react-native-redash';

const { Value } = Animated;
const { height } = Dimensions.get('window');
const TABBAR_HEIGHT = 150 + 50;
const MINIMIZED_PLAYER_HEIGHT = 42;
const SNAP_TOP = 0;
const SNAP_BOTTOM = height - TABBAR_HEIGHT - MINIMIZED_PLAYER_HEIGHT;
const config = {
	damping: 15,
	mass: 1,
	stiffness: 150,
	overshootClamping: false,
	restSpeedThreshold: 0.1,
	restDisplacementThreshold: 0.1
};

export default () => {
	const translationY = new Value(0);
	const velocityY = new Value(0);
	const state = new Value(State.UNDERTERMINED);
	const gestureHandler = onGestureEvent({
		translationY,
		state,
		velocityY
	});
	const translateY = up ? SNAP_TOP : SNAP_BOTTOM;
	const translateBottomTab = 0;
	return (
		<PanGestureHandler {...gestureHandler}>
			<Animated.View style={[ styles.playerSheet, { transform: [ { translateY } ] } ]}>
				<Player onPress={() => setUP(true)} />
				<View
					style={{
						opacity: up ? 0 : 1,
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						height: MINIMIZED_PLAYER_HEIGHT
					}}
				>
					<HalfPlayer />
				</View>
			</Animated.View>
		</PanGestureHandler>
	);
};

const styles = StyleSheet.create({
	playerSheet: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'cyan'
	},
	container: {
		backgroundColor: '#272829',
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: TABBAR_HEIGHT,
		flexDirection: 'row',
		borderTopColor: 'black',
		borderWidth: 1
	}
});
