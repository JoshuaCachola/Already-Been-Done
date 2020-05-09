const express = require("express");
const asyncHandler = require("express-async-handler");

const router = express.Router();

/**
 *  POST endpoint - /skaters/token
 *    - skate log in
 */
router.post(
  "/token", 
  asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    
  })
);
