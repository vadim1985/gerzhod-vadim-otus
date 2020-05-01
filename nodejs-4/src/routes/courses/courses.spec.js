const request = require('supertest');
const app = require('../../app');

describe('Courses Controller', () => {
  it('should return status 200', done => {
    request(app)
      .get('/courses')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  it('should have header Content-Type:text/html', done => {
    request(app)
      .get('/courses')
      .expect('Content-Type', /html/)
      .then(response => {
        done()
      })
  });
  it('should have string - Все курсы', done => {
    request(app)
      .get('/courses')
      .then(response => {
        expect(response.text).toMatch(/Все курсы/g);
        done();
      });
  });
});