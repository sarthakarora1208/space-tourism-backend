import "reflect-metadata";
import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";
import AWS from "aws-sdk";
import session from "express-session";

const xss = require("xss-clean");

//import configFn from "./config/config";

import errorHandler from "./middleware/error";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { BASE_ROUTE, RAPYD_ROUTE, WEBHOOK_ROUTE } from "./constants/routes";

import rapydRoute from "./routes/rapyd.route";
import webhookRoute from "./routes/webhook.route";
import { Business } from "./entities/Business";
import { SpaceService } from "./entities/SpaceService";
import { Rate } from "./entities/Rate";
import { Order } from "./entities/Order";
import { Review } from "./entities/Review";

dotenv.config({ path: path.join(__dirname, "config", "config.env") });

export const environment = process.env.NODE_ENV;

// Connect to Postgres

export const s3bucket = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

export const cognitoIdentityServiceProvider =
  new AWS.CognitoIdentityServiceProvider({
    apiVersion: "2016-04-18",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION,
  });

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: true,
  synchronize: false,
  port: 5432,
  entities: [User, Business, Order, Review, SpaceService, Rate],
});

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const PORT = process.env.PORT || 5000;
console.log(
  (async () => {
    console.log(await dataSource.getRepository(User).find());
  })()
);

// app
const app = express();

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(function (req, res, next) {
  console.log("Requested path: %s", req.path);
  next();
});

// Set security headers
app.use(helmet());

// Prevent //XSS attacks
app.use(xss());

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Body parser
app.use(express.json());
// Express body parser
app.use(express.urlencoded({ extended: true }));
// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});

//app.use(limiter);
// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
//app.use(express.static(path.join(__dirname, "public")));

app.use(errorHandler);
//app.use(`${BASE_ROUTE}${AUTH}`, );

app.use(`${BASE_ROUTE}${RAPYD_ROUTE}`, rapydRoute);
app.use(`${BASE_ROUTE}${WEBHOOK_ROUTE}`, webhookRoute);

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
