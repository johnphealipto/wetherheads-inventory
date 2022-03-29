import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
import { baseURL } from "../shared/baseURL";
import Header from '../components/Header';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { VscCloudDownload } from 'react-icons/vsc';
import { MdOutlineErrorOutline, MdClose } from 'react-icons/md';
import { FaFilter, FaRegEdit } from 'react-icons/fa';
import TableLoader from '../components/TableLoader';
import StockDownloader from '../components/StockDownloader';
import CustomFilter from '../components/CustomFilter';
import Modal from 'react-modal';
import UpdateStock from '../components/UpdateStock';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: "30%",
  },
};

Modal.setAppElement('#root');

const StockRecords = () => {
  const navigate = useNavigate()

  const [dropFilter, setDropFilter] = useState(false)

  const [data, setData] = useState([])
  const [filter, setFilter] = useState([])
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const [stockId, setStockId] = useState("")

  // Handling Modal 
  const [modalIsOpen, setIsOpen] = useState(false)
  const openModal = (item) => {
    setStockId(item.id)
    setIsOpen(true)
  }
  const closeModal = () => setIsOpen(false)

  useEffect(() => {
    if(localStorage.getItem("token")) {
      getStockRecords()
    } 
    else {
      navigate("/")
    }
  }, [navigate])
  
  const getStockRecords = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      }
    }
    setIsLoading(true)
    const res = await axios.get(baseURL + "/stock", config)
    setIsLoading(false)
    setData(res.data)
    setFilter(res.data)
  }

  useEffect(() => {
    const searchedData = filter.filter(data => (data.item.toLowerCase().includes(result)));
    setData(searchedData)
  }, [result, filter])

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
          <Link to="/dashboard">Dashboard</Link> | Stock Records
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
            <input 
              type="search" 
              className="search-field" 
              placeholder="Search item" 
              value={result}
              onChange={(e) => setResult(e.target.value)}
            />
          </div>
          <StockDownloader data={data} />
        </div>
        <div className="table-responsive">
          {isLoading && <TableLoader isLoading={isLoading} />}
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Item</th>
                <th>Unit Price</th>
                <th>Opening Balance</th>
                <th>Quantity In</th>
                <th>Quantity Out</th>
                <th>Closing Balance</th>
                <th>Remarks</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(isLoading && data.length === 0) ?
                <tr>
                  <td className="table-msg" colSpan={8}>
                  <VscCloudDownload size={75} />
                  <p>Fetching request...</p>
                  </td>
                </tr>
              :
                (data.length === 0) ?
                  <tr>
                    <td className="table-msg" colSpan={8}>
                      <MdOutlineErrorOutline size={75} />
                      <p>No record found</p>
                    </td>
                  </tr>
              :
                paginateData.map(item =>
                  <tr key={item.id}>
                    <td>{moment(item.created_at).format('Do MMM YYYY')}</td>
                    <td>{item.item}</td>
                    <td>{item.unit_price}</td>
                    <td>{item.opening_balance}</td>
                    <td>{item.quantity_in}</td>
                    <td>{item.quantity_out}</td>
                    <td>{item.closing_balance}</td>
                    <td>{item.remark}</td>
                    <td>
                      <span 
                        style={{ cursor: 'pointer', padding: '.5rem' }}
                        onClick={() => openModal(item)}
                      >
                        <FaRegEdit size={16.5} color='#e2522e' />
                      </span>
                    </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="WHG Modal"
        >
          <div id="whg-modal">
            <div className="modal-header">
              <h3>Edit Stock</h3>
              <button type='button' onClick={closeModal}><MdClose size={25} /></button>
            </div>
            <UpdateStock 
              id={stockId} 
              data={data}
              getStockRecords={getStockRecords}
            />
          </div>
        </Modal>

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

export default StockRecords;