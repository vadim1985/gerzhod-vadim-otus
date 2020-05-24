const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGO_PATH, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

module.exports = mongoose;