import User from '../models/user';

/**
 * Create a user in the database
 *
 * @export
 * @param {{ email: string, stateName: string, stateAbbreviation: string }} user
 */
export async function createUser(user) {
  const query = { email: user.email };
  const update = {
    stateName: user.stateName,
    stateAbbreviation: user.stateAbbreviation,
  };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  return User.findOneAndUpdate(query, update, options).exec();
}

export async function deleteUserByEmail(email) {
  const query = { email };
  return User.findOneAndDelete(query).exec();
}

export async function getAllUsers() {
  const users = await User.find();
  return users;
}
