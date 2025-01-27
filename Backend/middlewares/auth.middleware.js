const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userModel = require("../models/user.model");
const BlackListTokenModel = require("../models/blacklistToken.model");

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

    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    req.user = user;

    return next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = { authVerifier };
