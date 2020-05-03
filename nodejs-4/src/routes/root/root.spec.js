const request = require('supertest');
const app = require('../../app');

describe('Root Controller', () => {
  it('should return status 200', done => {
    request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  it('should have header Content-Type:text/html', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .then(response => {
        done()
      })
  });
  it('should have string - Авторизация', done => {
    request(app)
      .get('/')
      .then(response => {
        expect(response.text).toMatch(/Авторизация/g);
        done();
      });
  });
});