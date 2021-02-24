import { getAllData } from './services/covid-data.service';
import {
  getDataToSendForUser,
  buildCovidUpdateEmailInfo,
} from './services/send-emails.service';

const request = require('supertest');
const app = require('./app');

describe('/', function () {
  it('responds with html', function (done) {
    request(app)
      .get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200, done);
  });
});

describe('/covid', function () {
  it('responds with all json for all states', function (done) {
    request(app)
      .get(`/covid/all`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(function (response) {
        const keys = response.body.length;
        expect(keys).toBe(56);
      })
      .expect(200, done);
  });

  it('responds with all available states', function (done) {
    request(app)
      .get(`/covid/states`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(function (response) {
        const { states } = response.body;
        expect(states.length).toBe(56);
      })
      .expect(200, done);
  });
});

describe('email builder', function () {
  it('build covid update email', async function (done) {
    const user = { email: '', stateName: 'Oklahoma', stateAbbreviation: 'OK' };
    const allCovidData = await getAllData();
    const covidData = getDataToSendForUser(user, allCovidData);
    const { email, subject, message } = buildCovidUpdateEmailInfo(
      user,
      covidData
    );
    expect(email).toBe('');
    expect(subject).toBe('Here is your daily Covid-19 update for Oklahoma');
    expect(message).toBeNull();
    done();
  });
});
