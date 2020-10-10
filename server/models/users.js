const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const omit = require('lodash/omit');

const validRoles = {
  values: ['ADMIN', 'USER'],
  message: '${VALUE} is not a valid role',
};

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name must exist'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email must exist'],
  },
  password: {
    type: String,
    required: [true, 'Password is mandatory'],
  },
  role: {
    type: String,
    default: 'USER',
    required: [true],
    enum: validRoles,
  }
});

userSchema.methods.toJSON = function() {
  const user = this;
  return omit(user.toObject(), 'password');
};

userSchema.plugin(uniqueValidator, {
  message: '${PATH} debe de ser único',
});

module.exports = mongoose.model('User', userSchema);
