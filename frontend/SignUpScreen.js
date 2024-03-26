import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";

const SIGN_UP_MUTATION = gql`
  mutation SignUp($phoneNumber: String!, $password: String!) {
    signUp(phoneNumber: $phoneNumber, password: $password)
  }
`;
export default function SignUpScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP_MUTATION);

  const handleSignUp = async () => {
    const formattedPhoneNumber = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+1${phoneNumber}`;

    if (!formattedPhoneNumber) {
      Alert.alert("Error", "Please enter a valid phone number.");
      return;
    }

    try {
      await signUp({
        variables: { phoneNumber: formattedPhoneNumber, password },
      });
      navigation.navigate("NewsFeed");
    } catch (error) {
      console.error(error);
      Alert.alert("Signup Failed", "Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Phone Number"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.input}
        theme={{
          colors: {
            text: "#32CD32",
            primary: "#32CD32",
            placeholder: "#32CD32",
            background: "#888777",
          },
        }}
      />
      <TextInput
        mode="outlined"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        theme={{
          colors: {
            text: "#32CD32",
            primary: "#32CD32",
            placeholder: "#32CD32",
            background: "#888777",
          },
        }}
      />
      <Button
        mode="contained"
        onPress={handleSignUp}
        style={styles.button}
        labelStyle={{ color: "#32CD32" }}
      >
        Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#000",
  },
  input: {
    width: "90%",
    marginBottom: 10,
  },
  button: {
    width: "90%",
    paddingVertical: 5,
    backgroundColor: "#333",
  },
});
