import React, { Component } from "react";
import { Text, Image, TouchableOpacity, StyleSheet, View } from "react-native";
import colors from "../colors";
import font from "../font";

interface IProps {
  text: string;
  onPress: () => void;
}

class CustomButton extends Component<IProps> {
  render() {
    const { text, onPress } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => onPress()}>
          <Image
            style={styles.imageView}
            source={require("../../components/images/uzors/leftuzor.png")}
          />
          <Text style={styles.textStyle}>{text}</Text>
          <Image
            style={styles.imageView}
            source={require("../../components/images/uzors/rightuzor.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  buttonStyle: {
    margin: 10,
    backgroundColor: colors.primarydark,
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  textStyle: {
    width: "85%",
    fontSize: 14,
    color: "white",
    fontFamily: font,
    textAlign: "center"
  },
  imageView: {
    width: 20,
    height: 20
  }
});

export default CustomButton;
