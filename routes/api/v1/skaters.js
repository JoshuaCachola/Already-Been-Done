const express = require("express");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { Skater } = require("../../../db/models");
const { getSkaterToken } = require("../../../auth");
const {
  /* validateUserSignUp, */
  validateUsernameAndPassword,
} = require("../../../validations");
const { requireAuth } = require("../../../auth");

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

/**
 * Route - "/api/v1/skaters/:skaterid"
 *    GET - get skater profile info
 */
router.get(
  "/:skaterid(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skaterId = parseInt(req.params.skaterid, 10);
    const skater = await Skater.findOne({
      where: {
        id: skaterId,
      },
    });

    res.json(skater);
  })
);

/**
 * Route - "/api/v1/skaters/:skaterid/change-profile-picture"
 *    PATCH - change skater profile picture
 */
router.patch(
  "/:skaterid(\\d)/change-profile-picture",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skaterId = parseInt(req.params.skaterid, 10);
    const skater = await Skater.findByPk(skaterId);
    const { profileImg } = req.body;

    if (skater) {
      skater.accountPhoto = profileImg;
      await skater.save();
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  })
);

/**
 * Route - "api/v1/skaters/:skaterid/profile-picture"
 *    GET - get skater profile picture
 */
router.get(
  "/:skaterid(\\d)/profile-picture",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skaterId = parseInt(req.params.skaterid, 10);
    const skater = await Skater.findByPk(skaterId);

    res.json({ accountPhoto: skater.accountPhoto });
  })
);

module.exports = router;
