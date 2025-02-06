import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

const SUGGESTIONS = [
  {
    title: "Kemegoda International Airport",
    subTitle: "KIAL Rd, Devanahalli, Bengluru,Karnataka",
  },
  {
    title: "Kemegoda International Airport",
    subTitle: "KIAL Rd, Devanahalli, Bengluru,Karnataka",
  },
  {
    title: "Kemegoda International Airport",
    subTitle: "KIAL Rd, Devanahalli, Bengluru,Karnataka",
  },
];

const FindTripC = ({
  showSuggestions,
  setShowSuggestions,
  setSelectedSuggestion,
}) => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const handleShowSuggestion = () => {
    setShowSuggestions(true);
  };

  const handleSelectedSuggestion = (sugg) => {
    setSelectedSuggestion(sugg?.title);
    setShowSuggestions(false);
  };

  return (
    <div>
      {showSuggestions && (
        <IoMdArrowRoundBack
          onClick={() => setShowSuggestions(false)}
          size={40}
        />
      )}

      <div>
        <h3 className="text-2xl font-semibold mb-4 mt-4">Find a trip</h3>
        <input
          required
          value={pickup}
          onChange={(e) => {
            setPickup(e.target.value);
          }}
          onClick={() => handleShowSuggestion()}
          className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-2  w-full text-lg placeholder:text-base"
          type="text"
          placeholder="Add a pickup location"
        />
        <input
          required
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
          }}
          onClick={() => handleShowSuggestion()}
          className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-2  w-full text-lg placeholder:text-base"
          type="text"
          placeholder="Enter your destination"
        />
      </div>
      {showSuggestions && (
        <div className="mt-4 space-y-4">
          {SUGGESTIONS.map((sugg, index) => {
            return (
              <div
                key={index}
                onClick={() => handleSelectedSuggestion(sugg)}
                className="relative flex items-center gap-2.5"
              >
                <FaLocationDot />
                <div>
                  <p className="text-xl font-semibold">{sugg?.title}</p>
                  <p className="text-sm text-gray-600 font-medium">
                    {sugg?.subTitle}
                  </p>
                  <div className="absolute -bottom-2 left-7 right-0 bg-gray-400 h-[1px]"></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FindTripC;
