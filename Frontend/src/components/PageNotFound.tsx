import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="container text-center py-5">
      <h1 className="display-4 mb-3">404 - Page Not Found</h1>
      <p className="lead mb-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button className="btn btn-success px-4 py-2" onClick={goHome}>
        Go to Home
      </button>
    </div>
  );
};

export default PageNotFound;
