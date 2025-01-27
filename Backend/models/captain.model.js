const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters."],
    },
    lastName: {
      type: String,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters."],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    name: {
      type: String,
      required: true,
      minlength: [3, "Vehicle name must be at least 3 characters."],
    },
    plateNumber: {
      type: String,
      required: true,
      minlength: [2, "Plate number must be at least 2 characters."],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1."],
    },
    vehicleType: {
      type: String,
      enum: ["car", "bike", "autorikshaw"],
      required: true,
    },
    model: {
      type: String,
    },
    images: {
      type: [String],
    },
  },

  location: {
    lan: {
      type: Number,
    },
    lat: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this?._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this?.password);
};

captainSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("Captain", captainSchema);

module.exports = captainModel;
