const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const AppError = require("./utils/error");
const errorController = require("./controllers/errorController");

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); 
// });

// app.use(errorController);
module.exports = app;
