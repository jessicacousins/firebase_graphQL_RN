import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

const SIGN_UP_MUTATION = gql`
  mutation SignUp($phoneNumber: String!, $password: String!) {
    signUp(phoneNumber: $phoneNumber, password: $password)
  }
`;

export default function SignUpScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP_MUTATION);

  const handleSignUp = () => {
    const formattedPhoneNumber = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+1${phoneNumber}`;

    if (!formattedPhoneNumber) {
      Alert.alert("Error", "Please enter a valid phone number.");
      return;
    }

    signUp({ variables: { phoneNumber: formattedPhoneNumber, password } });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "90%",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
});
