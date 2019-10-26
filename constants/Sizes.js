import { Platform, Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');
export const getStatusBarHeight = () => {
	if (Platform.OS === 'android') return 24;
	else if (isiPhoneX())
		return 34; // Actual Height is 44, but using 34 as it works better with styles
	else return 20;
};

export const isiPhoneX = () => Platform.OS === 'ios' && (isIPhoneXSize || isIPhoneXrSize);
const isIPhoneXSize = SCREEN_HEIGHT == 812 || SCREEN_WIDTH == 812;
const isIPhoneXrSize = SCREEN_HEIGHT == 896 || SCREEN_WIDTH == 896;

export const BOTTOM_BAR_HEIGHT = isiPhoneX() ? 17 : 0; // Actual Height is 34, but using 17 as it works better with styles
export const STATUS_BAR_HEIGHT = getStatusBarHeight();
