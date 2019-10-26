import React, { useState } from 'react';
import FileDisplay from './FileDisplay';

const FileManager = (props) => {
	const [ files, setFiles ] = useState([]);

	const getDirectory = (uri) => {};
	const getFile = (uri) => {};

	return <FileDisplay files={files} getDirectory={getDirectory} getFile={getFile} />;
};

export default FileManager;
