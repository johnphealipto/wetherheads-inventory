import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import TimeSheet from './pages/TimeSheet';
import Stock from './pages/Stock';
import Dashboard from './pages/Dashboard';
import TimeSheetRecords from './pages/TimeSheetRecords';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/time-sheet" element={<TimeSheet />} />
        <Route path="/records/time-sheet" element={<TimeSheetRecords />} />
        <Route path="/stock" element={<Stock />} />
      </Routes>
    </div>
  );
}

export default App;
