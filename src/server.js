import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://anass:anass0987@api.46t4n.mongodb.net/?retryWrites=true&w=majority&appName=API')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.post('/user', async (req, res) => {
  try {
    const newUser = new User({
      fullName: req.body.fullName,
      password: req.body.password,
      email: req.body.email,
      age: req.body.age
    });
    await newUser.save();
    res.send('User saved successfully');
  } catch (err) {
    res.status(500).send('Error saving user');
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (err) {
    res.status(500).send('Error fetching user');
  }
});

app.delete('/users/:id', async (req, res) => {
    try {
    await User.deleteOne({_id: req.params.id});
    res.send('User deleted successfully');
    } catch (err) {
      res.status(500).send('Error fetching user');
    }
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});