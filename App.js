import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Button } from "@rneui/themed"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { auth, onAuthStateChanged, signOut } from "./firebase"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"

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
	return (
		<View style={styles.container}>
			<Text style={styles.title}>🎣KingFisher</Text>

			<Button
				title="Log Out"
				onPress={logOut}
				raised
				containerStyle={styles.button}
				color="#163aaa"
			/>
			<StatusBar style="light" />
		</View>
	)
}

const Stack = createNativeStackNavigator()

const globalScreenOptions = {
	headerStyle: { backgroundColor: "#163aaa" },
	headerTitleStyle: { color: "#eee" },
	headerTintColor: "white",
}

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Login"
				screenOptions={globalScreenOptions}>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ title: "Dashboard" }}
				/>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Sign Up" component={RegisterScreen} />
			</Stack.Navigator>
		</NavigationContainer>
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
	},
})

export default App
