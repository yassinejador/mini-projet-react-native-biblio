import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { AuthContext } from '../utils/AuthContext';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const response = await fetch(
                "http://192.168.1.155:3000/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Login failed");
            }

            const data = await response.json();
            const token = data.token;

            if (!token) {
                throw new Error("No token received");
            }

            await login(token);

            navigation.navigate("Books");
        } catch (error) {
            console.error(error);
            alert("Login failed");
        }
    };

    return (
        <View style={styles.container}>
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
            <Button title="Se Connect" onPress={handleLogin} />
            <Button
                title="S'inscrire"
                onPress={() => navigation.navigate("register")}
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

export default LoginScreen;
