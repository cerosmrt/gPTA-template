import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TokenRefresher = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = async () => {
      const token = localStorage.getItem("token");
      console.log("Current Token:", token); // Debug log

      if (!token) {
        console.log("No token found, redirecting to login.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/refresh-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("New Token:", data.token); // Debug log
          localStorage.setItem("token", data.token);
        } else {
          console.log("Token refresh failed, status:", response.status); // Debug log
          navigate("/login");
        }
      } catch (error) {
        console.error("Error during token refresh:", error); // Debug log
        navigate("/login");
      }
    };

    refreshToken();
  }, [navigate]);

  return null;
};

export default TokenRefresher;
