//import liraries
import React, { Component } from "react";
import { Modal, View, Text, StyleSheet, Image } from "react-native";
import api from "../../api";
import colors from "../../components/colors";
import CustomButton from "../../components/buttons/CustomButton";
import Loader from "../../components/loader";
import InfoScreen from "../info";
import font from "../../components/font";

class MainScreen extends Component {
  state = {
    loading: false,
    modalVisible: false
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  static navigationOptions = {
    header: null // !!! Hide Header
  };

  addQuestion = () => {
    let item = api.collection("quiz");
    item.doc("question12").set({
      id: 12,
      answers: ["Араша", "Кутты болсын айту", "Токымкагар"],
      correctAnswer: 2,
      text: "Прежде, чем отправится в дальнюю дорогу, нужно сделать обряд..."
    });
  };
  addTradition = () => {
    for (let i = 0; i < 10; i++) {
      let item = api.collection("traditions");
      item
        .doc("categories")
        .collection("death")
        .doc()
        .set({
          id: i + 2,
          image: "",
          name: "",
          text: ""
        });
    }
  };
  getQuestions = arr => {
    let result = Array();
    //let randArr = Array();
    let n = 0;
    while (n <= 11) {
      let item = Math.floor(Math.random() * arr.length);
      if (!result.includes(arr[item])) {
        //console.log(item);
        result.push(arr[item]);
        n += 1;
      }
    }
    //console.log(item);
    return result;
  };

  testButtonPressed = async () => {
    // const docRef = ref.doc("question");
    let quiz = new Array();
    let questions = new Array();
    await this.setState({
      loading: true
    });
    await api
      .collection("quiz")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.data());
          quiz.push(doc.data());
        });
      });
    questions = await this.getQuestions(quiz);
    await this.props.navigation.navigate("Quiz", { questions });
    await this.setState({
      loading: false
    });
  };

  libButtonPressed = () => {
    this.props.navigation.navigate("Library");
  };

  infoButtonPressed = () => {
    this.props.navigation.navigate("Info");
  };

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <InfoScreen
            onCloseModal={() => {
              this.setModalVisible(false);
            }}
          />
        </Modal>

        <View style={styles.logoBox}>
          <Image
            style={styles.imageView}
            source={require("../../components/images/logo/logo.png")}
          />
          <Text style={styles.logoText}> QAZAQMEN </Text>
          <Text style={styles.descriptionText}>
            Cоциальное приложение, которое поможет познать и чтить традиции
            Казахстана
            {/* QazaqMen is a social app that lets you know and respect traditions
            of Kazakhstan. */}
          </Text>
        </View>
        <View style={styles.buttonsBox}>
          <CustomButton onPress={this.testButtonPressed} text="Проверь себя" />
          <CustomButton
            onPress={this.libButtonPressed}
            text="Библиотека традиций"
          />
          <CustomButton
            onPress={() => {
              this.setModalVisible(true);
            }}
            text="О приложении"
          />
        </View>
      </View>
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
    maxWidth: 300,
    fontSize: 15,
    color: colors.grey,
    fontWeight: "100",
    fontFamily: font,
    margin: 10,
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

export default MainScreen;
