import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";

import UploadImage from "./uploadImage";

const CaptainSignupC = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [model, setModel] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const formData = new FormData();

  const uploadImages = async () => {
    imageFiles?.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/captain/upload`,
        formData
      );

      if (response?.status === 200) {
        const { files } = response?.data;
        return files;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      let imageFilesPaths;
      if (imageFiles) {
        imageFilesPaths = await uploadImages();
      }

      const captainData = {
        fullName: {
          firstName,
          lastName,
        },
        email,
        password,
        vehicle: {
          name: vehicleName,
          plateNumber,
          capacity,
          vehicleType,
          model,
          images: imageFilesPaths,
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/captain/register`,
        captainData
      );

      if (response?.status === 201) {
        navigate("/captain-login");
        toast("Registered Successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.error ||
          "Something went wrong while registering the user."
      );
    }
  };

  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-16 mb-10"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
            alt=""
          />

          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-lg w-1/2  font-medium mb-2">
              What's your name
            </h3>
            <div className="flex gap-4 mb-7">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>

            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
            />

            <h3 className="text-lg font-medium mb-2">Enter Password</h3>

            <input
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              type="password"
              placeholder="password"
            />

            <h3 className="text-lg font-medium mb-2">
              What's your vehicle name
            </h3>
            <input
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
              required
              type="text"
              placeholder="Vehicle name"
            />

            <h3 className="text-lg font-medium mb-2">
              What is the vehicle model
            </h3>
            <input
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              type="text"
              placeholder="Vehicle model"
            />

            <h3 className="text-lg font-medium mb-2">
              What's your plate number
            </h3>
            <input
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              required
              type="text"
              placeholder="Plate number"
            />

            <h3 className="text-lg font-medium mb-2">
              What is the vehicle capacity
            </h3>
            <input
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
              type="number"
              placeholder="Capacity"
            />

            <h3 className="text-lg font-medium mb-2">
              What is the vehicle type
            </h3>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            >
              <option value="">Select vehicle type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="rikshaw">Rikshaw</option>
            </select>

            <UploadImage setImageFiles={setImageFiles} files={imageFiles} />

            <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
              Create account
            </button>
          </form>
          <p className="text-center">
            Already have a account?{" "}
            <Link to="/captain-login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>
        <div>
          <p className="text-xs leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignupC;
