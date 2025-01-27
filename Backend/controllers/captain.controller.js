const { validationResult } = require("express-validator");
const { createCaptain } = require("../services/captain.service");
const captainModel = require("../models/captain.model");
const BlacklistTokenModel = require("../models/blacklistToken.model");

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors?.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, socketId, status, vehicle, location } =
      req.body;

    const isEmailAlreadyRegistered = await captainModel.findOne({ email });
    if (isEmailAlreadyRegistered) {
      res.status(400).json({ error: "Email already registered." });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
      fullName,
      email,
      password: hashedPassword,
      socketId,
      status,
      vehicle,
      location,
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ captain, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(400).json({ error: "Invalid email or password." });
  }

  const isValidPassword = await captain.comparePassword(password);
  if (!isValidPassword) {
    return res.status(400).json({ error: "Invalid email or password." });
  }

  const token = captain.generateAuthToken();

  res.status(200).json({ captain, token });
};

const logout = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  const blackListedtoken = new BlacklistTokenModel({ token });
  await blackListedtoken.save();

  res.status(200).json({ message: "Logout successfully." });
};

module.exports = { register, login, logout };
