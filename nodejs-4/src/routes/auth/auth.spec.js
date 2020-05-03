const request = require('supertest');
const app = require('../../app');

describe('AuthController', () => {
  it('should return token', done => {
    request(app)
      .post('/auth')
      .send({ username: 'test', password:'test' })
      .then(response => {
        expect(response.body.token).toBeDefined();
        done();
      });
  });
});