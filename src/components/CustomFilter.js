import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FaTimes } from 'react-icons/fa';

const CustomFilter = ({ filter, setData, dropFilter, setDropFilter }) => {

  const [selectedRadio, setSelectedRadio] = useState("All-time")

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const [dateRangeStart, setDateRangeStart] = useState("")
  const [dateRangeEnd, setDateRangeEnd] = useState("")

  const currentDate = moment().format("YYYY-MM-DD")
  const thirtyDays = moment().subtract(30, "days").format("YYYY-MM-DD")
  const sevenDays = moment().subtract(7, "days").format("YYYY-MM-DD")
  const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD")
  const allTime = "2021-07-30"

  useEffect(() => {
    if (selectedRadio === "All-time") {
      setStartDate(allTime)
      setEndDate(currentDate)
    }
    else if (selectedRadio === "30-Days") {
      setStartDate(thirtyDays)
      setEndDate(currentDate)
    }
    else if (selectedRadio === "7-Days") {
      setStartDate(sevenDays)
      setEndDate(currentDate)
    }
    else if (selectedRadio === "Yesterday") {
      setStartDate(yesterday)
      setEndDate(yesterday)
    }
    else if (selectedRadio === "Today") {
      setStartDate(currentDate)
      setEndDate(currentDate)
    }
    else if (selectedRadio === "DateRange") {
      setStartDate(moment(dateRangeStart).format("YYYY-MM-DD"))
      setEndDate(moment(dateRangeEnd).format("YYYY-MM-DD"))
    }
  }, [selectedRadio, dateRangeStart, dateRangeEnd, currentDate, yesterday, sevenDays, thirtyDays])

  const handleCustomFilter = (e) => {
    e.preventDefault()

    const filteredData = filter.filter(item =>
      moment(item.created_at).format("YYYY-MM-DD") >= startDate &&
      moment(item.created_at).format("YYYY-MM-DD") <= endDate
    )
    setData(filteredData)
    setDropFilter(false)
  }

  return (
    <div className={dropFilter ? "filter-dropdown display" : "filter-dropdown"}>
      <form className="checkbox-grp" onSubmit={handleCustomFilter}>
        <span className="close-btn" onClick={() => setDropFilter(false)}>
          <FaTimes size={20} />
        </span>
        <p>Filter options:</p>
        <div className="checkbox-ctrl">
          <input
            type="radio"
            name="filter"
            id="filter-all-time"
            value="All-time"
            checked={selectedRadio === "All-time" && true}
            onChange={(e) => setSelectedRadio(e.target.value)} />
          <label htmlFor="filter-all-time">All Time Record</label>
        </div>
        <div className="checkbox-ctrl">
          <input
            type="radio"
            name="filter"
            id="filter-30-days"
            value="30-Days"
            checked={selectedRadio === "30-Days" && true}
            onChange={(e) => setSelectedRadio(e.target.value)} />
          <label htmlFor="filter-30-days">Last 30 Days</label>
        </div>
        <div className="checkbox-ctrl">
          <input
            type="radio"
            name="filter"
            id="filter-7-Days"
            value="7-Days"
            checked={selectedRadio === "7-Days" && true}
            onChange={(e) => setSelectedRadio(e.target.value)} />
          <label htmlFor="filter-7-Days">Last 7 Days</label>
        </div>
        <div className="checkbox-ctrl">
          <input
            type="radio"
            name="filter"
            id="filter-yesterday"
            value="Yesterday"
            checked={selectedRadio === "Yesterday" && true}
            onChange={(e) => setSelectedRadio(e.target.value)} />
          <label htmlFor="filter-yesterday">Yesterday</label>
        </div>
        <div className="checkbox-ctrl">
          <input
            type="radio"
            name="filter"
            id="filter-today"
            value="Today"
            checked={selectedRadio === "Today" && true}
            onChange={(e) => setSelectedRadio(e.target.value)} />
          <label htmlFor="filter-today">Today</label>
        </div>
        <div className="checkbox-ctrl">
          <input
            type="radio"
            name="filter"
            id="filter-dateRange"
            value="DateRange"
            checked={selectedRadio === "DateRange" && true}
            onChange={(e) => setSelectedRadio(e.target.value)} />
          <label htmlFor="filter-dateRange">Date Range</label>
        </div>
        <div className="filter-date-range">
          <input
            type="text"
            disabled={selectedRadio !== "DateRange" && true}
            onFocus={(e) => (e.currentTarget.type = "date")}
            onBlur={(e) => (e.currentTarget.type = "text")}
            placeholder="From..."
            value={selectedRadio !== "DateRange" ? "" : dateRangeStart}
            onChange={(e) => setDateRangeStart(e.target.value)} />
          <input
            type="text"
            disabled={selectedRadio !== "DateRange" && true}
            onFocus={(e) => (e.currentTarget.type = "date")}
            onBlur={(e) => (e.currentTarget.type = "text")}
            placeholder="To..."
            value={selectedRadio !== "DateRange" ? "" : dateRangeEnd}
            onChange={(e) => setDateRangeEnd(e.target.value)} />
        </div>
        <div className="submit-filter">
          <input type="submit" value="Filter" />
        </div>
      </form>
    </div>
  )
}

export default CustomFilter;