import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SCREEN_WIDTH } from "../constants/Sizes";
import Icons from "../constants/Icons";
import Colors from "../constants/Colors";

const FileCard = ({ file, style }) => {
  const { uri, name, isDirectory } = file;

  const borderColor = isDirectory ? Colors.primary : Colors.gray;
  const image = isDirectory ? Icons.folder : Icons.audio;

<<<<<<< HEAD
  return (
    <View style={style}>
      <TouchableOpacity
        onPress={() =>
          alert(
            `uri: ${uri}, isDirectory: ${isDirectory}, name: ${name}, children ${children}`
          )
        }
      >
        <View style={[styles.item, { borderColor: borderColor }]}>
          <Image source={image} style={styles.image} />
          <Text style={styles.itemText}>{file.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
=======
	return (
		<View style={style}>
			<TouchableOpacity onPress={() => alert(`uri: ${uri}, name: ${name}, isDirectory: ${isDirectory}`)}>
				<View style={[ styles.item, { borderColor: borderColor } ]}>
					<Image source={image} style={styles.image} />
					<Text style={styles.itemText}>{file.name}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
>>>>>>> c3e462d7a7a7366806f0782daa5377b921dac2df
};

const styles = StyleSheet.create({
  item: {
    height: "auto",
    padding: 10,
    marginTop: 10,
    width: SCREEN_WIDTH - 20,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.13,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "flex-start",
    borderWidth: 2,
    flexDirection: "row"
  },
  itemText: {
    marginLeft: 10,
    flex: 1,
    alignSelf: "center"
  },
  image: {
    height: 20,
    width: 20
  }
});

export default FileCard;
