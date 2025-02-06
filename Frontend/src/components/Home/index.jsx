import React, { useState } from "react";
import FindTripC from "../FindTrip";
import NearbyRidesC from "../NearbyRides";
import DriverLookupC from "../DriverLookup";
import SelectedDriverC from "../SelectedDriver";

const HomeC = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [selectedRide, setSelectedRide] = useState("");
  const [SelectedDriver, setSelectedDriver] = useState(false);

  return (
    <div className="relative w-screen h-screen bg-center bg-cover bg-[url(https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg)]">
      <h2 className="p-4 text-4xl text-black">Uber</h2>

      {!selectedSuggestion && !selectedRide ? (
        <div
          className={`px-4 py-8 bg-white w-full absolute  ${
            showSuggestions ? "top-0 h-screen" : "bottom-0 rounded-t-3xl"
          }`}
        >
          <FindTripC
            setShowSuggestions={setShowSuggestions}
            showSuggestions={showSuggestions}
            setSelectedSuggestion={setSelectedSuggestion}
          />
        </div>
      ) : null}

      {selectedSuggestion && !selectedRide ? (
        <div
          className={`px-4 py-8 bg-white w-full absolute  ${
            showSuggestions ? "top-0 h-screen" : "bottom-0 rounded-t-3xl"
          }`}
        >
          <NearbyRidesC
            selectedSuggestion={selectedSuggestion}
            setShowSuggestions={setShowSuggestions}
            setSelectedSuggestion={setSelectedSuggestion}
            setSelectedRide={setSelectedRide}
          />
        </div>
      ) : null}

      {selectedRide ? (
        <div
          className={`px-4 py-8 bg-white w-full absolute  ${
            showSuggestions ? "top-0 h-screen" : "bottom-0 rounded-t-3xl"
          }`}
        >
          <DriverLookupC setSelectedRide={setSelectedRide} />
        </div>
      ) : null}

      {SelectedDriver ? (
        <div
          className={`px-4 py-8 bg-white w-full absolute  ${
            showSuggestions ? "top-0 h-screen" : "bottom-0 rounded-t-3xl"
          }`}
        >
          <SelectedDriverC setSelectedDriver={setSelectedDriver} />
        </div>
      ) : null}
    </div>
  );
};

export default HomeC;
