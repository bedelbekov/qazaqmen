//import liraries
import React, { Component } from "react";
import { StyleSheet, FlatList, Dimensions, BackHandler } from "react-native";
import { ListItem } from "react-native-elements";
import colors from "../../components/colors";
import font from "../../components/font";

class TraditionListScreen extends Component {
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
    traditions: []
  };
  componentDidMount() {
    this.setState({
      traditions: this.props.navigation.getParam("traditions")
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
  itemPressed = item => {
    this.props.navigation.navigate("Tradition", { item, title: item.name });
    //console.log(item);
    //console.log(this.state.traditions);
  };
  renderItem = ({ item }) => (
    <ListItem
      titleStyle={styles.titleStyle}
      title={item.name}
      chevronColor={colors.primarydark}
      onPress={() => this.itemPressed(item)}
      avatar={require("../../components/images/uzors/listitemuzor.png")}
      avatarStyle={{ backgroundColor: "#fff" }}
      containerStyle={styles.listItem}
    />
  );
  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <FlatList
        data={this.state.traditions}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  listItem: {
    backgroundColor: "#fff"
  },
  titleStyle: {
    color: "#4A4A4A",
    fontFamily: font,
    fontWeight: "100",
    fontSize: 16
  },
  item: {
    width: Dimensions.get("window").width - 20,
    padding: 10,
    fontSize: 18,
    height: 44
  }
});

//make this component available to the app
export default TraditionListScreen;
