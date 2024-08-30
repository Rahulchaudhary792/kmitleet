import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate(); 
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav>
      <div className="navbar-container">
        {localStorage.getItem('admin') === "true" ?
        <div style={{"position": "absolute", "right": "150px"}}>
          <Link to="/admin" style={{"textDecoration": "none"}}><b>{localStorage.getItem("name")}</b></Link>
        </div>
        : ' '}
        <button className="logout-btn" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
