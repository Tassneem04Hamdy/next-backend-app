import mongoose from "mongoose";

const mongoURI = process.env.MONGOURI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected.");
    return;
  }
  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    await mongoose.connect(mongoURI!);
    console.log("Connected to database.");

  } catch (err) {
    console.error('failed to connect to mongodb:\n', err);
    throw new Error("Error connecting to database.");
  }
};

export default connect;
