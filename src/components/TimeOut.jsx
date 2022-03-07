import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from "../shared/baseURL";
import Swal from 'sweetalert2';

const TimeOut = () => {
  const [users, setUsers] = useState([])

  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [time_out, setTimeOut] = useState("")
  const [remarks, setRemarks] = useState("")

  const [movementId, setMovementId] = useState("")
  
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      try {
        const res = await axios.get(baseURL + "/user", config)
        setUsers(res.data)
      }
      catch(err){
        Swal.fire({
          icon: 'error',
          title: 'Ooops',
          text: `${err.response && err.response.data.message ? err.response.data.message : err.message}`
        })
      }
    }
    getUsers()
  }, [])
  

  const handlePostTimeSheet = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      setLoading(true)
      const res = await axios.post(baseURL + "/time_sheet", {
        name,
        location,
        time_out,
        remarks
      }, config)
      Swal.fire({
        icon: 'success',
        title: 'Posted',
        text: "Your information have been saved!"
      })
      setMovementId(res.data.id)
      setName("")
      setLocation("")
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
    <form onSubmit={handlePostTimeSheet}>
      {!movementId ?
        <>
          <div className="form-grp">
            <label htmlFor="name">Name<span>*</span></label>
            <select 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)} 
              required
            > 
              <option></option>
              {users.map((item, i) => 
                <option key={i} value={item.name}>{item.name}</option>
              )}
            </select>
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
            <label htmlFor="time-in">Time Out<span>*</span></label>
            <input 
              type="time" 
              id="time-in" 
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
        </>
      :
        <div className="form-grp movement-id-area">
          <p>Movement ID: <span>{movementId}</span></p>
          <p>Why do I need this ID? It will be used when you about clocking out for the day</p>
          <strong>Please Copy & Save</strong>
        </div>
      }
    </form>
  )
}

export default TimeOut;