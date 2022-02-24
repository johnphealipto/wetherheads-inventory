import React, { useState } from 'react';
import Header from '../components/Header';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import ReactPaginate from "react-paginate";

const TimeSheetRecords = () => {

  const data = [1,2,3,4,5,6,7,8,9,10,11,12] 

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
      <main id="time-sheet_records">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                </tr>
                <tr>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                </tr>
                <tr>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                </tr>
                <tr>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                </tr>
                <tr>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                  <td>sdgadfgf</td>
                </tr>
            </tbody>
          </table>
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
        </div>
      </main>
    </div>
  )
}

export default TimeSheetRecords