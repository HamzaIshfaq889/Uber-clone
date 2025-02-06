import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../../zustand/store";
import { toast } from "react-toastify";

const ProtectWrapperC = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = useStore();

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setLoading(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.status === 200) {
          const { user } = response?.data;
          setUser(user);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        if (error?.response?.status === 401) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error(error?.message || "Something went wrong.");
        }

        navigate("/login");
      }
    };

    verifyToken();
  }, [token]);

  if (loading) {
    return <>Loadinga...</>;
  }

  return <>{children}</>;
};

export default ProtectWrapperC;
