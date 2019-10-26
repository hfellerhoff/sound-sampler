import React, { useState } from 'react';
import FileDisplay from './FileDisplay';
import { DUMMY_FILES } from '../constants/Dummy';

const FileManager = (props) => {
	const [ files, setFiles ] = useState(DUMMY_FILES);

	const getDirectory = (uri) => {};
	const getFile = (uri) => {};

	return <FileDisplay files={files} getDirectory={getDirectory} getFile={getFile} />;
};

export default FileManager;
