import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a fetch and redirect
    const fetchUrl = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${code}`);
        const data = await response.json();

        if (response.ok) {
          window.location.href = data.originalUrl;
        } else {
          navigate("/404");
        }
      } catch (error) {
        console.error("Error fetching redirect URL:", error);
        navigate("/404");
      }
    };

    fetchUrl();
  }, [code, navigate]);

  return (
    <div className="h-screen flex items-center justify-center text-lg font-medium text-slate-600">
      Redirecting...
    </div>
  );
};

export default RedirectPage;
