import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from "../shared/baseURL";
import Swal from 'sweetalert2';

const UpdateStock = ({ id, data, getStockRecords, closeModal }) => {

  const [item, setItem] = useState("")
  const [unit_price, setUnitPrice] = useState("")
  const [opening_balance, setOpeningBalance] = useState("")
  const [quantity_in, setQuantityIn] = useState("")
  const [quantity_out, setQuantityOut] = useState("")
  const [remark, seRemark] = useState("")

  const closing_balance = (Number(opening_balance) + Number(quantity_in)) - Number(quantity_out)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stock = data.filter(item => item.id === id)
    if(stock) {
      setItem(stock[0].item)
      setUnitPrice(stock[0].unit_price)
      setOpeningBalance(stock[0].opening_balance)
      setQuantityIn(stock[0].quantity_in)
      setQuantityOut(stock[0].quantity_out)
      seRemark(stock[0].remark)
    }
  }, [id, data])
  

  const handleUpdateStock = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      }
    }
    try {
      setLoading(true)
      await axios.post(baseURL + `/stock/${id}`, {
        item,
        unit_price,
        opening_balance,
        quantity_in,
        quantity_out,
        closing_balance,
        remark,
      }, config)
      Swal.fire({
        icon: 'success',
        title: 'Edited',
        text: "Stock details have been saved!",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      })
      getStockRecords()
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
      <form className='add-user_form' onSubmit={handleUpdateStock}>
        <div className="form-grp">
          <label htmlFor="item">Item</label>
          <input 
            type="text" 
            id="item" 
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="unit_price">Unit Price</label>
          <input 
            type="number" 
            id="unit_price" 
            value={unit_price}
            onChange={(e) => setUnitPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="opening_balance">Opening Balance</label>
          <input 
            type="number" 
            id="opening_balance" 
            value={opening_balance}
            onChange={(e) => setOpeningBalance(e.target.value)}
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="quantity_in">Quantity In</label>
          <input 
            type="number" 
            id="quantity_in" 
            value={quantity_in}
            onChange={(e) => setQuantityIn(e.target.value)}
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="quantity_out">Quantity Out</label>
          <input 
            type="number" 
            id="quantity_out" 
            value={quantity_out}
            onChange={(e) => setQuantityOut(e.target.value)}
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="closing_balance">Closing Balance</label>
          <input 
            type="number" 
            id="closing_balance" 
            value={closing_balance}
            disabled
          />
        </div>
        <div className="form-grp">
          <label htmlFor="remark">Remark</label>
          <input 
            type="text" 
            id="remark" 
            value={remark}
            onChange={(e) => seRemark(e.target.value)}
            required
          />
        </div>
        <div className="form-grp_btn">
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </>
  )
}

export default UpdateStock;