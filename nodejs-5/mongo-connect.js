const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGO_PATH, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const positionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [[Number]],
      required: true
    }
  }
});

const position = mongoose.model('Position', positionSchema);

module.exports = position;