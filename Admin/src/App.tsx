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
import PrivateRoute from "./services/PrivateRoute";

const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="container">
      <Sidebar />

      <Routes>
        <Route
          path="/plant"
          element={
            <PrivateRoute>
              <Plant />
            </PrivateRoute>
          }
        />
        <Route
          path="/fertilizer"
          element={
            <PrivateRoute>
              <Fertilizer />
            </PrivateRoute>
          }
        />
        <Route
          path="/pesticides"
          element={
            <PrivateRoute>
              <Pesticides />
            </PrivateRoute>
          }
        />
        <Route
          path="/soil"
          element={
            <PrivateRoute>
              <Soil />
            </PrivateRoute>
          }
        />
        <Route
          path="/warm"
          element={
            <PrivateRoute>
              <Warm />
            </PrivateRoute>
          }
        />
        <Route
          path="/coldStorage"
          element={
            <PrivateRoute>
              <ColdStoragePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/faqs"
          element={
            <PrivateRoute>
              <Faq />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact-messages"
          element={
            <PrivateRoute>
              <ContactUs />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Body />
            </PrivateRoute>
          }
        />
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
