import React from 'react';
import { CSVLink } from "react-csv";
import moment from 'moment';
import { FaDownload } from 'react-icons/fa';

const StockDownloader = ({ data }) => {
  const headers = [
    { label: "Date", key: "date" },
    { label: "Item", key: "item" },
    { label: "Quantity In Stock", key: "quantityInStock" },
    { label: "Quantity In", key: "quantityIn" },
    { label: "Quantity Out", key: "quantityOut" },
    { label: "Balance", key: "balance" },
    { label: "Remarks", key: "remarks" },
  ]

  const loopData = () => {
    const newData = []
    data.forEach(item => {
      newData.push({
        date: moment(item.created_at).format('Do MMM YYYY'),
        item: item.item,
        quantityInStock: item.quantity_in_stock,
        quantityIn: item.quantity_in,
        quantityOut: item.quantity_out,
        balance: item.balance,
        remarks: item.remark,
      })
    })
    return newData
  }
  const exportData = loopData(data)

  return (
    <CSVLink
      data={exportData}
      headers={headers}
      filename={"Stock Records.csv"}>
      Download
      <FaDownload />
    </CSVLink>
  )
}

export default StockDownloader;