const bcrypt = require('bcrypt')
const mongoose = require('../mongoConnect')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

userSchema.pre('save', () => {
  const hashedPassword = bcrypt.hashSync(this.password, 10);
  this.password = hashedPassword;
});

const user = mongoose.model('Users', userSchema);

module.exports = user;