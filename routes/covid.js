const express = require('express');

const router = express.Router();

const {
  getAllData,
  getAvailableStates,
} = require('../services/covid-data.service');

router.get('/all', async function (req, res, next) {
  const json = await getAllData();
  res.json(json);
});

router.get('/states', async function (req, res, next) {
  const json = getAvailableStates();
  res.json(json);
});

module.exports = router;
