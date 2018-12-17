import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  BackHandler
} from "react-native";
import { ListItem } from "react-native-elements";
import colors from "../../components/colors";
import font from "../../components/font";

interface Props {
  onCloseModal: () => void;
  quiz: Array<Object>;
}

class AnswersScreen extends Component<Props> {
  state = {
    questions: []
  };
  componentDidMount() {
    this.setState({
      questions: this.props.quiz
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    this.props.onCloseModal;
    return true;
  };
  renderItem = ({ item }) => (
    <ListItem
      title={
        <View style={{ flex: 1, flexDirection: "row", margin: 10 }}>
          <Text style={styles.titleStyle}>{item.text}</Text>
        </View>
      }
      subtitle={
        <View style={{ flex: 1, flexDirection: "row", margin: 10 }}>
          <Text style={styles.subtitleStyle}>
            {"Ответ: " + item.answers[item.correctAnswer]}
          </Text>
        </View>
      }
      avatar={require("../../components/images/uzors/listitemuzor.png")}
      avatarStyle={{ backgroundColor: "#fff" }}
      containerStyle={styles.listItem}
      hideChevron
    />
  );
  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.questions}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
        <View style={styles.position}>
          <TouchableOpacity onPress={this.props.onCloseModal}>
            <Image
              style={styles.socialImage}
              source={require("../../components/images/cancel.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "#fff"
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  position: {
    position: "absolute",
    bottom: 20,
    right: 20
  },
  socialImage: {
    width: 35,
    height: 35,
    margin: 10,
    borderColor: colors.primarydark,
    borderWidth: 1,
    borderRadius: 17.5
  },
  listItem: {
    backgroundColor: "#fff"
  },
  titleStyle: {
    color: "black",
    fontFamily: font,
    fontWeight: "100",
    fontSize: 16,
    flexWrap: "wrap",
    width: "90%"
  },
  subtitleStyle: {
    color: colors.grey,
    fontFamily: font,
    fontWeight: "bold",
    fontSize: 14,
    flexWrap: "wrap",
    width: "90%"
  }
});

export default AnswersScreen;
