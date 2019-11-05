import { Platform } from 'react-native';

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Audio } from 'expo-av';
import { parseFilename, getNameFromUri } from './Parser';
import { File } from '../constants/Interfaces';

// Exports a file or directory using native sharing.
const exportData = async (uri: string) => {
  Sharing.shareAsync(uri);
};

// Changes the name of a file in the file system.
const changeFilename = async (oldUri: string, newName: string) => {
  const audioType = Platform.OS === 'ios' ? '.caf' : '.m4a';
  const oldFilename = getNameFromUri(oldUri);
  const desiredLocation = oldUri.replace(oldFilename, '');
  const fileInfo = await FileSystem.getInfoAsync(oldUri);
  let parsedName;
  if (!fileInfo.isDirectory) parsedName = parseFilename(newName, audioType);
  else parsedName = parseFilename(newName);
  const options = {
    from: oldUri,
    to: desiredLocation + parsedName,
  };
  await FileSystem.copyAsync(options).then(() => {
    FileSystem.deleteAsync(oldUri);
  });
};

// Deletes a file at a specified URI.
const deleteFile = async (uri: string) => {
  await FileSystem.deleteAsync(uri);
};

// Moves a file in the FileSystem from one uri to another.
const moveFile = async (oldUri: string, newUri: string) => {
  const options = {
    from: oldUri,
    to: newUri,
  };
  await FileSystem.moveAsync(options);
};

// Fetches a sound file from a specified uri.
const fetchSoundFile = async (uri: string) => {
  const soundObject = new Audio.Sound();
  await soundObject.loadAsync({ uri });
  await soundObject.setVolumeAsync(1);
  return soundObject;
};

// Fetches a sound file from a specified uri.
const fetchAndPlaySoundFile = async (uri: string) => {
  const soundObject = new Audio.Sound();
  await soundObject.loadAsync({ uri });
  await soundObject.setVolumeAsync(1);
  soundObject.playAsync();
};

// Returns a list of the files in the current directory.
const fetchFilesFrom = async (directoryUri: string) => {
  const tempData: File[] = [];
  await FileSystem.readDirectoryAsync(directoryUri).then(async data => {
    for (const file of data) {
      await FileSystem.getInfoAsync(directoryUri + file).then(
        async fileInfo => {
          tempData.push({
            name: file,
            uri: directoryUri + file,
            isDirectory: fileInfo.isDirectory,
            children: [], // TODO
          });
        }
      );
    }
  });
  tempData.sort((a, b) => {
    const upperA = a.name.toUpperCase();
    const upperB = b.name.toUpperCase();
    if (a.isDirectory && !b.isDirectory) return -1;
    if (!a.isDirectory && b.isDirectory) return 1;
    if (upperA < upperB) return -1;
    if (upperA > upperB) return 1;
    return 0;
  });
  return tempData;
};

// Moves any new files in the cache to a specified directory.
const moveCacheToDirectory = async (directoryUri: string) => {
  const audioDirectoryName = Platform.OS === 'ios' ? 'AV/' : 'Audio/';
  const directoryName = FileSystem.cacheDirectory + audioDirectoryName;

  await FileSystem.readDirectoryAsync(directoryName).then(data => {
    data.forEach(file => {
      moveFile(directoryName + file, directoryUri + file);
    });
  });
};

// Creates a new directory.
const createDirectory = async (uri: string, name: string) => {
  const parsedName = parseFilename(name);
  await FileSystem.makeDirectoryAsync(uri + parsedName);
};

const FileController = {
  exportData,
  changeFilename,
  fetchFilesFrom,
  createDirectory,
  deleteFile,
  fetchSoundFile,
  fetchAndPlaySoundFile,
  moveFile,
  moveCacheToDirectory,
};

export default FileController;
