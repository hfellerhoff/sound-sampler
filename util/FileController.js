import { Platform } from "react-native";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Audio } from "expo-av";
import { parseFilename } from "./Parser";

/*
  Exports a file or directory using native sharing.
    @string uri: The uri of the file or directory to be executed.
*/
const exportData = async uri => {
  Sharing.shareAsync(uri);
};

/*
  Changes the name of a file in the file system.
    @string oldUri: The uri of the file that needs to be renamed.
    @string newName: The desired new name of the file.
    @object files: The list of files in the current directory.
*/
const changeFilename = async (oldUri, newName, files) => {
  const audioType = Platform.OS === "ios" ? ".caf" : ".m4a";
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    if (oldUri === file.uri) {
      const newTo = oldUri.replace(file.name, "");
      // eslint-disable-next-line no-await-in-loop
      const fileInfo = await FileSystem.getInfoAsync(file.uri);

      let parsedName;
      if (!fileInfo.isDirectory) parsedName = parseFilename(newName, audioType);
      else parsedName = parseFilename(newName);

      const options = {
        from: oldUri,
        to: newTo + parsedName
      };

      FileSystem.copyAsync(options).then(() => {
        FileSystem.deleteAsync(oldUri);
      });
    }
  }
};

/*
  Deletes a file at a specified URI.
    @string uri: The uri of the file to delete.
*/
const deleteFile = async uri => {
  FileSystem.deleteAsync(uri);
};

/*
  Moves a file in the FileSystem from one uri to another.
    @string oldUri: The uri of the file that should be moved.
    @string newUri: The desired new location of the file.
*/
const moveFile = async (oldUri, newUri) => {
  const options = {
    from: oldUri,
    to: newUri
  };
  await FileSystem.moveAsync(options);
};

/*
  Fetches a sound file from a specified uri.
    @string uri: The uri of the sound file to fetch.
*/
const fetchAndPlaySoundFile = async uri => {
  const soundObject = new Audio.Sound();
  soundObject.setVolumeAsync(1);

  soundObject.loadAsync({ uri }).then(() => {
    soundObject.playAsync();
  });
};

/*
  Returns a list of the files in the current directory.
    @string directoryUri: The uri of the directory to fetch from.
*/
const fetchFilesFrom = async directoryUri => {
  const tempData = [];
  await FileSystem.readDirectoryAsync(directoryUri).then(async data => {
    // eslint-disable-next-line no-restricted-syntax
    for (const file of data) {
      // eslint-disable-next-line no-await-in-loop
      await FileSystem.getInfoAsync(directoryUri + file).then(
        async fileInfo => {
          tempData.push({
            name: file,
            uri: directoryUri + file,
            isDirectory: fileInfo.isDirectory
          });
        }
      );
    }
  });
  return tempData;
};

/*
  Moves any new files in the cache to a specified directory.
    @string directoryUri: The URI of the directory to place the files in.
*/
const moveCacheToDirectory = async directoryUri => {
  const audioDirectoryName = Platform.OS === "ios" ? "AV/" : "Audio/";
  const directoryName = FileSystem.cacheDirectory + audioDirectoryName;

  await FileSystem.readDirectoryAsync(directoryName).then(data => {
    data.forEach(file => {
      moveFile(directoryName + file, directoryUri + file);
    });
  });
};

/*
  Creates a new directory.
    @string uri: The uri of the parent directory.
    @string name: The desired directory name.
*/
const createDirectory = async (uri, name) => {
  FileSystem.makeDirectoryAsync(uri + name);
};

const FileController = {
  exportData,
  changeFilename,
  fetchFilesFrom,
  createDirectory,
  deleteFile,
  fetchAndPlaySoundFile,
  moveFile,
  moveCacheToDirectory
};

export default FileController;