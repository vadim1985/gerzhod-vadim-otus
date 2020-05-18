const mongoose = require('../mongoConnect');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  userAccess: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
  lessons: {
    type: [
      {
        name: {
          type: String
        },
        comment: {
          type: [
            {
              text: {
                type: String
              }
            }
          ],
          default: []
        }
      }
    ],
    default: []
  }
});

const course = mongoose.model('Courses', courseSchema);

module.exports = course;