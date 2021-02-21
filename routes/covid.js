const express = require('express');
const CovidDataService = require('../services/covid-data-service');

const router = express.Router();

router.get('/', async function (req, res, next) {
  const { state } = req.query;
  if (!state) {
    res.status(400);
    res.json({ errorMessage: 'Missing query params' });
    return;
  }
  const json = await CovidDataService.getDataForState(state);
  res.json(json);
});

router.get('/all', async function (req, res, next) {
  const json = await CovidDataService.getAllData();
  res.json(json);
});

router.get('/states', async function (req, res, next) {
  const json = CovidDataService.getAvailableStates();
  res.json(json);
});

module.exports = router;
