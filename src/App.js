// src/App.js
import React from 'react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="content">
          <Home />
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;