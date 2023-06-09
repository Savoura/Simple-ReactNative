import React, { useState } from 'react';
import { View, TextInput, ToastAndroid, Button, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';

const RegisterScreen = ({ navigation }) => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function showToast(message) {
    toast.show(message);
  }

  const handleRegister = async () => {
    console.log(email, name, password);
    if (!email || !name || !password) {
      showToast('Please fill all fields');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters');
      return;
    }

    await axios
      .post('http://localhost:3000/register', {
        email,
        name,
        password,
      })
      .then((response) => {
        // Registration successful
        console.log(response);
        showToast(response.data.success);
        navigation.navigate('Login');
      })
      .catch((error) => {
        // Registration failed
        console.log(error);
        showToast(error.response.data.error);
      });
  };

  const handleLoginNavigation = () => {
    navigation.navigate('Login');
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
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} />

      <TouchableOpacity onPress={handleLoginNavigation} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Already have an account? Log in</Text>
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
  loginButton: {
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
