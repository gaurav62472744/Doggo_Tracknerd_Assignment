import React from "react";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = () => {
  return (
    <Box
      className="container"
      fontFamily="Philosopher"
      display="flex"
      justifyContent={{ base: "space-evenly", md: "space-between" }}
      alignItems="center"
      px={{ md: "40px" }}
    >
      <Box>
        <Link to="/">
          <button className="nav-button">Doggo</button>
        </Link>
      </Box>
      <Box
        display="flex"
        gap={{ base: "30px", md: "48px" }}
        justifyContent="center"
        alignItems="center"
      >
        <Link to="/list">
          <button className="nav-button">List</button>
        </Link>
        <Link to="/track">
          <button className="nav-button">Track</button>
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
