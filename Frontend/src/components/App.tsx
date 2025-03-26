import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginRegister from "./LoginRegister";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import PlantDetail from "./PlantDetail";
import ColdStorage from "./ColdStorage";
import UserProfile from "./UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/custom.css";
import PageNotFound from "./PageNotFound";

const App: React.FC = () => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        <Routes>
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/plant-details" element={<PlantDetail />} />
          <Route path="/cold-storage" element={<ColdStorage />} />
          <Route path="/profile" element={<UserProfile />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
