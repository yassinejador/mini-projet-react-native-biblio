const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/profile',auth, async (req, res) => {
  const user = req.user
  res.send(user);
});
module.exports = router;