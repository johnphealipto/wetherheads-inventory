import React, { useState } from 'react'
import axios from 'axios';
import { baseURL } from "../shared/baseURL";
import Swal from 'sweetalert2';
import Logo from "../assets/img/wetherheads.jpeg";

const TimeSheet = () => {

  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [time_in, setTimeIn] = useState("")
  const [time_out, setTimeOut] = useState("")
  const [remarks, setRemarks] = useState("")

  const [loading, setLoading] = useState(false)

  const handlePostTimeSheet = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      setLoading(true)
      await axios.post(baseURL + "/time_sheet", {
        name,
        location,
        time_in,
        time_out,
        remarks
      }, config)
      Swal.fire({
        icon: 'success',
        title: 'Posted',
        text: "Your information have been saved!"
      })
      setName("")
      setLocation("")
      setTimeIn("")
      setTimeOut("")
      setRemarks("")
      setLoading(false)
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
    <div id="form-container">
      <form onSubmit={handlePostTimeSheet}>
        <div className="page-intro">
          <div className="logo-area">
            <img src={Logo} alt="Whether Heads Logo" />
          </div>
          <h3>Time Sheet Application</h3>
        </div>
        <div className="form-grp">
          <label htmlFor="name">Name<span>*</span></label>
          <input 
            type="text" 
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="location">Location<span>*</span></label>
          <input 
            type="text" 
            id="location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="time-in">Time In<span>*</span></label>
          <input 
            type="time" 
            id="time-in" 
            value={time_in}
            onChange={(e) => setTimeIn(e.target.value)}
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="time-out">Time Out<span>*</span></label>
          <input 
            type="time" 
            id="time-out" 
            value={time_out}
            onChange={(e) => setTimeOut(e.target.value)}
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="remarks">Remarks<span>*</span></label>
          <textarea 
            id="remarks" 
            rows="1" 
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            required
          />
        </div>
        <div className="form-grp_btn">
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TimeSheet