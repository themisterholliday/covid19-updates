const request = require('supertest');
const app = require('./app');

describe('GET /', function () {
  it('responds with html', function (done) {
    request(app)
      .get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200, done);
  });
});
