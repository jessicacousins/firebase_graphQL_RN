import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import SignUpScreen from "./SignUpScreen";
import NewsFeedScreen from "./NewsFeedScreen";
import { Button } from "react-native-paper";

import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.text}>Welcome to the app!</Text>
      </View>
      <View style={styles.middleContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("SignUp")}
          style={{ backgroundColor: "#333", width: "70%" }}
          labelStyle={{ color: "#32CD32" }}
        >
          Go to Sign Up
        </Button>
      </View>
      <StatusBar style="light-content" />
    </View>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="NewsFeed" component={NewsFeedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  topContainer: {
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",
    padding: 10,
  },
  middleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#32CD32",
    fontSize: 30,
    padding: 10,
  },
  signUpBtn: {
    backgroundColor: "#fff",
  },
});
