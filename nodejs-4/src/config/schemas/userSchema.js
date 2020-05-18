const bcrypt = require('bcrypt');
const mongoose = require('../mongoConnect');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true, 
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
});

userSchema.pre('save', function (next) {
  const hashedPassword = bcrypt.hashSync(this.password, 10);
  this.password = hashedPassword;
  next();
});

const user = mongoose.model('Users', userSchema);

module.exports = user;