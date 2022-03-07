import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
import { baseURL } from "../shared/baseURL";
import Header from '../components/Header';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { VscCloudDownload } from 'react-icons/vsc';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { FaFilter } from 'react-icons/fa';
import TableLoader from '../components/TableLoader';
import TimeSheetDownloader from '../components/TimeSheetDownloader';
import CustomFilter from '../components/CustomFilter';

const TimeSheetRecords = () => {
  const navigate = useNavigate()

  const [dropFilter, setDropFilter] = useState(false)

  const [data, setData] = useState([])
  const [filter, setFilter] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(localStorage.getItem("token")) {
      const getTimeSheets = async () => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
          }
        }
        setIsLoading(true)
        const res = await axios.get(baseURL + "/time_sheet", config)
        setIsLoading(false)
        setData(res.data)
        setFilter(res.data)
      }
      getTimeSheets()
    } 
    else {
      navigate("/")
    }
  }, [navigate])
  

  // --- Pagination --- //
  const [pageNumber, setPageNumber] = useState(0)
  const pageItems = 10
  const pagesVisited = pageNumber * pageItems
  const pageCount = Math.ceil(data.length / pageItems)
  const changePage = ({ selected }) => setPageNumber(selected)
  const paginateData = data.slice(pagesVisited, pagesVisited + pageItems)
  // -- End Pagination

  return (
    <div id="admin-page-body">
      <Header />
      <main>
        <h3 className="page-title">
          <Link to="/dashboard">Dashboard</Link> | Time Sheet Records
        </h3>
        <div className="table-features">
          <div className="custom-filter">
            <button className='wg-btn-light' onClick={() => setDropFilter(!dropFilter)}>Custome filter <FaFilter color="#10923b" /></button>
            <CustomFilter 
              setData={setData}
              filter={filter}
              dropFilter={dropFilter}
              setDropFilter={setDropFilter}
            />
          </div>
          <TimeSheetDownloader data={data} />
        </div>
        <div className="table-responsive">
          {isLoading && <TableLoader isLoading={isLoading} />}
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Location</th>
                <th>Time Out</th>
                <th>Time In</th>
                <th>Remarks</th>
                <th>Movement ID</th>
              </tr>
            </thead>
            <tbody>
              {(isLoading && data.length === 0) ?
                <tr>
                  <td className="table-msg" colSpan={7}>
                  <VscCloudDownload size={75} />
                  <p>Fetching request...</p>
                  </td>
                </tr>
              :
                (data.length === 0) ?
                  <tr>
                    <td className="table-msg" colSpan={7}>
                      <MdOutlineErrorOutline size={75} />
                      <p>No record found</p>
                    </td>
                  </tr>
              :
                paginateData.map(item =>
                  <tr key={item.id}>
                    <td>{moment(item.created_at).format('Do MMM YYYY')}</td>
                    <td>{item.name}</td>
                    <td>{item.location}</td>
                    <td>{moment(item.time_out).format('h:mm A')}</td>
                    <td>
                      {item.time_in ? 
                        <>{moment(item.time_in).format('h:mm A')}</>
                      :
                        <>-</>
                      }
                    </td>
                    <td>{item.remarks}</td>
                    <td>{item.id}</td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
        <div id="table-footer">
          <p>Entries: {data.length}</p>
          {data.length > pageItems &&
            <div className="pagination-tab">
              <ReactPaginate
                previousLabel={<><IoIosArrowRoundBack /> Prev</>}
                nextLabel={<>Next <IoIosArrowRoundForward /></>}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination-container"}
                previousLinkClassName={"previous-btn"}
                nextLinkClassName={"next-btn"}
                disabledClassName={"pagination-disabled"}
                activeClassName={"pagination-active"} 
              />
            </div>
          }
        </div>
      </main>
    </div>
  )
}

export default TimeSheetRecords