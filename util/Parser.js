export const getParentDirectory = (uri) => {
	const array = uri.split('/');
	const parentArray = array[(0, array.length - 2)];
	return parentArray.join('/');
};

export const getNameFromUri = (uri) => {
	const array = uri.split('/');
	return array[array.length - 1];
};
