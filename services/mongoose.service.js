const mongoose = require('mongoose');

const { MONGODB_URI } = process.env;

export async function startMongoose() {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.set('useFindAndModify', false);
}

export function mongooseConnection() {
  return mongoose.connection;
}
