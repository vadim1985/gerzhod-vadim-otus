const userSchema = require('../config/schemas/userSchema');
const bcrypt = require('bcrypt');

const userRepo = {

  create: async (name, password) => {
    return await userSchema.create({name, password})
  },

  findAll: async () => {
    return await userSchema.find({});
  },

  findById: async (id) => {
    return await userSchema.findById(id);
  },

  findByName: async (name) => {
    return await userSchema.findOne({ name });
  },

  passwordsAreEqual: async (hashedPassword, plainPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

};

module.exports = userRepo;