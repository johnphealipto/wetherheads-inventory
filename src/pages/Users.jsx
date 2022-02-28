import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
import { baseURL } from "../shared/baseURL";
import Header from '../components/Header';
import ReactPaginate from "react-paginate";
import { IoIosArrowRoundBack, IoIosArrowRoundForward, IoMdPersonAdd } from "react-icons/io";
import { VscCloudDownload } from 'react-icons/vsc';
import { MdOutlineErrorOutline } from 'react-icons/md';
import TableLoader from '../components/TableLoader';

const Users = () => {
  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(localStorage.getItem("token")) {
      const getUsers = async () => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
          }
        }
        setIsLoading(true)
        const res = await axios.get(baseURL + "/user", config)
        setIsLoading(false)
        setData(res.data)
      }
      getUsers()
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
          <Link to="/dashboard">Dashboard</Link> | Registered Users
        </h3>
        <div className="table-features">
          <div>
            <button className='wg-btn-solid'>Create <IoMdPersonAdd color="#fff" /></button>
          </div>
        </div>
        <div className="table-responsive">
          {isLoading && <TableLoader isLoading={isLoading} />}
          <table>
            <thead>
              <tr>
                <th>Date Registered</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {(isLoading && data.length === 0) ?
                <tr>
                  <td className="table-msg" colSpan={6}>
                  <VscCloudDownload size={75} />
                  <p>Fetching request...</p>
                  </td>
                </tr>
              :
                (data.length === 0) ?
                  <tr>
                    <td className="table-msg" colSpan={6}>
                      <MdOutlineErrorOutline size={75} />
                      <p>No record found</p>
                    </td>
                  </tr>
              :
                paginateData.map(item =>
                  <tr key={item.id}>
                    <td>{moment(item.created_at).format('Do MMM YYYY')}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
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

export default Users;