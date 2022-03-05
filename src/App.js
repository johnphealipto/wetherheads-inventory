import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import TimeSheet from './pages/TimeSheet';
import Stock from './pages/Stock';
import Dashboard from './pages/Dashboard';
import TimeSheetRecords from './pages/TimeSheetRecords';
import Users from './pages/Users';
import StockRecords from './pages/StockRecords';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/time-sheet" element={<TimeSheet />} />
        <Route path="/records/time-sheet" element={<TimeSheetRecords />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/records/stock" element={<StockRecords />} />
        <Route path="/registered-users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
