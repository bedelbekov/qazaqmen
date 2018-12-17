//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  BackHandler,
  ActivityIndicator
} from "react-native";
import colors from "../../components/colors";
import font from "../../components/font";

// create a component
class Tradition extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center",
      fontWeight: "500",
      fontSize: 15
    },
    headerStyle: {
      backgroundColor: "white"
    }
  });

  state = {
    text: "text",
    name: "name",
    image: "image",
    loading: false
  };
  componentDidMount() {
    const item = this.props.navigation.getParam("item");
    this.setState({
      text: item.text,
      name: item.name,
      image: item.image
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };

  onLoad = loading => {
    this.setState({
      loading: loading
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoBox}>
          <View style={styles.imageBox}>
            <Image
              style={styles.imageView}
              resizeMode="stretch"
              source={{ uri: this.state.image }}
              onLoadStart={() => {
                this.onLoad(true);
              }}
              onLoad={() => {
                this.onLoad(false);
              }}
            />
            <ActivityIndicator
              style={styles.indicator}
              size={"small"}
              color={colors.primarydark}
              animating={this.state.loading}
            />
          </View>
          <View style={styles.textBox}>
            <ScrollView>
              <Text style={styles.textInfo}>{this.state.text}</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
const boxWidth = Dimensions.get("window").width - 40;
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white
  },
  indicator: {
    position: "absolute",
    alignSelf: "center",
    top: "50%"
  },
  imageView: {
    flex: 1
  },
  infoBox: {
    margin: 10,
    width: boxWidth,
    flex: 3,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: colors.primarydark
  },
  imageBox: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.primarydark,
    overflow: "hidden"
  },
  textBox: {
    flex: 2,
    margin: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.primarydark,
    height: 300
  },
  textInfo: {
    fontSize: 15,
    color: colors.grey,
    fontFamily: font,
    textAlign: "justify",
    fontWeight: "200",
    margin: 10
  }
});

//make this component available to the app
export default Tradition;
