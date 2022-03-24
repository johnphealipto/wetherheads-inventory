import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from "../shared/baseURL";
import Swal from 'sweetalert2';
import Logo from "../assets/img/wetherheads.png";

const Stock = () => {

  const [item, setItem] = useState("")
  const [unit_price, setUnitPrice] = useState("")
  const [opening_balance, setOpeningBalance] = useState("")
  const [quantity_in, setQuantityIn] = useState("")
  const [quantity_out, setQuantityOut] = useState("")
  const [remark, setRemark] = useState("")

  const [loading, setLoading] = useState(false)
  
  const closing_balance = (Number(opening_balance) + Number(quantity_in)) - Number(quantity_out)
  
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
        unit_price,
        opening_balance,
        quantity_in,
        quantity_out,
        closing_balance,
        remark
      }, config)
      Swal.fire({
        icon: 'success',
        title: 'Posted',
        text: "Your information have been saved!"
      })
      setItem("")
      setUnitPrice("")
      setOpeningBalance("")
      setQuantityIn("")
      setQuantityOut("")
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
          <label htmlFor="item">Stock Item<span>*</span></label>
          <input 
            type="text" 
            id="item"
            value={item}
            onChange={(e) => setItem(e.target.value)} 
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="price">Unit Price<span>*</span></label>
          <input 
            type="text" 
            id="price"
            value={unit_price}
            onChange={(e) => setUnitPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="qis">Opening Balance<span>*</span></label>
          <input 
            type="number" 
            id="qis" 
            value={opening_balance}
            onChange={(e) => setOpeningBalance(e.target.value)}
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="quantity-in">Quantity In</label>
          <input 
            type="number" 
            id="quantity-in" 
            value={quantity_in}
            onChange={(e) => setQuantityIn(e.target.value)}
          />
        </div>
        <div className="form-grp">
          <label htmlFor="quantity-out">Quantity Out</label>
          <input 
            type="number" 
            id="quantity-out" 
            value={quantity_out}
            onChange={(e) => setQuantityOut(e.target.value)}
          />
        </div>
        <div className="form-grp">
          <label htmlFor="balance">Closing Balance</label>
          <input 
            type="number" 
            id="balance"
            value={closing_balance} 
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