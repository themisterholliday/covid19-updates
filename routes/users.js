import express from 'express';

import {
  getAllUsers,
  createUser,
  deleteUserByEmail,
} from '../services/user.service';

const router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const allUsers = await getAllUsers();
  res.json({ users: allUsers });
});

/* POST create user. */
router.post('/', async function (req, res, next) {
  const { email, stateName, stateAbbreviation } = req.body;
  if (!email || !stateName || !stateAbbreviation) {
    res.status(400);
    res.send('Missing values');
    return;
  }
  try {
    const user = await createUser({ email, stateName, stateAbbreviation });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
