const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  book: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Book', 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  borrowedDate: { 
    type: Date, 
    default: Date.now 
  },
  returnDate: { 
    type: Date,
    required: true 
  },
  returned: { 
    type: Boolean, 
    default: false 
  }
});

module.exports = mongoose.model('Loan', LoanSchema);