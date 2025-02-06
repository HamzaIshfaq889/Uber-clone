import React from "react";
import { FaCarAlt } from "react-icons/fa";
import { RiEBike2Fill } from "react-icons/ri";
import { FaCaravan } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";

const ridesAvailable = [
  {
    icon: <FaCarAlt size={35} />,
    name: "UberGo",
    distance: "2 mins away",
    description: "Affordable,Compact rides",
    fare: "1900",
  },
  {
    icon: <RiEBike2Fill size={35} />,
    name: "Moto",
    distance: "2 mins away",
    description: "Affordable,Compact rides",
    fare: "1900",
  },
  {
    icon: <FaCaravan size={35} />,
    name: "Rikshaw",
    distance: "2 mins away",
    description: "Affordable,Compact rides",
    fare: "1900",
  },
];

const NearbyRidesC = ({
  selectedSuggestion,
  setSelectedSuggestion,
  setShowSuggestions,
  setSelectedRide,
}) => {
  const handleBack = () => {
    setSelectedSuggestion("");
    setShowSuggestions(true);
  };

  const handleSelectedRide = (ride) => {
    setSelectedRide(ride?.name);
  };

  return (
    <>
      <IoMdArrowRoundBack onClick={() => handleBack()} size={40} />

      <div className="space-y-4">
        {ridesAvailable.map((ride, index) => {
          return (
            <div
              key={index}
              onClick={() => handleSelectedRide(ride)}
              className="flex justify-between px-2 "
            >
              <div className="flex items-center gap-4">
                {ride?.icon}
                <div className="leading-3.5">
                  <p className="text-gray-700 text-xl font-semibold">
                    {ride?.name}
                  </p>
                  <p className="text-gray-700 text-sm font-medium">
                    {ride?.distance}
                  </p>
                  <p className="text-gray-500 text-sm">{ride?.description}</p>
                </div>
              </div>
              <p className="ml-auto self-start text-gray-700 text-lg font-semibold">
                {ride?.fare}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NearbyRidesC;
