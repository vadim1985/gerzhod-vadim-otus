const userSchema = require('../config/schemas/userSchema');
const bcrypt = require('bcrypt');

const userRepo = {

  create: async (user) => {
    return await userSchema.create(user);
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

  updateUser: async (userId, user) => {
    return userSchema.updateOne({ _id: userId }, user);
  },

  passwordsAreEqual: async (hashedPassword, plainPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

};

module.exports = userRepo;