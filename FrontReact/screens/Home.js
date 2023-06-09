import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import UserContext from '../Context/UserContext';

const HomePage = () => {
  const { userEmail } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/todos/${userEmail}`);
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:3000/todos', {
        email: userEmail,
        title: newTodoTitle,
        description: newTodoDescription,
      });
      setTodos([...todos, response.data]);
      setNewTodoTitle('');
      setNewTodoDescription('');
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoTitle}>{item.title}</Text>
      <Text style={styles.todoDescription}>{item.description}</Text>
      <Text style={styles.todoCreatedAt}>{item.createdAt}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.todoList}
      />
      <View style={styles.addTodoContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={newTodoTitle}
          onChangeText={setNewTodoTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={newTodoDescription}
          onChangeText={setNewTodoDescription}
        />
        <Button title="Add Todo" onPress={addTodo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  todoList: {
    flexGrow: 1,
    width: '100%',
  },
  todoItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  todoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  todoCreatedAt: {
    fontSize: 12,
    color: '#999',
  },
  addTodoContainer: {
    marginTop: 20,
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default HomePage;
