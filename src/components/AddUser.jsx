import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from "../shared/baseURL";
import Swal from 'sweetalert2';

const AddUser = ({ getUsers, closeModal }) => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const [loading, setLoading] = useState(false)

  const handleAddUser = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      setLoading(true)
      await axios.post(baseURL + "/user", {
        name,
        email
      }, config)
      Swal.fire({
        icon: 'success',
        title: 'Added',
        text: "New User have been saved!"
      })
      setName("")
      setEmail("")
      getUsers()
      closeModal()
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
    <>
      <form className='add-user_form' onSubmit={handleAddUser}>
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
          <label htmlFor="email">Email<span>*</span></label>
          <input 
            type="text" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-grp_btn">
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  )
}

export default AddUser;