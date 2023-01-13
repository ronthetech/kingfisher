import { Button, Input, Text } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  auth,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "../firebase";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const emailRef = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const actionCodeSettings = { handleCodeInApp: true };

  const signUp = async () => {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    if (isSignInWithEmailLink(auth, emailLink)) {
      await signInWithEmailLink(auth, email, emailLink);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text h1>Sign Up</Text>
      <Text>Sign up with your email using the link that we send you.</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          ref={emailRef}
          onSubmitEditing={signUp}
          blurOnSubmit={false}
        />
      </View>
      <Button
        title="Sign Up"
        onPress={signUp}
        raised
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
      />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#eee",
  },
  inputContainer: { width: 300 },
  buttonContainer: {
    borderRadius: 20,
    width: 100,
    marginTop: 10,
  },
  button: { borderRadius: 20, backgroundColor: "#163aaa" },
});
