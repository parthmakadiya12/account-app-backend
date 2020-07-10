import mongoose from "mongoose";

var state = {
  db: null
};

exports.get = () => {
  return state.db;
};

export const connect = (mongoDbUrl, HandleError) => {
  if (state.db) return done();

  mongoose
    .connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(db => {
      console.log("Successfully Connected to Mongodb");
      state.db = db;
    })
    .catch((err, d) => HandleError(err));
};
