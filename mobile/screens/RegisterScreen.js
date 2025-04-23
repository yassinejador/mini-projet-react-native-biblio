import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { storeToken } from "../utils/auth";

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await fetch(
                "http://192.168.1.155:3000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password, email }),
                }
            );

            navigation.navigate("Login");
        } catch (error) {
            console.error(error);
            alert("Register failed");
        }
    };

    return (
        <View style={styles.container}>
            <Text>Nom et Prénom:</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                keyboardType="name-phone-pad"
            />
            <Text>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <Text>Password:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />
            <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
    },
});

export default RegisterScreen;
