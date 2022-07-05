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

import {
  BASE_ROUTE,
  BUSINESS_ROUTE,
  CUSTOMER_ROUTE,
  ORDER_ROUTE,
  RAPYD_ROUTE,
  REVIEW_ROUTE,
  S3_ROUTE,
  VENDOR_ROUTE,
  WEBHOOK_ROUTE,
} from "./constants/routes";

import rapydRoute from "./routes/rapyd.route";
import webhookRoute from "./routes/webhook.route";
import businessRoute from "./routes/business.route";
import customerRoute from "./routes/customer.route";
import orderRoute from "./routes/order.route";
import reviewRoute from "./routes/review.route";
import vendorRoute from "./routes/vendor.route";
import s3Route from "./routes/s3.route";

import { User } from "./entities/User";
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
app.use(`${BASE_ROUTE}${BUSINESS_ROUTE}`, businessRoute);
app.use(`${BASE_ROUTE}${CUSTOMER_ROUTE}`, customerRoute);
app.use(`${BASE_ROUTE}${ORDER_ROUTE}`, orderRoute);
app.use(`${BASE_ROUTE}${REVIEW_ROUTE}`, reviewRoute);
app.use(`${BASE_ROUTE}${VENDOR_ROUTE}`, vendorRoute);
app.use(`${BASE_ROUTE}${S3_ROUTE}`, s3Route);

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
