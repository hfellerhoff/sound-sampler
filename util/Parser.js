export const getParentDirectory = uri => {
  const uriArray = uri.split("/");
  const parentArray = uriArray.slice(0, uriArray.length - 2);
  console.log(parentArray.toString());
  const parentDirectory = parentArray.join("/");
  console.log(parentDirectory);
  return parentDirectory;
};

export const getNameFromUri = uri => {
  const array = uri.split("/");
  return array[array.length - 1];
};
