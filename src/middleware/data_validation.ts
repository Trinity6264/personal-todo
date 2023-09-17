import validator, { ValidationChain } from "express-validator";

const signUpValidation: Array<ValidationChain> = [
  validator
    .body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 2 })
    .withMessage("Username must be at least 2 characters"),
  validator
    .body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  validator
    .body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 6 characters and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol"
    ),
];

const loginValidation: Array<ValidationChain> = [
  validator
    .body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  validator
    .body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 6 characters and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol"
    ),
];

const refreshTokenValidation: Array<ValidationChain> = [
  validator
    .body("token")
    .notEmpty()
    .withMessage("Token is required")
    .isJWT()
    .withMessage("Invalid token"),
];

export { signUpValidation, loginValidation, refreshTokenValidation };
