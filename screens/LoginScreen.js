import { Button, Image, Input } from "@rneui/themed"
import { StatusBar } from "expo-status-bar"
import React, { useEffect, useRef, useState } from "react"
import { KeyboardAvoidingView, StyleSheet, View } from "react-native"
import {
	auth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
} from "../firebase"

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const passwordRef = useRef()

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (authUser) => {
			if (authUser) {
				navigation.replace("Home")
			}
		})
		return () => {
			unsubscribe()
		}
	}, [])

	const signIn = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const authUser = userCredential.user
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				alert("ERROR|| Code: " + errorCode + " | " + "Message: " + errorMessage)
			})
		// alert("Pressed Log In")
	}

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<StatusBar style="light" />
			<Image
				source={{
					uri: "https://ronthetech.github.io/image-repo/icons/kingfisher.png",
				}}
				style={{ width: 150, height: 150 }}
			/>
			<View style={styles.inputContainer}>
				<Input
					placeholder="Email"
					keyboardType="email-address"
					textContentType="emailAddress"
					returnKeyType="next"
					autoFocus
					value={email}
					onChangeText={(text) => setEmail(text)}
					onSubmitEditing={() => {
						passwordRef.current.focus()
					}}
					blurOnSubmit={false}
				/>
				<Input
					placeholder="Password"
					textContentType="password"
					returnKeyType="done"
					secureTextEntry
					value={password}
					onChangeText={(text) => setPassword(text)}
					ref={passwordRef}
					onSubmitEditing={signIn}
				/>
			</View>
			<Button
				title="Log In"
				onPress={signIn}
				raised
				containerStyle={styles.buttonContainer}
				buttonStyle={styles.button}
			/>
			<Button
				title="Sign Up"
				onPress={() => {
					navigation.navigate("Sign Up")
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

export default LoginScreen

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
	button: {
		borderRadius: 20,
		backgroundColor: "#163aaa",
		borderColor: "#163aaa",
		borderWidth: 2,
	},
})
