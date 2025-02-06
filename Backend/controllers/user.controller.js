const userModal = require("../models/user.model");
const BlacklistTokenModel = require("../models/blacklistToken.model");
const { validationResult } = require("express-validator");
const { createUser } = require("../services/user.service");

const register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;

  const isEmailAlreadyRegistered = await userModal.findOne({ email });
  console.log(isEmailAlreadyRegistered);
  if (isEmailAlreadyRegistered) {
    return res.status(400).json({ error: "Email already registered." });
  }

  const hashedPassword = await userModal.hashPassword(password);

  const user = await createUser({
    firstName: fullName?.firstName,
    lastName: fullName?.lastName,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).send({ token, user });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModal.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).send({ message: "Invalid Credentials" });
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(404).send({ message: "Invalid Credentials" });
  }

  const token = user.generateAuthToken();

  return res.status(200).send({ token, user });
};

const getUserProfile = (req, res, next) => {
  res.status(200).send(req.user);
};

const logout = async (req, res, next) => {
  const token =
    req?.cookies?.token || req?.headers?.authorization?.split(" ")[1];

  const blackListToken = new BlacklistTokenModel({ token });
  await blackListToken.save();

  res.status(200).send({ message: "Logged out successfully!" });
};

module.exports = {
  register,
  login,
  getUserProfile,
  logout,
};
