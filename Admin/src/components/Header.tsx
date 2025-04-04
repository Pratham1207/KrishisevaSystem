import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import img from "../assets/user.png";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem as MuiMenuItem,
} from "@mui/material";

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
  const navigate = useNavigate();
  const admin = localStorage.getItem("adminUser");
  const adminObj = admin ? JSON.parse(admin) : null;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
    handleClose();
    navigate("/login");
  };

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
        {adminObj ? (
          <>
            <IconButton onClick={handleMenuClick}>
              <Avatar>{adminObj.name.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MuiMenuItem disabled>{adminObj.email}</MuiMenuItem>
              <MuiMenuItem onClick={handleLogout}>Logout</MuiMenuItem>
            </Menu>
          </>
        ) : (
          <div className="adminImage">
            <img src={img} alt="Admin Profile" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
