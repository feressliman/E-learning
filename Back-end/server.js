const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const formations = require('./routes/formations');
const cours = require('./routes/cours');
const users = require('./routes/user');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authController = require('./controllers/authController');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Configure session
app.use(session({
    secret: process.env.SESSION_SECRET || 'tonSecretSession',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/learning',
      collectionName: 'sessions'
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 jour
      secure: false, // false pour le développement
    }
  }));
  


// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // L'URL de ton frontend
    credentials: true
  }));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/form', formations);
app.use('/cour', cours);
app.use('/user', users);

// Register and Login routes
app.post('/register', authController.register);
app.post('/login', authController.login);

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
