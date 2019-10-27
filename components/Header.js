import React from 'react';

import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	Platform,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Image
} from 'react-native';
import { STATUS_BAR_HEIGHT, SCREEN_WIDTH } from '../constants/Sizes';
import Colors from '../constants/Colors';
import Icons from '../constants/Icons';

const Header = ({ title, onPress, onGoBack }) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.statusBar} />
			<View style={{ backgroundColor: Colors.primary }}>
				<View style={styles.header}>
					<TouchableWithoutFeedback onPress={onGoBack}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>{title}</Text>
						</View>
					</TouchableWithoutFeedback>
					<TouchableOpacity style={styles.imageButton} onPress={onPress}>
						<Image source={Icons.addFolder} style={styles.image} />
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Header;

const baseHeaderHeight = 60;
const statusBarHeight = STATUS_BAR_HEIGHT;
const styles = StyleSheet.create({
	statusBar: {
		marginTop: -statusBarHeight,
		height: statusBarHeight + 70 + (Platform.OS === 'android' ? 10 : 0),
		backgroundColor: Colors.primary
	},
	container: {
		marginTop: Platform.OS === 'android' ? 24 : 0,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 5,
		shadowOpacity: 0.26,
		elevation: 5
	},

	header: {
		width: SCREEN_WIDTH,
		alignItems: 'flex-start',
		justifyContent: 'center',
		flexDirection: 'row'
	},

	titleContainer: {
		marginLeft: 15,
		marginBottom: 5,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},

	title: {
		color: '#eee',
		fontWeight: 'bold',
		fontSize: 36,
		flex: 1
	},

	imageButton: {
		alignItems: 'center',
		justifyContent: 'center'
	},

	image: {
		height: 30,
		width: 30,
		marginRight: 15,
		marginTop: 3
	}
});

// const Header = (props) => {
// 	const { title } = props;

// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<View style={styles.statusBar}>
// 				<Text style={styles.text}>{title}</Text>
// 			</View>
// 		</SafeAreaView>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		width: SCREEN_WIDTH,
// 		marginTop: Platform.OS === 'android' ? 24 : 10,
// 		backgroundColor: 'red',
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		justifyContent: 'center'
// 	},
// 	statusBar: {
// 		width: SCREEN_WIDTH,
// 		marginTop: getStatusBarHeight(),
// 		height: 80,
// 		backgroundColor: 'blue'
// 	},
// 	text: {
// 		fontSize: 32,
// 		alignSelf: 'flex-start'
// 	}
// });

// export default Header;
