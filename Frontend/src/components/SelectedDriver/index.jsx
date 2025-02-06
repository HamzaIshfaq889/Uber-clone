import React from "react";
import { FaCarAlt } from "react-icons/fa";
import { TbCurrentLocation } from "react-icons/tb";
import { FaLocationDot, FaMoneyBill1Wave } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";

const SelectedDriverC = ({ setSelectedDriver }) => {
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FaCarAlt size={40} />
        <div className="-space-y-1">
          <p className="text-xl text-gray-700 font-semibold">Hamza</p>
          <p className="text-2xl text-gray-800 font-bold">MNR 8620</p>
          <p className=" text-gray-600">Civic 2025</p>
          <p className=" text-gray-600">Rating 4.8</p>
        </div>
      </div>
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

export default SelectedDriverC;
