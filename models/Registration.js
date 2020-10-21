const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  age:{
    type: Number,
    trim: true,
  },
  city:{
    type: String,
    trim: true,
  },
  whatsappnum:{
    type: Number,
    trim: true,
  },
});

module.exports = mongoose.model('Registration', registrationSchema);