import React from 'react';
import { TouchableOpacity } from 'react-native';
import ButtonDisplay from './ButtonDisplay';

const ButtonOpacity = (props) => {
	const { style, title, titleStyle } = props;
	const { onPress, onPressIn } = props;
	return (
		<TouchableOpacity onPress={onPress} onPressIn={onPressIn}>
			<ButtonDisplay title={title} style={style} titleStyle={titleStyle} />
		</TouchableOpacity>
	);
};

export default ButtonOpacity;
