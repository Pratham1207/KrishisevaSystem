import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";

import { BsQuestionCircle } from "react-icons/bs";
import { PiPlantFill } from "react-icons/pi";
import { FaSunPlantWilt, FaUsers } from "react-icons/fa6";
import { GiFertilizerBag, GiMedicinePills } from "react-icons/gi";
import { MdOutlineDirtyLens, MdQuestionAnswer } from "react-icons/md";
import { SiSwarm } from "react-icons/si";
import { TbBrandBooking } from "react-icons/tb";

const Sidebar: React.FC = () => {
  return (
    <div className="sideBar grid">
      <div className="logoDiv flex">
        <img src={logo} alt="Krishiseva logo" />
        <h2>Krishiseva</h2>
      </div>

      <div className="menuDiv">
        <h3 className="divTitle">QUICK MENU</h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <Link to="/plant" className="menuLink flex">
              <PiPlantFill className="icon" />
              <span className="smallText">Plant</span>
            </Link>
          </li>
          <li className="listItem">
            <Link to="/fertilizer" className="menuLink flex">
              <GiFertilizerBag className="icon" />
              <span className="smallText">Fertilizer</span>
            </Link>
          </li>
          <li className="listItem">
            <Link to="/pesticides" className="menuLink flex">
              <GiMedicinePills className="icon" />
              <span className="smallText">Pesticide</span>
            </Link>
          </li>
          <li className="listItem">
            <Link to="/soil" className="menuLink flex">
              <MdOutlineDirtyLens className="icon" />
              <span className="smallText">Soil</span>
            </Link>
          </li>
          <li className="listItem">
            <Link to="/warm" className="menuLink flex">
              <SiSwarm className="icon" />
              <span className="smallText">Warm</span>
            </Link>
          </li>
          <li className="listItem">
            <Link to="/coldstorage" className="menuLink flex">
              <TbBrandBooking className="icon" />
              <span className="smallText">Cold Storage</span>
            </Link>
          </li>
          <li className="listItem">
            <Link to="/faqs" className="menuLink flex">
              <MdQuestionAnswer className="icon" />
              <span className="smallText">FAQs</span>
            </Link>
          </li>
          <li className="listItem">
            <Link to="/user" className="menuLink flex">
              <FaUsers className="icon" />
              <span className="smallText">User</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="sideBarCard">
        <BsQuestionCircle className="icon" />
        <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <h3>Help Center</h3>
          <p>Having trouble in Krishiseva? Contact us for assistance.</p>
          <button className="btn">Go to Help Center</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
