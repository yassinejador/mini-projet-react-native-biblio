// seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const User = require('./models/User');
const Book = require('./models/Book');
const Loan = require('./models/Loan');

async function seedDatabase() {
  await mongoose.connect('mongodb://localhost:27017/BibliothqueWebSemantique');
  console.log('Connected to MongoDB');

  // Optional: clear existing data
  await User.deleteMany({});
  await Book.deleteMany({});
  await Loan.deleteMany({});

  const users = [];
  const books = [];

  // Create fake users
  for (let i = 0; i < 10; i++) {
    const password = await bcrypt.hash('password123', 8); // all users get same password
    const user = new User({
      username: faker.internet.username(),
      email: faker.internet.email(),
      password,
    });
    await user.save();
    users.push(user);
  }

  // Create fake books
  for (let i = 0; i < 15; i++) {
    const book = new Book({
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      isbn: faker.helpers.replaceSymbols('###-##########'),
      available: faker.datatype.boolean(),
    });
    await book.save();
    books.push(book);
  }

  // Create fake loans
  for (let i = 0; i < 20; i++) {
    const loan = new Loan({
      user: faker.helpers.arrayElement(users)._id,
      book: faker.helpers.arrayElement(books)._id,
      borrowedDate: faker.date.past(),
      returnDate: faker.date.future(),
      returned: faker.datatype.boolean(),
    });
    await loan.save();
  }

  console.log('Database seeded successfully!');
  mongoose.disconnect();
}

seedDatabase().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});
