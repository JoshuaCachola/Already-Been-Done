const cors = require("cors");
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const path = require("path");

const routes = require("./routes");

const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(helmet({ hsts: false }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use(routes);

// Catch unhandled requests and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// Generic error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = process.env.NODE_ENV === "production";
  console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;