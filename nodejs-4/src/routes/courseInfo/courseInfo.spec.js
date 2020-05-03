const request = require('supertest');
const app = require('../../app');

describe('CourseInfo Controller', () => {
  it('/course/courseId should return status 200', done => {
    request(app)
      .get('/course/1')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  it('/course/courseId/lessonId should return status 200', done => {
    request(app)
      .get('/course/1/2')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  it('/course/courseId should have header Content-Type:text/html', done => {
    request(app)
      .get('/course/1')
      .expect('Content-Type', /html/)
      .then(response => {
        done();
      });
  });
  it('/course/courseId/lessonId should have header Content-Type:text/html', done => {
    request(app)
      .get('/course/1/2')
      .expect('Content-Type', /html/)
      .then(response => {
        done();
      });
  });
  it('/course/courseId should have string - Все курсы', done => {
    request(app)
      .get('/course/1')
      .then(response => {
        expect(response.text).toMatch(/Все уроки/g);
        done();
      });
  });
});