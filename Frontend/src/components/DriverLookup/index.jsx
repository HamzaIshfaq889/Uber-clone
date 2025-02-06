import React from "react";

import { FaCarAlt } from "react-icons/fa";
import { TbCurrentLocation } from "react-icons/tb";
import { FaLocationDot, FaMoneyBill1Wave } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";

import { motion } from "framer-motion";

const DriverLookupC = ({ setSelectedRide }) => {
  const PulsatingLine = () => {
    return (
      <motion.div
        className="w-full h-1 bg-gradient-to-r from-blue-500 via-white to-blue-500"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      />
    );
  };

  const handleBack = () => {
    setSelectedRide("");
  };

  return (
    <div className="space-y-3">
      <IoMdArrowRoundBack onClick={() => handleBack()} size={40} />
      <h3 className="text-gray-900 text-xl font-semibold text-center">
        Looking for nearby drivers
      </h3>
      <PulsatingLine />
      <div className="flex justify-center py-2 items-center">
        <FaCarAlt size={60} />
      </div>
      <div className="bg-gray-500 w-full h-[1px]"></div>
      <div className="space-y-5 mt-4">
        <div className="relative flex items-center gap-2.5">
          <TbCurrentLocation size={20} />
          <div>
            <p className="text-lg font-medium text-black">Third Wave Coffe</p>
            <p className="text-gray-700">
              Kalikondrali, Bengluru, Karnataka,Bengluru
            </p>
            <div className="absolute bg-gray-500 w-full h-[1px] mt-2.5"></div>
          </div>
        </div>

        <div className=" relative flex items-center gap-2.5">
          <FaLocationDot size={20} />
          <div>
            <p className="text-lg font-medium text-black">562/11-A</p>
            <p className="text-gray-700">Kalikondrali, Bengluru, Karnataka</p>
            <div className="absolute bg-gray-500 w-full h-[1px] mt-2.5"></div>
          </div>
        </div>

        <div className=" relative flex items-center gap-2.5">
          <FaMoneyBill1Wave size={20} />
          <div>
            <p className="text-lg font-medium text-black">193.20</p>
            <p className="text-gray-700">Cash Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverLookupC;
