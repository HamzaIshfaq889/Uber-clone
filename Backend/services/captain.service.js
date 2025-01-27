const mongoose = require("mongoose");
const captainModel = require("../models/captain.model");

const createCaptain = async ({
  fullName,
  email,
  password,
  socketId,
  status,
  vehicle,
  location,
}) => {
  if (!fullName?.firstName || !email || !password || !vehicle) {
    throw new Error("Missing required fields.");
  }

  const captain = new captainModel({
    fullName,
    email,
    password,
    socketId,
    status,
    vehicle,
    location,
  });
  await captain.save();

  return captain;
};

module.exports = { createCaptain };
