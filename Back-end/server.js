const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const formations = require('./routes/formations');
const cours = require('./routes/cours');
const autocontrolleur = require('./controllers/autocontrolleur');
require('dotenv').config();
const app = express();
// Connect Database
connectDB();
// Init Middleware
app.use(express.json({ extended: false }));
// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/formations', formations);
app.use('/api/cours', cours);
app.post('/api/register', autocontrolleur.register); 
app.post('/api/login', autocontrolleur.login);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


