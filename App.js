import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SignUpScreen from "./screens/SignUpScreen";

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#163aaa" },
  headerTitleStyle: { color: "#eee" },
  headerTintColor: "white",
};

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
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
