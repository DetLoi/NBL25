const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  format: {
    type: String,
    required: true,
    trim: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);