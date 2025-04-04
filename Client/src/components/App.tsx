import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegister from "./LoginRegister";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import PlantDetail from "./PlantDetail";
import ColdStorage from "./ColdStorage";
import AddColdStorage from "./AddColdStorage";
import SoilDataDashboard from "./SoilDataDemo";
import UserProfile from "./UserProfile";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/custom.css";
import ProtectedRoute from "../services/ProtectedRoute";

const protectedPaths = ["/add-cold-storage", "/profile"];

const App: React.FC = () => {
  const isProtected = (path: string) => protectedPaths.includes(path);
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
          <Route
            path="/add-cold-storage"
            element={
              isProtected("/add-cold-storage") ? (
                <ProtectedRoute>
                  <AddColdStorage />
                </ProtectedRoute>
              ) : (
                <AddColdStorage />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isProtected("/profile") ? (
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              ) : (
                <UserProfile />
              )
            }
          />
          <Route path="/soil-data-demo" element={<SoilDataDashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
export default App;
