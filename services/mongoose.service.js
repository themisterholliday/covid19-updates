import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

export async function startMongoose() {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}

export function mongooseConnection() {
  return mongoose.connection;
}
