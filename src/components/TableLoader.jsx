import React from 'react';
import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";

const TableLoader = ({ isLoading }) => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: rgb(16, 146, 59);
    width: 100%;
    height: 2px;
  `;

  return (
    <div>
      <BarLoader
        css={override}
        sizeUnit={"px"}
        size={150}
        color={"rgb(16, 146, 59)"}
        loading={isLoading}
      />
    </div>
  )
}

export default TableLoader;