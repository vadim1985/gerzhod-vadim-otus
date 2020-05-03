const courses = require('../mockData');

const coursesRepo = {

  findAll: () => {
    return courses.map(({ id, name }) => ({ id, name }));
  },

  getCourseById: (id) => {
    return courses.find(course => course.id === id);
  },

  getLessonById: (courseId, lessonId) => {
    return courses.find(course => course.id === courseId).lessons.find(({id}) => id === lessonId)
  }

};

module.exports = coursesRepo;