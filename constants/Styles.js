import Colors from "./Colors";
import { SCREEN_WIDTH } from "./Sizes";

const Styles = {
  // General Styles
  transparentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  boxShadow: {
    elevation: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    width: SCREEN_WIDTH / 1.5,
    alignItems: "center",
    justifyContent: "center"
  },
  modalTitle: {
    fontSize: 24,
    color: Colors.black,
    textAlign: "center"
  },
  modalDescription: {
    fontSize: 18,
    color: Colors.gray,
    marginBottom: 20,
    textAlign: "center"
  },
  modalTextInput: {
    width: "100%",
    height: 40,
    marginBottom: 25,
    borderColor: "gray",
    borderBottomWidth: 3,
    borderRadius: 10,
    color: "#333",
    fontSize: 20,
    textAlign: "center"
  }
};

export default Styles;
