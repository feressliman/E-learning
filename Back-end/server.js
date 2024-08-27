const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const formations = require('./routes/formations');
const cours = require('./routes/cours');
const users = require('./routes/user');
const cors = require('cors');

const authController = require('./controllers/authController');
require('dotenv').config();
const app = express();
// Connect Database
connectDB();
// Init Middleware
app.use(express.json({ extended: false }));
// Define Routes
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/form', formations);
app.use('/cour', cours);
app.use('/user', users);
app.post('/api/register', authController.register); 
app.post('/login', authController.login);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
