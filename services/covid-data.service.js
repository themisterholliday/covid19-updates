// https://covidtracking.com/data/api
const COVID_TRACKING_API_URL = 'https://api.covidtracking.com/v1';
const axios = require('axios');
const data = require('../data/states.json');

export async function getAllData() {
  const url = `${COVID_TRACKING_API_URL}/states/current.json`;
  const response = await axios.get(url);
  return response.data;
}

export function getAvailableStates() {
  return data;
}
