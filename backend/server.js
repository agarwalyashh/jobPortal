const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const { connectCloudinary } = require("./utils/cloudinary");
const app = require("./index");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const password = process.env.DATABASE_PASSWORD;
const DB = process.env.DATABASE.replace("<PASSWORD>", password);

const startServer = async () => {
  try {
    await connectCloudinary();
    await mongoose.connect(DB);
    console.log("Connected to MongoDB");

    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });

    process.on("unhandledRejection", (err) => {
      console.log("UNHANDLED REJECTION! Shutting down...");
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (err) {
    console.log("Startup error:", err.message);
    process.exit(1);
  }
};

startServer();
