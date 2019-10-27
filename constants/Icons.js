import { Platform } from 'react-native';

const audio =
	Platform.OS === 'ios'
		? require('../assets/ios-icons/audio-wave-ios.png')
		: require('../assets/android-icons/audio-wave-android.png');
const folder =
	Platform.OS === 'ios'
		? require('../assets/ios-icons/folder-ios.png')
		: require('../assets/android-icons/folder-android.png');
const addFolder =
	Platform.OS === 'ios'
		? require('../assets/ios-icons/add-folder-ios.png')
		: require('../assets/android-icons/add-folder-android.png');

const Icons = {
	audio: audio,
	folder: folder,
	addFolder: addFolder
};

export default Icons;
