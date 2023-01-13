import { Button, Text } from "@rneui/themed"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import {
	auth,
	onAuthStateChanged,
	sendEmailVerification,
	signOut,
} from "../firebase"

function HomeScreen({ navigation }) {
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (authUser) => {
			if (!authUser) {
				navigation.replace("Login")
			}
		})
		return () => {
			unsubscribe()
		}
	}, [])

	const logOut = () => {
		signOut(auth)
	}

	const sendVerification = async () => {
		await sendEmailVerification(auth.currentUser).then(
			alert("The Email verification link has been sent!"),
		)
	}

	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			<Text style={styles.title}>🎣KingFisher</Text>
			<Button
				title="Log Out"
				onPress={logOut}
				raised
				containerStyle={styles.button}
				color="#163aaa"
			/>
			<Button
				title="Verify Email"
				onPress={sendVerification}
				raised
				containerStyle={styles.button}
				color="#163aaa"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#222",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		color: "#eee",
		marginBottom: 25,
	},
	button: {
		borderRadius: 20,
		backgroundColor: "#163aaa",
		borderColor: "#163aaa",
		borderWidth: 2,
	},
})

export default HomeScreen
