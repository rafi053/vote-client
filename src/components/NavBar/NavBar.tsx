import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {

  return (
    <div className="NavBar">
      <Link to={"/candidates"}>
        <button className="link">Candidates</button>
      </Link>
      <Link to={"users"}>
        <button className="link">Users</button>
      </Link>
      <Link to={"/login"}>
        <button className="link">Login</button>
      </Link>
      
    </div>
  );
};

export default NavBar;
