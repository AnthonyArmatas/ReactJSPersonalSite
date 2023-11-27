// src/App.js
import React from 'react';
import Home from './Home';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="HeadShot">
        <img src="images/HeadShot.jpg" alt="Head Shot" />
      </div>
      <div className="content">
          <Home />
      </div>
    </div>
  );
}

export default App;