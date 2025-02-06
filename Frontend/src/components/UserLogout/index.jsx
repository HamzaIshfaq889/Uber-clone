import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserLogoutC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/logout`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response?.status === 200) {
            localStorage.removeItem("token");
            navigate("/login");
            toast.success("Logout successful!");
          }
        } catch (error) {
          console.log(error);
          toast.error("An unexpected error occurred.");
        }
      } else {
        toast.error("No token found. You might already be logged out.");
      }
    };

    logout();
  }, [navigate]);

  return null;
};

export default UserLogoutC;
