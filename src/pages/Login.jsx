import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from "../shared/baseURL";
import { MdOutlineEmail, MdLockOpen } from 'react-icons/md';

const Login = () => {

  const [loading, setLoading] = useState(false)

  return (
    <div id="login-container">
      <form>
        <h1>Login</h1>
        <div className="form-grp">
          <label htmlFor="email"><MdOutlineEmail size={20} color="#10923b" />Email</label>
          <input 
            type="email" 
            id="email"
            // value={name}
            // onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="password"><MdLockOpen size={20} color="#10923b" />Password</label>
          <input 
            type="password" 
            id="password"
            // value={name}
            // onChange={(e) => setName(e.target.value)} 
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

export default Login;