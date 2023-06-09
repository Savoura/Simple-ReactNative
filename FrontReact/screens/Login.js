import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import UserContext from '../Context/UserContext';
import { useToast } from "react-native-toast-notifications";

const LoginScreen = ({ navigation }) => {
    const { setUserEmail } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    function showToast(message) {
        toast.show(message);
    }

    const handleLogin = async () => {
        console.log(email, password);
        await axios
            .post('http://localhost:3000/login', {
                email,
                password,
            })
            .then((response) => {
                // Login successful
                console.log(response);
                showToast(response.data.message);
                setUserEmail(email);
                navigation.navigate('Home');
            })
            .catch((error) => {
                // Login failed
                showToast(error.response.data.error);
                console.log(error);
                // Handle error and show an appropriate message
            });
    };

    const handleRegisterNavigation = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />

            <TouchableOpacity onPress={handleRegisterNavigation} style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Don't have an account? Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    registerButton: {
        marginTop: 20,
    },
    registerButtonText: {
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
