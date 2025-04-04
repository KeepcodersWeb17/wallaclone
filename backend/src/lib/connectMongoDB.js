import mongoose from "mongoose";

mongoose.connection.on("error", (error) => {
  console.error("Failed to connect to MongoDB: ", error.message);
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB: " + mongoose.connection.name);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("Failed to connect to MongoDB: ", error.message);
    process.exit(1);
  }
};
