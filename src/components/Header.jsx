import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { HiMenuAlt1 } from 'react-icons/hi';
import { MdLogout } from 'react-icons/md';
import Logo from "../assets/img/wetherheads.png";

const Header = () => {
  const navigate = useNavigate()

  const [dropdown, setDropdown] = useState(false)
  
  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <header>
      <h3>
        <Link to="/dashboard" className="logo">
          <img src={Logo} alt="Whether Heads Logo" />
        </Link>
      </h3>
      <button type="button" className="user-btn" onClick={() => setDropdown(!dropdown)}>
        <FaUserCircle size={30} />
        <HiMenuAlt1 size={25} />
      </button>
      <div className={dropdown ? "dropdown display" : "dropdown"}>
        <div className="dropdown-container">
          <button className="drop-item" onClick={handleLogout}>
            <MdLogout size={27} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header;