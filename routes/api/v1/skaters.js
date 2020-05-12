const express = require("express");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { Skater } = require("../../../db/models");
const { getSkaterToken, requireAuth } = require("../../../auth");
const {
  /* validateUserSignUp, */
  validateUsernameAndPassword
} = require("../../../validations");

const router = express.Router();

/**
 *  POST endpoint - /skaters
 *    - skater sign up
 */
// router.post(
//   "/",
//   validateUserSignUp,
//   asyncHandler(async (req, res) => {

//   })
// );

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
        username
      }
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
      token,
      // skater: { id: skater.id }
    });
  })
);

module.exports = router;
