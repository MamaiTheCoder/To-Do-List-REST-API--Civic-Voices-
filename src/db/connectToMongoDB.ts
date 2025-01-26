import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    const mongoDbUri = process.env.MONGO_DB_URI;
    console.log('====================================');
    console.log(mongoDbUri);
    console.log('====================================');

    if (!mongoDbUri) {
      throw new Error("MONGO_DB_URI environment variable is not defined");
    }

    const conn = await mongoose.connect(process.env.MONGO_DB_URI as string, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // Since 'error' is of type 'unknown', we need to check if it's an instance of Error
    if (error instanceof Error) {
      console.log(`Error in connectMongoDB.js ${error.message}`);
      process.exit(1);
    } else {
      console.log("Unknown error in connectMongoDB.js");
    }
  }
};

export default connectToMongoDB;
