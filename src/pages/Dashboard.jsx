import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { baseURL } from "../shared/baseURL";
import Header from '../components/Header';
import VisialData from "../assets/img/visual_data.svg";
import { TiThListOutline, TiStopwatch } from 'react-icons/ti';

const Dashboard = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({})

  useEffect(() => {
    if(localStorage.getItem("token")) {
      // const getUser = async () => {
      //   const config = {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${localStorage.token}`
      //     }
      //   }
      //   const { res } = await axios.get(baseURL + "/auth/me", config)
      //   setData(res.data)
      //   console.log(res.data)
      // }
      // getUser()
    } 
    else {
      navigate("/")
    }
  }, [navigate])
  
  return (
    <div id="admin-page-body">
      <Header />
      <main id="dashboard" className="container">
        <div className="welcome-area">
          <img src={VisialData} alt="Hello User" />
          <div className="welcome-note">
            <h2>Welcome, Administrator</h2>
            <p>Which report will you like to generate today?</p>
          </div>
        </div>
        <section className="menu-grid">
          <Link to="/records/time-sheet" className="menu-card">
            <TiStopwatch size={40} color=" #10923b" />
            <h3>Time Sheet</h3>
            <p>Generate & Download Time Sheet Records</p>
          </Link>
          <Link to="#" className="menu-card">
            <TiThListOutline size={40} color=" #10923b" />
            <h3>Stock</h3>
            <p>Generate & Download Stock Records</p>
          </Link>
        </section>
      </main>
    </div>
  )
}

export default Dashboard;