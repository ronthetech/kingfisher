import { Button, Input, Text } from "@rneui/themed"
import { StatusBar } from "expo-status-bar"
import React, { useLayoutEffect, useState } from "react"
import { KeyboardAvoidingView, StyleSheet, View } from "react-native"
import { auth, createUserWithEmailAndPassword } from "../firebase"

const RegisterScreen = ({ navigation }) => {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [imageURL, setImageURL] = useState("")

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: "Login",
		})

		// return () => {
		// 	second
		// }
	}, [navigation])

	const signUp = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const authUser = userCredential.user
				authUser.update({
					displayName: firstName,
					photoURL:
						imageURL ||
						"https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
				})
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				alert("ERROR|| Code: " + errorCode + " | " + "Message: " + errorMessage)
			})
		// alert("Thanks for signing up " + firstName + "!")
	}

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<StatusBar style="light" />
			<Text h4 style={{ marginBottom: 20 }}>
				Create a new account
			</Text>
			<View style={styles.inputContainer}>
				<Input
					placeholder="First Name"
					textContentType="givenName"
					autoComplete="given-name"
					returnKeyType="next"
					value={firstName}
					onChangeText={(text) => setFirstName(text)}
					autoFocus
				/>
				<Input
					placeholder="Last Name"
					textContentType="familyName"
					autoComplete="family-name"
					returnKeyType="next"
					value={lastName}
					onChangeText={(text) => setLastName(text)}
				/>
				<Input
					placeholder="Email"
					keyboardType="email-address"
					textContentType="emailAddress"
					autoComplete="email"
					returnKeyType="next"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<Input
					placeholder="Password"
					textContentType="password"
					returnKeyType="next"
					value={password}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
				/>
				<Input
					placeholder="Profile Picture URL (optional)"
					textContentType="URL"
					returnKeyType="done"
					value={imageURL}
					onChangeText={(text) => setImageURL(text)}
					onSubmitEditing={signUp}
				/>
			</View>
			<Button
				title="Sign Up"
				onPress={signUp}
				raised
				containerStyle={styles.buttonContainer}
				buttonStyle={styles.button}
			/>
			<Button
				title="Log In"
				onPress={() => {
					navigation.navigate("Login")
				}}
				containerStyle={styles.buttonContainer}
				buttonStyle={{
					borderRadius: 20,
					borderColor: "#163aaa",
					borderWidth: 2,
				}}
				type="outline"
				titleStyle={{ color: "#163aaa" }}
			/>
			<View style={{ height: 100 }} />
		</KeyboardAvoidingView>
	)
}

export default RegisterScreen

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
})
