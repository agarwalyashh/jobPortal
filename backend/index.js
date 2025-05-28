const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/error");
const errorController = require("./controllers/errorController");
const companyRoute = require("./routes/companyRoute")
const jobRoute = require("./routes/jobRoute")
const userRoute = require("./routes/userRoute")
const { clerkWebHooks } = require("./controllers/webHooks");
const {clerkMiddleware,getAuth} = require("@clerk/express")

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(cors({ origin: "https://job-portal-five-gilt.vercel.app", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  next();
});
app.get('/', (req, res) => {
  res.send('API is running');
});

app.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  clerkWebHooks
);
app.use(clerkMiddleware())
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/job",jobRoute)
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); 
});

app.use(errorController);
module.exports = app;
