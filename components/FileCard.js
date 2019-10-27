import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { SCREEN_WIDTH } from '../constants/Sizes';
import Icons from '../constants/Icons';
import Colors from '../constants/Colors';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated, { interpolate } from 'react-native-reanimated';
// import { getParentDirectory } from '../util/Parser';

const FileCard = ({ file, bottomStyle, requestDirectory, moveFile, deleteFile, currentDirectory, setSelectedUri }) => {
	const { uri, name, isDirectory } = file;

	const borderColor = isDirectory ? Colors.primary : Colors.gray;
	const image = isDirectory ? Icons.folder : Icons.audio;

	const onFileClick = () => {
		if (isDirectory) {
			requestDirectory(uri);
		} else {
			setSelectedUri(uri);
			// alert(`uri: ${uri}, name: ${name}, isDirectory: ${isDirectory}`);
		}
	};

	const onLongPress = () => {
		setSelectedUri(uri);
	};

	const LeftActions = (progress, dragX) => {
		// const scale = interpolate(dragX, {
		// 	inputRange: [ 0, 100 ],
		// 	outputRange: [ 0, 1 ]
		// 	// extrapolate: Extrapolate.CLAMP
		// });
		return (
			<View style={styles.leftAction}>
				<Animated.Text style={styles.leftActionText}>Export</Animated.Text>
			</View>
		);
	};

	const RightActions = (progress, dragX) => {
		return (
			<View style={styles.rightAction}>
				<Text style={styles.rightActionText}>Delete</Text>
			</View>
		);
	};

	return (
		<View>
			<View style={{ marginTop: 10 }} />
			<Swipeable
				renderLeftActions={LeftActions}
				renderRightActions={RightActions}
				onSwipeableLeftWillOpen={() => moveFile(uri)}
				onSwipeableRightWillOpen={() => deleteFile(uri)}
			>
				<View>
					<TouchableWithoutFeedback onPress={onFileClick} delayPressIn={100} onLongPress={onLongPress}>
						<View style={[ styles.item, { borderColor: borderColor } ]}>
							<Image source={image} style={styles.image} />
							<Text style={styles.itemText}>{file.name}</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</Swipeable>
			<View style={bottomStyle} />
		</View>
	);
};

const styles = StyleSheet.create({
	item: {
		height: 'auto',
		padding: 10,
		// marginTop: 10,
		width: SCREEN_WIDTH - 20,
		backgroundColor: '#fff',
		elevation: 3,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.13,
		borderRadius: 10,
		alignSelf: 'center',
		justifyContent: 'flex-start',
		borderWidth: 2,
		flexDirection: 'row'
	},
	itemText: {
		marginLeft: 10,
		flex: 1,
		alignSelf: 'center'
	},
	image: {
		height: 20,
		width: 20
	},
	leftAction: {
		backgroundColor: Colors.fileLeftAction,
		justifyContent: 'center',
		alignSelf: 'center',
		left: 10,
		width: SCREEN_WIDTH - 20,
		height: '100%',
		borderRadius: 10
	},
	rightAction: {
		backgroundColor: Colors.fileRightAction,
		justifyContent: 'center',
		alignSelf: 'center',
		right: -10,
		width: SCREEN_WIDTH - 20,
		height: '100%',
		borderRadius: 10,
		alignItems: 'flex-end'
	},
	leftActionText: {
		color: 'white',
		paddingHorizontal: 10,
		fontWeight: '600'
	},
	rightActionText: {
		color: 'white',
		paddingHorizontal: 10,
		fontWeight: '600'
	}
});

export default FileCard;
