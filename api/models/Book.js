const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Le titre est requis"],
        minlength: [2, "Le titre doit contenir au moins 2 caractères"],
    },
    author: {
        type: String,
        required: [true, "L'auteur est requis"],
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{10}/.test(v);
            },
            message: (props) => `${props.value} n'est pas un ISBN valide!`,
        },
    },
    available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Book', BookSchema);