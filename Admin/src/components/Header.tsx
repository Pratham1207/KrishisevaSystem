import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import img from "../assets/user.png";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  searchPlaceholder?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = "Welcome to Krishiseva",
  subtitle = "Hello Admin, Welcome back!",
  searchPlaceholder = "Search Dashboard",
}) => {
  return (
    <div className="headerSection flex">
      <div className="title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="searchBar flex">
        <input type="text" placeholder={searchPlaceholder} />
        <BiSearchAlt className="icon" />
      </div>

      <div className="adminDiv flex">
        <TbMessageCircle className="icon" />
        <MdOutlineNotificationsNone className="icon" />
        <div className="adminImage">
          <img src={img} alt="Admin Profile" />
        </div>
      </div>
    </div>
  );
};

export default Header;
