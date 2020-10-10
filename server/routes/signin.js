const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const app = express();

app.post('/signin', (req, res) => {
  const { body } = req;
  const { name, email, password, role } = body;
  const user = new User({
    name,
    email,
    role,
    password: bcrypt.hashSync(password, 10),
  });
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        ok: false,
        error,
      });
    }
    res.json({
      ok: true,
      user,
    })
  });
});

module.exports = app;