import { Platform } from 'react-native';

export const audio =
	Platform.OS === 'ios'
		? require('../assets/ios-icons/audio-wave-ios.png')
		: require('../assets/android-icons/audio-wave-android.png');
export const folder =
	Platform.OS === 'ios'
		? require('../assets/ios-icons/folder-ios.png')
		: require('../assets/android-icons/folder-android.png');

const Icons = {
	audio: audio,
	folder: folder
};

export default Icons;
