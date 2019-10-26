import React from 'react';

import { View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { STATUS_BAR_HEIGHT, SCREEN_WIDTH } from '../constants/Sizes';

const Header = ({ title }) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ ...styles.statusBar, backgroundColor: 'blue' }} />
			<View style={{ backgroundColor: 'blue' }}>
				<View style={styles.header}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>{title}</Text>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Header;

const baseHeaderHeight = 60;
const statusBarHeight = STATUS_BAR_HEIGHT;
const settingsSize = baseHeaderHeight / 2;
const styles = StyleSheet.create({
	statusBar: {
		marginTop: -statusBarHeight,
		height: statusBarHeight + 70
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
		marginHorizontal: 20,
		marginVertical: 10,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},

	title: {
		color: '#eee',
		fontWeight: 'bold',
		fontSize: 36,
		flex: 1
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