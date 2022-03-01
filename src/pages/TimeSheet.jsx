import React, { useState } from 'react'
import Logo from "../assets/img/wetherheads.png";
import TimeIn from '../components/TimeIn';
import TimeOut from '../components/TimeOut';

const TimeSheet = () => {

  const [activeTab, setActiveTab] = useState(0)
  const tabs = ["Time In", "Time Out"]

  const tabPanels = [
    { component: <TimeIn /> },
    { component: <TimeOut /> }
  ]

  return (
    <div id="form-container">
      <div className="page-intro">
        <div className="logo-area">
          <img src={Logo} alt="Whether Heads Logo" />
        </div>
        <h3>Time Sheet Application (Movement Register)</h3>
      </div>
      <ul className="whg-nav-tabs">
        {tabs.map((item, i) => 
          <li key={i} className={activeTab === i ? "active" : ""} onClick={() => setActiveTab(i)}>{item}</li>
        )}
      </ul>
      {tabPanels[activeTab].component}
    </div>
  )
}

export default TimeSheet