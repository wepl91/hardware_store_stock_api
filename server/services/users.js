/**
 * Services Dependencies
 */

const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = (userData) => {
  return new Promise((resolve, reject) => {
    const { name, email, password, role } = userData;
    const user = new User({
      name,
      email,
      role,
      password: bcrypt.hashSync(password, 10),
    });
    user.save((error, user) => {
      if (error) {
        reject({
          code: 400,
          error: error.message,
        });
      }
      resolve(user);
    });
  });
};

const signIn = (userData) => {
  return new Promise((resolve, reject) => {
    const { email, password } = userData;
    User.findOne({
      email: email,
    }, (error, user) => {
      if (error) {
        reject({
          code: 500,
          error: error.message,
        });
      }
      if (!user) {
        reject({
          code: 400,
          error: 'User not exists',
        });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        reject({
          code: 400,
          error: 'Incorrect user or password',
        });
      }
      const token = jwt.sign({
        user: user,
      }, process.env.AUTH_SEED, {
        expiresIn: process.env.TOKEN_TTL,
      });
      resolve({
        user,
        token,
      });
    });
  });
};
module.exports = {
  signUp,
  signIn,
};
