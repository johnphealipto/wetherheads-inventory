import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { baseURL } from "../shared/baseURL";
import Swal from 'sweetalert2';

const TimeOut = () => {
  const [id, setId] = useState("")
  const [time_out, setTimeOut] = useState("")

  const [data, setData] = useState({})

  const [loading, setLoading] = useState(false)
  const [loadingId, setLoadingId] = useState(false)

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  const handleGetTimeSheetById = async () => {
    try {
      setLoadingId(true)
      const res = await axios.get(baseURL + `/time_sheet/${id}`, config)
      setData(res.data)
      setLoadingId(false)
    }
    catch(err){
      Swal.fire({
        icon: 'error',
        title: 'Ooops',
        text: `${err.response && err.response.data.message ? err.response.data.message : err.message}`
      })
      setLoadingId(false)
    }
  }

  const handleTimeOut = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await axios.post(baseURL + `/time_sheet/${id}`, {
        name: data.name,
        location: data.location,
        time_in: data.time_in,
        time_out: time_out,
        remarks: data.remarks
      }, config)
      Swal.fire({
        icon: 'success',
        title: 'Posted',
        text: "Your information have been saved!"
      })
      setTimeOut("")
      handleGetTimeSheetById()
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
    <form onSubmit={handleTimeOut}>
      <div className="form-grp">
        <label htmlFor="id">Movement ID</label>
        <input 
          type="text" 
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)} 
        />
        <button 
          type='button'
          className='check-id wg-btn-solid'
          onClick={handleGetTimeSheetById}
          disabled={loadingId}
        >
          {loadingId ? "Checking..." : "Check"}
        </button>
      </div>
      {(!(Object.keys(data).length === 0) && !loadingId) &&
        <>
          <div className="form-grp">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name"
              value={data.name}
              disabled
            />
          </div>
          <div className="form-grp">
            <label htmlFor="location">Location</label>
            <input 
              type="text" 
              id="location" 
              value={data.location}
              disabled
            />
          </div>
          <div className="form-grp">
            <label htmlFor="time-in">Time In</label>
            <input 
              type="time" 
              id="time-in" 
              value={moment(data.time_in).format('HH:mm')}
              disabled
            />
          </div>
          <div className="form-grp">
            <label htmlFor="time-out">Time Out {!(data.time_out) && <span>*</span>}</label>
            <input 
              type="time" 
              id="time-out" 
              value={data.time_out ? moment(data.time_out).format('HH:mm') : time_out}
              onChange={(e) => setTimeOut(e.target.value)}
              required
              disabled={data.time_out && true}
            />
          </div>
          <div className="form-grp">
            <label htmlFor="remarks">Remarks</label>
            <textarea 
              id="remarks" 
              rows="1" 
              value={data.remarks}
              disabled
            />
          </div>
          <div className="form-grp_btn">
            <button type="submit" disabled={(loading || data.time_out) && true}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </>
      }
    </form>
  )
}

export default TimeOut