export const getParentDirectory = uri => {
  const uriArray = uri.split("/");
  const parentArray = uriArray.slice(0, uriArray.length - 2);
  const parentDirectory = parentArray.join("/");
  return parentDirectory;
};

export const getNameFromUri = uri => {
  const array = uri.split("/");
  if (array[array.length - 1] === "") return array[array.length - 2];
  return array[array.length - 1];
};

/*
	A function to parse a valid file name from a user's desired rename.
	@return: Null if invalid, the parsed name otherwise
*/
export const parseFilename = (name, extension) => {
  if (!name || name === "") return null;
  let parsedName = name.split(" ").join("-");
  parsedName = removeAll(parsedName, ['"', "”", "/", "\\", ";", "|", "'", "’"]);
  if (extension) parsedName += extension;
  return parsedName;
};

const removeAll = (string, delimiterArray) => {
  let parsedString = string;
  delimiterArray.forEach(delimiter => {
    parsedString = parsedString.split(delimiter).join("");
  });
  return parsedString;
};
