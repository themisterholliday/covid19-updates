import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

export async function startMongoose() {
  console.log('Connecting to MongoDB');
  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}

export function mongooseConnection() {
  return mongoose.connection;
}
