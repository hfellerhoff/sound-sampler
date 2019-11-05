import { Platform, Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
  'screen'
);
export const getStatusBarHeight = () => {
  if (Platform.OS === 'android') return 24;
  if (isiPhoneX()) return 34; // Actual Height is 44, but using 34 as it works better with styles
  return 20;
};

export const isiPhoneX = () =>
  Platform.OS === 'ios' && (isIPhoneXSize || isIPhoneXrSize);
const isIPhoneXSize = SCREEN_HEIGHT === 812 || SCREEN_WIDTH === 812;
const isIPhoneXrSize = SCREEN_HEIGHT === 896 || SCREEN_WIDTH === 896;

const getBottomBarHeight = () => {
  if (isiPhoneX()) return 17; // Actual Height is 34, but using 17 as it works better with styles
  if (Platform.OS === 'android') return 12; // Actual Height is 48 (maybe 24?), but using 12 as it works better with styles
  return 0;
};

export const BOTTOM_BAR_HEIGHT = getBottomBarHeight();
export const STATUS_BAR_HEIGHT = getStatusBarHeight();

export const KEYBOARD_HEIGHT = isiPhoneX() ? 333 : 216; // Deprecated - get size off keyboard instead
