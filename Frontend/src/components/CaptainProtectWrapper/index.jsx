import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import { toast } from "react-toastify";

const CaptainProtectWrapperC = ({ children }) => {
  const navigate = useNavigate();
  const { setCaptain } = useStore();
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        navigate("/captain-login");
        setLoading(false);
        return;
      }
      setLoading(true);

      console.log(token);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/captain/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.status === 200) {
          const { captain } = response?.data;
          setLoading(false);
          setCaptain(captain);
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");

        if (error?.response?.status === "401") {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error(error?.message || "Something went wrong.");
        }

        navigate("/captain-login");
      }
    };

    verifyToken();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapperC;
