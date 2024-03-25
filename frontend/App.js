import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, StyleSheet, Text, View, Button } from "react-native";
import SignUpScreen from "./SignUpScreen";

import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to the app!</Text>
      <Button
        title="Go to Sign Up"
        onPress={() => navigation.navigate("SignUp")}
      />
      <StatusBar style="auto" />
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
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
