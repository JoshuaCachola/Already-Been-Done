const express = require("express");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { Skater } = require("../../../db/models");
const { getSkaterToken } = require("../../../auth");
const {
  /* validateUserSignUp, */
  validateUsernameAndPassword,
} = require("../../../validations");

const router = express.Router();

/**
 *  POST endpoint - /skaters/session
 *    - skater log in
 */
router.post(
  "/session",
  validateUsernameAndPassword,
  asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    const skater = await Skater.findOne({
      where: {
        username,
      },
    });

    if (!skater || !skater.validatePassword(password)) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      return next(err);
    }

    const token = getSkaterToken(skater);
    res.json({
      id: skater.id,
      token,
    });
  })
);

/**
 *  Route - "/api/v1/skater/signup"
 *    POST
 *      - user sign up
 */
router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const {
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const skater = await Skater.create({
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
      hashedPassword,
    });

    const token = getSkaterToken(skater);

    res.status(201).json({
      skater: { id: skater.id },
      token,
    });
  })
);

module.exports = router;
