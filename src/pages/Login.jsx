import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { baseURL } from "../shared/baseURL";
import Swal from 'sweetalert2';
import { MdOutlineEmail, MdLockOpen } from 'react-icons/md';
import Logo from "../assets/img/wetherheads.png";
import { TiThListOutline, TiStopwatch } from 'react-icons/ti';

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem("token")

  useEffect(() => {
    if(localStorage.getItem("token")) {
      navigate("/dashboard")
    }
  }, [navigate, token])
  

  const handleLogin = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      setLoading(true)
      const { data } = await axios.post(baseURL + "/auth/login", {
        email,
        password,
      }, config)
      localStorage.setItem("token", data.authToken)
      setLoading(false)
      navigate("/dashboard")
    }
    catch(err){
      Swal.fire({
        icon: 'error',
        title: 'Ooops',
        text: `${err.response && err.response.data.message ? err.response.data.message : err.message}`
      })
      setLoading(false)
    }
  }

  return (
    <div id="login-container">
      <form onSubmit={handleLogin}>
        <div className="logo-area">
          <img src={Logo} alt="Whether Heads Logo" />
        </div>
        <h1>Login</h1>
        <div className="form-grp">
          <label htmlFor="email"><MdOutlineEmail size={20} color="#10923b" />Email</label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="password"><MdLockOpen size={20} color="#10923b" />Password</label>
          <input 
            type="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <div className="form-grp_btn">
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
      <div className="inventory-links">
        <Link to="/time-sheet" target="_blank">
          <TiStopwatch size={25} color='#333' />
          Time Sheet
        </Link>
        <Link to="stock" target="_blank">
          <TiThListOutline size={25} color='#333' />
          Stock
        </Link>
      </div>
    </div>
  )
}

export default Login;