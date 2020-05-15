module.exports = {
  // environment: process.env.NODE_ENV || "development",
  api:
    process.env.NODE_DEV === "development"
      ? process.env.DEV_API
      : process.env.PROD_API,
  port: process.env.PORT,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
  },
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};