export const getParentDirectory = (uri) => {
	const uriArray = uri.split('/');
	const parentArray = uriArray.slice(0, uriArray.length - 2);
	const parentDirectory = parentArray.join('/');
	return parentDirectory;
};

export const getNameFromUri = (uri) => {
	const array = uri.split('/');
	if (array[array.length - 1] === '') return array[array.length - 2];
	else array[array.length - 1];
};