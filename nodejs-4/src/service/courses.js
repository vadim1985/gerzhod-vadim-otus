const courseSchema = require('../config/schemas/courseSchema');

const coursesRepo = {

  findAll: async () => {
    return (await courseSchema.find({})).map(({ _id, name }) => ({ id: _id, name }));
  },

  createCourse: async (course) => {
    return await courseSchema.create(course);
  },

  updateCourse: async (courseId, course) => {
    return courseSchema.updateOne({ _id: courseId }, course);
  },

  getCourseById: async (id) => {
    return await courseSchema.findById(id);
  },

  addLesson: async (courseId, lesson) => {
    return await courseSchema.updateOne({ _id: courseId }, { $push: { lessons: lesson } });
  },

  getLessonById: async (courseId, lessonId) => {
    return (await courseSchema.findOne({ _id: courseId, 'lessons._id': lessonId }, { "_id": 0, "lessons.$": 1 })).lessons[0];
  },

  addComment: async (courseId, lessonId, comment) => {
    return await courseSchema.updateOne(
      { _id: courseId, 'lessons._id': lessonId },
      { $push: { "lessons.$.comment": { text: comment.text } } }
    );
  }

};

module.exports = coursesRepo;