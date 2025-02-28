const { body, validationResult } = require("express-validator");

// Email validation regex and function
const emailRegex =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function isEmailValid(email) {
  if (!email) return false;
  if (email.length > 254) return false;

  // Check for multiple @ symbols
  if ((email.match(/@/g) || []).length !== 1) return false;

  var valid = emailRegex.test(email);
  if (!valid) return false;

  var parts = email.split("@");
  if (parts[0].length > 64) return false;

  var domainParts = parts[1].split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  )
    return false;

  return true;
}

// Validation middleware to check results
const validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

const validateRegistration = [
  body("email")
    .trim()
    .custom((value) => {
      if (!isEmailValid(value)) {
        throw new Error("Please enter a valid email address");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("companyName").trim().notEmpty().withMessage("Company name is required"),
  body("dateOfBirth")
    .isISO8601()
    .toDate()
    .withMessage("Please enter a valid date"),
  validateResults, // Add this as the last middleware
];

const validateLogin = [
  body("email")
    .trim()
    .custom((value) => {
      if (!isEmailValid(value)) {
        throw new Error("Please enter a valid email address");
      }
      return true;
    }),
  body("password").notEmpty().withMessage("Password is required"),
  validateResults, // Add this as the last middleware
];

module.exports = {
  validateRegistration,
  validateLogin,
};
