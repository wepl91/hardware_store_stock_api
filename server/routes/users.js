const express = require('express');
const app = express();

const {
  signIn,
  signUp,
} = require('../services/users');

app.post('/signup', (req, res) => {
  const { body } = req;
  signUp(body)
    .then((user) => {
      res.json({
        ok: true,
        user,
      });
    })
    .catch((error) => {
      res.status(error.code).json({
        ok: false,
        error,
      });
    });
});

app.post('/signin', (req, res) => {
  const { body } = req;
  signIn(body)
    .then((data) => {
      res.json({
        ok: true,
        data: {
          user: data.user,
          token: data.token,
        },
      });
    })
    .catch((error) => {
      return res.status(error.code).json({
        ok: false,
        error,
      });
    });
});

module.exports = app;