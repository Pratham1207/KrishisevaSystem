import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginRegister from "./LoginRegister";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./custom.css";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import PlantDetail from "./PlantDetail";
import ColdStorage from "./ColdStorage";
import SoilDataDashboard from "./SoilDataDemo";

const App: React.FC = () => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/login" element={<LoginRegister />} />
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/plant-details" element={<PlantDetail />} />
          <Route path="/cold-storage" element={<ColdStorage />} />
          <Route path="/soil-data-demo" element={<SoilDataDashboard />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
