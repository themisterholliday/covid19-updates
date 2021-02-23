import express from 'express';

import { getAllUsers, createUser } from '../services/user.service';
import { getAvailableStates } from '../services/covid-data.service';

const router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.redirect('/');
});

/* POST create user. */
router.post('/', async function (req, res, next) {
  const { states } = getAvailableStates();
  const { email, state } = req.body;
  const stateJSON = JSON.parse(state);
  const { name: stateName, abbreviation: stateAbbreviation } = stateJSON;
  if (!email || !stateName || !stateAbbreviation) {
    res.status(400);
    res.end();
    return;
  }
  try {
    await createUser({ email, stateName, stateAbbreviation });
    res.redirect('/success');
  } catch (error) {
    res.render('index', {
      title: 'Covid-19 Email Updates',
      states,
      error: error.message,
    });
  }
});

module.exports = router;
