const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('./../models/users');

const app = express();

app.post('/login', (req, res) => {
  const { body } = req;
  Users.findOne({
    email: body.email,
  }, (error, user) => {
    if (error) {
      return res.status(500).json({
        ok: false,
        err: error,
      });
    }
    if (!user) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Incorrect user or password',
        },
      });
    }
    if (!bcrypt.compareSync(body.password, user.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Incorrect user or password',
        },
      });
    }
    const token = jwt.sign({
      user: user,
    }, process.env.AUTH_SEED, {
      expiresIn: process.env.TOKEN_TTL,
    });
    res.json({
      ok: true,
      user: user,
      token,
    });
  });
});

module.exports = app;