//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  BackHandler
} from "react-native";
import colors from "../../components/colors";
import api from "../../api";
import Loader from "../../components/loader";
import font from "../../components/font";
class LibraryScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }
  categories = [
    "Рождение ребенка",
    "Воспитание ребенка",
    "Жизненные традиции",
    "Гостеприимство",
    "Свадьба",
    "Погребальные традиции"
  ];
  images = [
    require("../../components/images/categories/birth.png"),
    require("../../components/images/categories/growth.png"),
    require("../../components/images/categories/lifetime.png"),
    require("../../components/images/categories/guests.png"),
    require("../../components/images/categories/wedding.png"),
    require("../../components/images/categories/death.png")
  ];
  firebaseCategories = [
    "birth",
    "growth",
    "other",
    "guests",
    "wedding",
    "death"
  ];
  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.center}
        onPress={() => this.categoryPressed(index)}
      >
        <View style={[styles.box, styles.center]}>
          <Image style={styles.image} source={this.images[index]} />
        </View>
        <Text style={styles.nameStyle}>{item}</Text>
      </TouchableOpacity>
    );
  };

  categoryPressed = async index => {
    await this.setState({
      loading: true
    });
    let traditions = new Array();
    //console.log("hello");
    await api
      .collection("traditions")
      .doc("categories")
      .collection(this.firebaseCategories[index])
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.data());
          traditions.push(doc.data());
        });
      });
    //console.log(traditions);
    await this.props.navigation.navigate("TraditionList", {
      traditions,
      title: this.categories[index]
    });
    await this.setState({
      loading: false
    });
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  private handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  render() {
    // console.log(Dimensions.get("window").width);
    // console.log(Dimensions.get("window").height);
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <FlatList
          contentContainerStyle={[styles.list, styles.center]}
          data={this.categories}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          scrollEnabled={false}
        />
      </View>
    );
  }
}
const boxWidth = Dimensions.get("window").width / 2 - 35;
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    flexDirection: "column",
    backgroundColor: "white",
    width: "100%",
    height: "100%"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  nameStyle: {
    alignSelf: "center",
    textAlign: "center",
    flexWrap: "wrap",
    width: boxWidth,
    fontFamily: font,
    fontSize: 14,
    color: colors.grey
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  box: {
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 0,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: colors.primarydark,
    width: Dimensions.get("window").width > 500 ? 250 : boxWidth,
    height: Dimensions.get("window").height > 800 ? 250 : boxWidth,
    overflow: "hidden"
  }
});

//make this component available to the app
export default LibraryScreen;
