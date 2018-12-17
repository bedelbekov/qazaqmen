//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  BackHandler
} from "react-native";
import colors from "../../components/colors";
import font from "../../components/font";
interface Props {
  onCloseModal: () => void;
}
class InfoScreen extends Component<Props> {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.onCloseModal;
    return true;
  };

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <View style={styles.logoBox}>
            <Image
              style={styles.imageView}
              source={require("../../components/images/logo/logo.png")}
            />
            <Text style={styles.logoText}> QAZAQMEN </Text>
            <Text style={styles.descriptionText}>
              Cоциальное приложение, которое поможет познать и чтить традиции
              Казахстана.
              {/* QazaqMen is a social app that lets you know and respect traditions
            of Kazakhstan. */}
            </Text>
          </View>
          <View style={styles.buttonsBox}>
            <Text style={styles.infoText}>App Version:</Text>
            <Text style={styles.infoText}>1.0.0</Text>
          </View>
        </View>
        <View style={styles.position}>
          <TouchableOpacity onPress={this.props.onCloseModal}>
            <Image
              style={styles.socialImage}
              source={require("../../components/images/cancel.png")}
            />
          </TouchableOpacity>
        </View>
      </React.Fragment>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  position: {
    position: "absolute",
    top: 25,
    right: 10
  },
  socialImage: {
    width: 35,
    height: 35,
    margin: 10,
    borderColor: colors.primarydark,
    borderWidth: 1,
    borderRadius: 17.5
  },
  socialIcons: {
    flexDirection: "row"
  },
  logoBox: {
    flex: 1,
    marginTop: 64,
    margin: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonsBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imageView: {
    margin: 30,
    width: 150,
    height: 150
  },
  logoText: {
    fontSize: 30,
    color: colors.primarydark,
    fontWeight: "100",
    fontFamily: font
  },
  descriptionText: {
    fontSize: 15,
    maxWidth: 300,
    color: colors.grey,
    fontWeight: "100",
    fontFamily: font,
    margin: 10,
    textAlign: "center"
  },
  infoText: {
    fontSize: 15,
    color: colors.grey,
    fontWeight: "100",
    fontFamily: font,
    textAlign: "center"
  },
  buttonStyle: {
    margin: 10,
    backgroundColor: colors.primary,
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderRadius: 8
  }
});

export default InfoScreen;
