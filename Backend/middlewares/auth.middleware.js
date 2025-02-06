const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../models/user.model");
const BlackListTokenModel = require("../models/blacklistToken.model");
const CaptainModel = require("../models/captain.model");

dotenv.config();

const authVerifier = async (req, res, next) => {
  const token =
    req?.cookies?.token || req?.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized No token provided" });
  }

  const isBlackListed = await BlackListTokenModel.findOne({ token });
  if (isBlackListed) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded._id);
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    req.user = user;

    return next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
};

const captainAuthVerifer = async (req, res, next) => {
  const token =
    req?.cookies?.token || req?.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized, No token provided" });
  }

  const isBlackListed = await BlackListTokenModel.findOne({ token });
  console.log(isBlackListed);
  if (isBlackListed) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  console.log(decoded);

  const captain = await CaptainModel.findById(decoded?._id);
  console.log(captain);
  if (!captain) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  req.captain = captain;

  return next();
};

module.exports = { authVerifier, captainAuthVerifer };
