// https://covidtracking.com/data/api
const COVID_TRACKING_API_URL = 'https://api.covidtracking.com/v1';
const axios = require('axios');
const data = require('../data/states.json');

class CovidDataService {
  // static async getDataForState(state) {
  //   const url = `${COVID_TRACKING_API_URL}/states/${state}/current.json`;
  //   const response = await axios.get(url);
  //   return response.data;
  // }

  static async getAllData() {
    const url = `${COVID_TRACKING_API_URL}/states/current.json`;
    const response = await axios.get(url);
    return response.data;
  }

  static getAvailableStates() {
    return data;
  }
}

module.exports = CovidDataService;
