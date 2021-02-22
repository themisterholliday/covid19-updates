import express from 'express';

import { getAllData, getAvailableStates } from '../services/covid-data.service';

const router = express.Router();

/* GET all covid data. */
router.get('/all', async function (req, res, next) {
  const json = await getAllData();
  res.json(json);
});

/* GET all states there is covid data for. */
router.get('/states', async function (req, res, next) {
  const json = getAvailableStates();
  res.json(json);
});

module.exports = router;
