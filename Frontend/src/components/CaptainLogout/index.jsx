import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CaptainLogoutC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/captain/logout`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response?.status === 200) {
            localStorage.removeItem("token");
            toast("Logout Succesfully!");
            navigate("/captain-login");
          }
        } catch (error) {
          console.log(error);
          if (error?.response?.status === 401) {
            toast.error(error?.response?.data?.message || "Unauthorized");
          } else {
            toast?.error("An unexpected error occurred.");
          }
        }
      } else {
        toast.error("No token found. You might already be logged out.");
      }
    };

    logout();
  }, [navigate]);
  return null;
};

export default CaptainLogoutC;
