// api/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/BibliothqueWebSemantique', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Modèles
const User = require('./models/User');
const Book = require('./models/Book');
const Loan = require('./models/Loan');

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/books', require('./routes/books'));
app.use('/loans', require('./routes/loans'));
app.use('/user', require('./routes/user'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});