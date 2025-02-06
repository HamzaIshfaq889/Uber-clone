const express = require("express");
const router = express.Router();
const { captainAuthVerifer } = require("../middlewares/auth.middleware");
const uploadMiddleware = require("../middlewares/upload.middleware");
const { body } = require("express-validator");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  register,
  login,
  logout,
  getCaptainProfile,
  uploadFiles,
} = require("../controllers/captain.controller");

router.post(
  "/register",
  body("fullName.firstName")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters."),
  body("email").isEmail().withMessage("Email must be valid."),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters."),
  body("vehicle.name")
    .isLength({ min: 3 })
    .withMessage("Vehicle name must be at least 3 characters."),
  body("vehicle.plateNumber")
    .isLength({ min: 2 })
    .withMessage("Plate number must be at least 2 characters."),
  body("vehicle.capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1."),
  body("vehicle.vehicleType")
    .isIn(["car", "bike", "autorikshaw"])
    .withMessage("Vehicle type must be car, bike or autorikshaw."),
  register
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Email must be valid."),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters."),
  login
);

router.get("/logout", captainAuthVerifer, logout);

router.get("/profile", captainAuthVerifer, getCaptainProfile);

router.post("/upload", uploadMiddleware.array("images"), uploadFiles);

module.exports = router;
