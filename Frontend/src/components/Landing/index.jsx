import React from "react";
import { Link } from "react-router-dom";

const LadningC = () => {
  return (
    <div>
      <div className="relative h-screen bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1614091199036-e934784dbf0f?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
        <h2 className="p-4 text-4xl text-white">Uber</h2>
      </div>

      <div className="absolute w-full bottom-0 bg-white pb-7 py-4 px-4">
        <h2 className="text-3xl font-bold">Get Started with Uber</h2>
        <Link
          to="/login"
          className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-4"
        >
          Sign Up to Ride
        </Link>
      </div>
    </div>
  );
};

export default LadningC;
