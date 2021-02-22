import express from 'express';
import { getAvailableStates } from '../services/covid-data.service';

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const { states } = getAvailableStates();
  res.render('index', {
    title: 'Covid-19 Email Updates',
    states,
  });
});

router.get('/success', function (req, res, next) {
  res.render('success');
});

module.exports = router;
