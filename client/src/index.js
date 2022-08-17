import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App';
import Home from './Home';
import NewFundraiser from './NewFundraiser';
import TestComponent from './test';


const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
	<BrowserRouter>
	   <Routes>
	      <Route path="/"  element={<TestComponent/>} />
	      <Route path="/home" element={<Home/>} />
	      <Route path="/new"  element={<NewFundraiser/>} />
	   </Routes>
	</BrowserRouter>
);
