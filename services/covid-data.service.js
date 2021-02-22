// https://covidtracking.com/data/api
import axios from 'axios';
import data from '../data/states.json';

const COVID_TRACKING_API_URL = 'https://api.covidtracking.com/v1';

export async function getAllData() {
  const url = `${COVID_TRACKING_API_URL}/states/current.json`;
  const response = await axios.get(url);
  return response.data;
}

export function getAvailableStates() {
  return data;
}
