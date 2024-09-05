const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Configure nodemailer transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // false for Mailtrap
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


const notifyAdminAndSendConfirmation = async (user) => {
  try {
    const adminEmail = 'feres057@gmail.com';

    // Notification to the admin
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: adminEmail,
      subject: 'Nouvelle inscription',
      text: `Un nouveau ${user.role} s'est inscrit avec l'email ${user.email}. Veuillez vérifier le compte.`,
    });

    // Send email to the user
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Vérification de votre compte',
      text: `Bonjour ${user.name},\n\nMerci pour votre inscription. Votre compte est en attente d'approbation. Nous vous informerons lorsque celui-ci aura été vérifié.\n\nCordialement,\nL'équipe`,
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi des emails:', error);
  }
};

exports.register = async (req, res) => {
  const { name, email, password, tel, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Utilisateur déjà existant' });
    }
    user = new User({
      name,
      email,
      password,
      tel,
      role,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    if (role === 'formateur' || role === 'etudiant') {
      await notifyAdminAndSendConfirmation(user);
    }

    res.status(201).json({ msg: 'Inscription réussie. Veuillez attendre que l\'administrateur vérifie votre compte.' });
  } catch (err) {
    console.error('Erreur serveur:', err.message);
    res.status(500).send('Erreur serveur');
  }
};

// Connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log('Tentative de connexion avec:', email); // Ajoute ce log

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Utilisateur non trouvé'); // Ajoute ce log
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Mot de passe invalide'); // Ajoute ce log
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    req.session.userId = user._id;
    console.log('Connexion réussie pour:', user._id); // Ajoute ce log
    res.json({ token: 'votre_token', role: user.role });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
};
