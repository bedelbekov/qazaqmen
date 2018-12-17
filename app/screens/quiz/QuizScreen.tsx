//import liraries
import React, { Component } from "react";
import {
  BackHandler,
  Modal,
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";
import colors from "../../components/colors";
import CustomButton from "../../components/buttons/CustomButton";
import ResultScreen from "../result";
import font from "../../components/font";

export default class QuizScreen extends Component {
  questions = new Array();

  state = {
    text: "",
    answer0: "",
    answer1: "",
    answer2: "",
    correctAns: 0,
    score: 1,
    questionCount: 0,
    modalVisible: false
  };

  setValues = () => {
    const index = this.state.questionCount;
    this.setState({
      text: this.questions[index].text,
      answer0: this.questions[index].answers[0],
      answer1: this.questions[index].answers[1],
      answer2: this.questions[index].answers[2],
      correctAns: this.questions[index].correctAnswer
    });
  };

  async componentDidMount() {
    this.questions = this.props.navigation.getParam("questions");
    await this.setValues();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  setModalUnvisible = () => {
    this.setState({ modalVisible: false });
    this.props.navigation.goBack();
  };

  testButtonPressed = async index => {
    if (this.state.questionCount < 11) {
      if (this.state.correctAns === index) {
        await this.setState({
          questionCount: this.state.questionCount + 1,
          score: this.state.score + 1
        });
      } else {
        await this.setState({
          questionCount: this.state.questionCount + 1
        });
      }
      await this.setValues();
    } else {
      //console.log(this.state.score);
      this.setModalVisible(true);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalUnvisible();
          }}
        >
          <ResultScreen
            onCloseModal={() => {
              this.setModalUnvisible();
            }}
            score={Math.round((this.state.score / 12) * 100)}
            quiz={this.questions}
          />
        </Modal>

        <View style={styles.questionBox}>
          <Image
            style={[styles.uzorView, styles.topPosition]}
            source={require("../../components/images/uzors/uzorbottom.png")}
          />
          <Text style={styles.questionText}>{this.state.text}</Text>
          <Image
            style={[styles.uzorView, styles.bottomPosition]}
            source={require("../../components/images/uzors/uzortop.png")}
          />
        </View>
        <View style={styles.buttonsBox}>
          <CustomButton
            onPress={() => this.testButtonPressed(0)}
            text={this.state.answer0}
          />
          <CustomButton
            onPress={() => this.testButtonPressed(1)}
            text={this.state.answer1}
          />
          <CustomButton
            onPress={() => this.testButtonPressed(2)}
            text={this.state.answer2}
          />
          <Text style={styles.questionCount}>
            {" "}
            {this.state.questionCount + 1}
            /12{" "}
          </Text>
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
  uzorView: {
    margin: 10,
    width: 250,
    height: 30
  },
  topPosition: {
    position: "absolute",
    top: 10
  },
  bottomPosition: {
    position: "absolute",
    bottom: 10
  },
  questionCount: {
    fontSize: 15,
    color: colors.grey,
    fontFamily: font,
    textAlign: "center",
    margin: 10
  },
  buttonsBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  questionText: {
    fontSize: 15,
    color: "#4A4A4A",
    fontFamily: font,
    textAlign: "center",
    margin: 40
  },
  questionBox: {
    flex: 1,
    margin: 20,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: colors.primarydark,
    height: 300,
    width: 300,
    justifyContent: "center",
    alignItems: "center"
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
