import { Alert } from "react-native";

const sendSingleButtonAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    // eslint-disable-next-line no-console
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );
};

export default sendSingleButtonAlert;
