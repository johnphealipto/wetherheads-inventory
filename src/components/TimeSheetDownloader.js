import React from 'react';
import { CSVLink } from "react-csv";
import moment from 'moment';
import { FaDownload } from 'react-icons/fa';

const TimeSheetDownloader = ({ data }) => {
  const headers = [
    { label: "Date", key: "date" },
    { label: "Name", key: "name" },
    { label: "Location", key: "location" },
    { label: "Time In", key: "timeIn" },
    { label: "Time Out", key: "timeOut" },
    { label: "Remarks", key: "remarks" },
  ]

  const loopData = () => {
    const newData = []
    data.forEach(item => {
      newData.push({
        date: moment(item.created_at).format('Do MMM YYYY'),
        name: item.name,
        location: item.location,
        timeIn: moment(item.time_in).format('h:mm A'),
        timeOut: moment(item.time_out).format('h:mm A'),
        remarks: item.remarks,
      })
    })
    return newData
  }
  const exportData = loopData(data)

  return (
    <CSVLink
      data={exportData}
      headers={headers}
      filename={"Time Sheet Records.csv"}>
      Download
      <FaDownload />
    </CSVLink>
  )
}

export default TimeSheetDownloader;