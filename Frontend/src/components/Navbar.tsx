import React, { useState } from "react";
import Logo from "../Assets/Logo.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Menu,
  MenuItem as MuiMenuItem,
  IconButton,
  Avatar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

interface MenuItem {
  text: string;
  path: string;
}

const Navbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const menuOptions: MenuItem[] = [
    { text: "Home", path: "/" },
    { text: "Cold Storage", path: "/cold-storage" },
    { text: "Plants", path: "/plant-details" },
    { text: "About Us", path: "/about-us" },
    { text: "Contact Us", path: "/contact-us" },
  ];

  const user = localStorage.getItem("user");
  const userObj = user ? JSON.parse(user) : null;

  const handleProfileMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setToggleMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setToggleMenu(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSignIn = () => {
    navigate("/login");
  };
  console.log(userObj);

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

        {!userObj ? (
          <button className="primary-button" onClick={handleSignIn}>
            Sign In
          </button>
        ) : (
          <>
            <IconButton onClick={handleProfileMenuClick}>
              <Avatar>{userObj.name.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
            <Menu
              anchorEl={toggleMenu}
              open={Boolean(toggleMenu)}
              onClose={handleMenuClose}
            >
              <MuiMenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/profile");
                }}
              >
                My Profile
              </MuiMenuItem>
              <MuiMenuItem onClick={handleLogout}>Logout</MuiMenuItem>
            </Menu>
          </>
        )}
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
