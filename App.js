import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "./src/config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ListingScreen from "./src/screens/ListingScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
// import SettingsScreen from "./src/screens/LanguageScreen";
// import LanguageScreen from "./src/screens/LanguageScreen";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    };
    checkUser();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) AsyncStorage.setItem("user", JSON.stringify(user));
      else AsyncStorage.removeItem("user");
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Listing" component={ListingScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            {/* <Stack.Screen name="Settings" component={LanguageScreen} /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
