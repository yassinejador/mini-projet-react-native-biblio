const express = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const router = express.Router();

// Créer un livre (Admin)
router.post('/', auth, async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Lister tous les livres
router.get('/',auth, async (req, res) => {
  try {
    const books = await Book.find({});
    res.send(books);
  } catch (error) {
    res.status(500).send();
  }
});

// Lister les livres disponible
router.get('/disponibles',auth, async (req, res) => {
  try {
    const books = await Book.find({available: true});
    res.send(books);
  } catch (error) {
    res.status(500).send();
  }
});

// Mettre à jour un livre
router.patch('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).send();
    res.send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Supprimer un livre
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).send();
    res.send(book);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
