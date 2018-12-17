import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation";
import main from "./app/screens/main";
import quiz from "./app/screens/quiz";
import lib from "./app/screens/library";
import result from "./app/screens/result";
import traditionlist from "./app/screens/traditionlist";
import tradition from "./app/screens/tradition";
import info from "./app/screens/info";
import colors from "./app/components/colors";

const navigationOption = {
  headerBackTitle: "Back",
  headerTintColor: colors.primarydark
};

const RootStack = createStackNavigator(
  {
    Main: {
      screen: main,
      navigationOptions: navigationOption
    },
    Quiz: {
      screen: quiz,
      navigationOptions: navigationOption
    },
    Result: {
      screen: result,
      navigationOptions: navigationOption
    },
    Library: {
      screen: lib,
      navigationOptions: navigationOption
    },
    TraditionList: {
      screen: traditionlist,
      navigationOptions: navigationOption
    },
    Tradition: {
      screen: tradition,
      navigationOptions: navigationOption
    },
    Info: {
      screen: info,
      navigationOptions: {
        navigationOption,
        header: null
      }
    }
  },
  {
    initialRouteName: "Main"
  }
);

class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
