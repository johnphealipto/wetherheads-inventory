import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
import { baseURL } from "../shared/baseURL";
import Header from '../components/Header';
import ReactPaginate from "react-paginate";
import { IoIosArrowRoundBack, IoIosArrowRoundForward, IoMdPersonAdd } from "react-icons/io";
import { VscCloudDownload } from 'react-icons/vsc';
import { MdOutlineErrorOutline, MdClose } from 'react-icons/md';
import TableLoader from '../components/TableLoader';
import Modal from 'react-modal';
import AddUser from '../components/AddUser';
import Swal from 'sweetalert2';

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

const Users = () => {
  const navigate = useNavigate()

  const [modalIsOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  useEffect(() => {
    if(localStorage.getItem("token")) {
      getUsers()
    } 
    else {
      navigate("/")
    }
  }, [navigate])

  const getUsers = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    setIsLoading(true)
    const res = await axios.get(baseURL + "/user", config)
    setIsLoading(false)
    setData(res.data)
  }
  

  // --- Pagination --- //
  const [pageNumber, setPageNumber] = useState(0)
  const pageItems = 10
  const pagesVisited = pageNumber * pageItems
  const pageCount = Math.ceil(data.length / pageItems)
  const changePage = ({ selected }) => setPageNumber(selected)
  const paginateData = data.slice(pagesVisited, pagesVisited + pageItems)
  // -- End Pagination

  const handleDeleteUser = async (item) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      setLoadingDelete(true)
      await axios.delete(baseURL + `/user/${item.id}`, config)
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: `${item.name} have been removed`
      })
      getUsers()
      setLoadingDelete(false)
    }
    catch(err){
      Swal.fire({
        icon: 'error',
        title: 'Ooops',
        text: `${err.response && err.response.data.message ? err.response.data.message : err.message}`
      })
      setLoadingDelete(false)
    }
  }

  return (
    <div id="admin-page-body">
      <Header />
      <main>
        <h3 className="page-title">
          <Link to="/dashboard">Dashboard</Link> | Registered Users
        </h3>
        <div className="table-features">
          <div>
            <button className='wg-btn-solid' onClick={openModal}>Add User <IoMdPersonAdd color="#fff" /></button>
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
                <th>Action</th>
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
                    <td>
                      <button 
                        type="button" 
                        className="actions btn-delete"
                        disabled={loadingDelete}
                        onClick={() => handleDeleteUser(item)}
                      >
                        Delete
                      </button>
                    </td>
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="WHG Modal"
      >
        <div id="whg-modal">
          <div className="modal-header">
            <h3>Add New User</h3>
            <button type='button' onClick={closeModal}><MdClose size={25} /></button>
          </div>
          <AddUser 
            getUsers={getUsers} 
            closeModal={closeModal} 
          />
        </div>
      </Modal>

    </div>
  )
}

export default Users;