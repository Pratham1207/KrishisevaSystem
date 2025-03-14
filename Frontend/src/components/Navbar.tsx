import React, { useState } from "react";
import Logo from "../Assets/Logo.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

interface MenuItem {
  text: string;
  // icon: JSX.Element;
  path: string;
}

const Navbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const menuOptions: MenuItem[] = [
    { text: "Home", path: "/" },
    { text: "Cold Storage", path: "/cold-storage" },
    { text: "Plants", path: "/plant-details" },
    { text: "About Us", path: "/about-us" },
    { text: "Contact Us", path: "/contact-us" },
  ];

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo-container">
        <img src={Logo} alt="Logo" className="nav-logo" />
        <span className="nav-title">KrishiSeva</span>
      </div>
      <div className="navbar-links-container">
        {menuOptions.map((item) => (
          <Link key={item.text} to={item.path}>
            {item.text}
          </Link>
        ))}
        <button className="primary-button" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
