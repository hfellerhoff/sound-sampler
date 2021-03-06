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
const rightCaret =
  Platform.OS === 'ios'
    ? require('../assets/ios-icons/caret-ios.png')
    : require('../assets/android-icons/caret-android.png');
const downCaret =
  Platform.OS === 'ios'
    ? require('../assets/ios-icons/down-caret-ios.png')
    : require('../assets/android-icons/down-caret-android.png');
const del =
  Platform.OS === 'ios'
    ? require('../assets/ios-icons/delete-ios.png')
    : require('../assets/android-icons/delete-android.png');
const fastForward =
  Platform.OS === 'ios'
    ? require('../assets/ios-icons/fast-forward-ios.png')
    : require('../assets/android-icons/fast-forward-android.png');
const rewind =
  Platform.OS === 'ios'
    ? require('../assets/ios-icons/rewind-ios.png')
    : require('../assets/android-icons/rewind-android.png');
const play =
  Platform.OS === 'ios'
    ? require('../assets/ios-icons/play-ios.png')
    : require('../assets/android-icons/play-android.png');
const pause =
  Platform.OS === 'ios'
    ? require('../assets/ios-icons/pause-ios.png')
    : require('../assets/android-icons/pause-android.png');
const loop =
  Platform.OS === 'ios'
    ? require('../assets/ios-icons/loop-ios.png')
    : require('../assets/android-icons/loop-android.png');

const Icons = {
  audio,
  folder,
  addFolder,
  rightCaret,
  downCaret,
  delete: del,
  fastForward,
  rewind,
  play,
  pause,
  loop,
};

export default Icons;
