const { PrismaClient } = require('@prisma/client');
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    })
);

app.post('/register', async (req, res) => {
    const { email, name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        await prisma.user.create({
            data: {
              email,
              name,
              password: hashedPassword,
            },
          });

        res.json({ success: "User created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        res.json({ message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
});

app.post('/todos', async (req, res) => {
    const { email, title, description } = req.body;
  
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      const todo = await prisma.todo.create({
        data: {
          title,
          description,
          createdAt: new Date(),
          user: {
            connect: { id: user.id },
          },
        },
      });
  
      res.json(todo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to add todo item' });
    }
  });
  

  app.get('/todos/:email', async (req, res) => {
    const { email } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { todoList: true }, // Include the associated todoList
      });
  
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      const todos = user.todoList;
      res.json(todos);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  });
  

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
