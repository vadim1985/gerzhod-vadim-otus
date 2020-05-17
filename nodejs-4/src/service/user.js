const userSchema = require('../config/schemas/userSchema');

const userRepo = {

  findAll: async () => {
    return await userSchema.find({});
  },

  findById: async(id) => {
    return await userSchema.findById(id)
  },

  findByName: async (name) => {
    return await userSchema.findOne({name})
  }

};

module.exports = userRepo;