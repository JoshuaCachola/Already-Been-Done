const { check } = require("express-validator");

const validateUserSignUp = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a first name.")
    .isLength({ max: 50 })
    .withMessage("First name cannot be more than 50 characters long."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a last name.")
    .isLength({ max: 50 })
    .withMessage("Last name cannot be more than 50 characters long."),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an email.")
    .isEmail()
    .withMessage("Please provide a valid email.")
    .isLength({ max: 100 })
    .withMessage("Email cannot be more than 100 characters long"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  check('confirmPassword', 'passwordConfirmation field must have the same value as the password field')
    .exists({ checkFalsy: true })
    .custom((value, { req }) => value === req.body.password)
];

const validateUsernameAndPassword = [
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Please provide a username that is between 3 and 50 characters long."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password.")
    .isLength({ min: 8, max: 50 })
    .withMessage("Please provide a password that is at between 8 and 50 characters long.")
];

module.exports = {
  validateUserSignUp,
  validateUsernameAndPassword
};
