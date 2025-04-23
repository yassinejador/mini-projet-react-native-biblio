const express = require('express');
const Loan = require('../models/Loan');
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const router = express.Router();

// Lister les emprunts de l'utilisateur
router.get('/my-loans', auth, async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.id })
      .populate('book')
      .sort({ borrowedDate: -1 });
    res.send(loans);
  } catch (error) {
    res.status(500).send();
  }
});

// Emprunter un livre
router.post('/', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.body.bookId);
    if (!book || !book.available) {
      return res.status(400).send({ error: 'Book not available' });
    }

    const loan = new Loan({
      book: req.body.bookId,
      user: req.user.id,
      returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 2 semaines
    });

    await loan.save();
    
    // Marquer le livre comme indisponible
    book.available = false;
    await book.save();

    res.status(201).send(loan);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Rendre un livre
router.patch('/:id/return',auth, async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan || loan.user.toString() !== req.user.id) {
      return res.status(404).send();
    }

    loan.returned = true;
    await loan.save();

    // Marquer le livre comme disponible
    const book = await Book.findById(loan.book);
    book.available = true;
    await book.save();
    const loans = await Loan.find({user: req.user.id});
    res.send(loans);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;