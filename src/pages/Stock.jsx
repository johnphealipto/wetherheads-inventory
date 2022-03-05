import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from "../shared/baseURL";
import Swal from 'sweetalert2';
import Logo from "../assets/img/wetherheads.png";

const Stock = () => {

  const [item, setItem] = useState("")
  const [quantity_in_stock, setQuantityInStock] = useState("")
  const [quantity_in, setQuantityIn] = useState("")
  const [quantity_out, setQuantityOut] = useState("")
  const [balance, setBalance] = useState("")
  const [remark, setRemark] = useState("")

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setBalance(quantity_in_stock - quantity_out)
  }, [quantity_in_stock, quantity_out])
  

  const handlePostStock = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      setLoading(true)
      await axios.post(baseURL + "/stock", {
        item,
        quantity_in_stock,
        quantity_in,
        quantity_out,
        balance,
        remark
      }, config)
      Swal.fire({
        icon: 'success',
        title: 'Posted',
        text: "Your information have been saved!"
      })
      setItem("")
      setQuantityInStock("")
      setQuantityIn("")
      setQuantityOut("")
      setBalance("")
      setRemark("")
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
      <div className="page-intro">
        <div className="logo-area">
          <img src={Logo} alt="Whether Heads Logo" />
        </div>
        <h3>Stock Application</h3>
      </div>
      <form onSubmit={handlePostStock}>
        <div className="form-grp">
          <label htmlFor="item">Item<span>*</span></label>
          <input 
            type="text" 
            id="item"
            value={item}
            onChange={(e) => setItem(e.target.value)} 
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="qis">Quantity In stock<span>*</span></label>
          <input 
            type="number" 
            id="qis" 
            value={quantity_in_stock}
            onChange={(e) => setQuantityInStock(e.target.value)}
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="quantity-in">Quantity In<span>*</span></label>
          <input 
            type="number" 
            id="quantity-in" 
            value={quantity_in}
            onChange={(e) => setQuantityIn(e.target.value)}
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="quantity-out">Quantity Out<span>*</span></label>
          <input 
            type="number" 
            id="quantity-out" 
            value={quantity_out}
            onChange={(e) => setQuantityOut(e.target.value)}
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="balance">Balance</label>
          <input 
            type="number" 
            id="balance"
            value={balance} 
            disabled
          />
        </div>
        <div className="form-grp">
          <label htmlFor="remarks">Remarks<span>*</span></label>
          <textarea 
            id="remarks" 
            rows="1" 
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
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

export default Stock;