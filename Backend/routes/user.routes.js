const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  register,
  login,
  getUserProfile,
  logout,
} = require("../controllers/user.controller");
const { authVerifier } = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email!"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("Please enter firstname."),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters."),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email!"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters."),
  ],
  login
);

router.get("/profile", authVerifier, getUserProfile);

router.get("/logout", authVerifier, logout);

module.exports = router;
