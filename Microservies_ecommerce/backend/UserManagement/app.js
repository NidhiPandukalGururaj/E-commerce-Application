const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true }
});

// Middleware to hash password before saving
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model('User', UserSchema);

let currentUserId = 1;

// Function to generate user ID sequentially
const generateUserId = async () => {
  try {
    const latestUser = await User.findOne().sort({ userId: -1 });
    if (latestUser) {
      currentUserId = latestUser.userId + 1;
    }
    return currentUserId;
  } catch (error) {
    console.error('Error while generating userId:', error);
    throw error;
  }
};

app.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, address, password, confirmPassword } = req.body;
    if (!firstName || !lastName || !phoneNumber || !email || !address || !password || !confirmPassword) {
      return res.status(400).send({ error: 'All fields are required' });
    }
    if (password !== confirmPassword) {
      return res.status(400).send({ error: 'Passwords do not match' });
    }
    const userId = await generateUserId();
    const user = new User({ userId, firstName, lastName, phoneNumber, email, address, password });
    await user.save();
    res.status(201).send({ message: 'User created successfully', user: { userId, email: user.email } });
  } catch (error) {
    if (error.code === 11000) { // Duplicate email
      return res.status(400).send({ error: 'Email already exists' });
    }
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }
    res.send({ message: 'Login successful', user: { userId: user.userId, email: user.email } });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`User management service listening on port ${port}`);
});
