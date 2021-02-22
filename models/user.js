const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  stateName: String,
  stateAbbreviation: String,
});

module.exports = mongoose.model('User', User);
