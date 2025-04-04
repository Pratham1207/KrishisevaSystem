import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";

import Sidebar from "./components/sidebar/Sidebar";
import Body from "./components/body/Body";

import Plant from "./pages/Plant";
import Fertilizer from "./pages/Fertilizer";
import Pesticides from "./pages/Pesticides";
import Soil from "./pages/Soil";
import Warm from "./pages/Warm";
import ColdStoragePage from "./pages/ColdStorage";
import Faq from "./pages/Faq";
import User from "./pages/User";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";

const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="container">
      <Sidebar />

      {location.pathname === "/" && <Body />}

      <Routes>
        <Route path="/plant" element={<Plant />} />
        <Route path="/fertilizer" element={<Fertilizer />} />
        <Route path="/pesticides" element={<Pesticides />} />
        <Route path="/soil" element={<Soil />} />
        <Route path="/warm" element={<Warm />} />
        <Route path="/coldStorage" element={<ColdStoragePage />} />
        <Route path="/faqs" element={<Faq />} />
        <Route path="/user" element={<User />} />
        <Route path="/contact-messages" element={<ContactUs />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
