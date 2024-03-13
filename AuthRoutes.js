import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './user.js';

const router = express.Router();


router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).send('Username already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword, role });
      await user.save();
      res.status(201).send('user created');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error registering user');
    }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign({ username: user.username, role: user.role }, "qwerty");
      return res.json({ accessToken });
    }
    res.status(403).send('Incorrect password');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});

export default router;
