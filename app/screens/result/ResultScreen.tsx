import React, { Component } from "react";
import {
  BackHandler,
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import colors from "../../components/colors";
import CustomButton from "../../components/buttons/CustomButton";
import AnswersScreen from "../answers";
import font from "../../components/font";

interface Props {
  onCloseModal: () => void;
  score: number;
  quiz: Array<Object>;
}

class ResultScreen extends Component<Props> {
  state = {
    score: 0,
    questions: [],
    congratsText: "",
    modalVisible: false
  };
  mewok = [
    "Труба ты дотракиец, подучи традиции и возвращайся!",
    "Иттын баласы, учи традиции!",
    "А ну быстро в библиотеку традиций!"
  ];
  congrats = [
    "Уят емес па?",
    "Ты случайно не с Северного Казахстана?",
    "Думаю тебе нужно съездить в аул",
    "Еще чуть-чуть и можно покупать Камри",
    "Мне кажется, ты тот самый 'Журттын баласы'"
  ];
  changeCongrats = score => {
    if (score > 0 && score <= 50) {
      const item = Math.floor(Math.random() * 3);
      console.log(item);
      this.setState({
        congratsText: this.mewok[item]
      });
    } else if (score > 50 && score <= 60) {
      this.setState({
        congratsText: this.congrats[0]
      });
    } else if (score > 60 && score <= 70) {
      this.setState({
        congratsText: this.congrats[1]
      });
    } else if (score > 70 && score <= 80) {
      this.setState({
        congratsText: this.congrats[2]
      });
    } else if (score > 80 && score <= 90) {
      this.setState({
        congratsText: this.congrats[3]
      });
    } else {
      this.setState({
        congratsText: this.congrats[4]
      });
    }
  };
  async componentDidMount() {
    await this.setState({
      score: this.props.score,
      questions: this.props.quiz
    });
    await this.changeCongrats(this.state.score);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  private handleBackPress = () => {
    this.setModalVisible(false);
    return true;
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <AnswersScreen
            onCloseModal={() => {
              this.setModalVisible(false);
            }}
            quiz={this.state.questions}
          />
        </Modal>
        <View style={[styles.container, styles.center]}>
          <View style={[styles.textBox, styles.center]}>
            <Text style={styles.textStyle}>ТЫ НА</Text>
            <Text style={styles.percentText}>{this.state.score}%</Text>
            <Text style={styles.textStyle}>КАЗАХ</Text>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.congratsText}>{this.state.congratsText} </Text>
            <CustomButton
              text="Посмотреть ответы"
              onPress={() => this.setModalVisible(true)}
            />
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
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    backgroundColor: "#fff"
  },
  congratsText: {
    fontSize: 18,
    width: 300,
    fontWeight: "100",
    color: "#9B9B9B",
    fontFamily: font,
    margin: 5,
    textAlign: "center"
  },
  position: {
    position: "absolute",
    top: 20,
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
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  bottom: {
    justifyContent: "flex-end",
    marginBottom: 20,
    alignItems: "center"
  },
  buttonsBox: { flex: 1 },
  textBox: { flex: 1 },
  percentText: {
    fontSize: 70,
    margin: 20,
    color: colors.primarydark,
    fontFamily: font,
    fontWeight: "500"
  },
  textStyle: {
    fontSize: 35,
    fontWeight: "100",
    color: "#9B9B9B",
    fontFamily: font,
    margin: 25,
    textAlign: "center"
  },
  buttonStyle: {
    margin: 40,
    backgroundColor: colors.primary,
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderRadius: 8
  }
});

//make this component available to the app
export default ResultScreen;
