import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //  1. Check if user is already logged in on app start
  useEffect(() => {
    const checkUser = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const storedUser = await AsyncStorage.getItem("userSession");
          if (storedUser) {
            navigation.replace("Listing");
          }
        }
      });
    };
    checkUser();
  }, []);

  //  Login function
  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store user session in AsyncStorage
      await AsyncStorage.setItem("userSession", JSON.stringify(user));

      console.log("User logged in:", user);
      navigation.replace("Listing");
    } catch (error) {
      console.log("Login failed:", error.message);
      setEmailError("Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      {/* UI Elements remain unchanged */}
      <Text style={styles.helloText}>Hello</Text>
      <Text style={styles.signInText}>Sign in to your account</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  topImageContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    alignItems: "center",
  },
  topImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  helloContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  helloText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  signInText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  testButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  testButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#D32F2F",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  logoutButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default LoginScreen;
