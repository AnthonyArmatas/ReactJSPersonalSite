// src/App.js
import Home from './Home';
import Navbar from './Navbar';
import SaveDataToLocal from './TestJson';
import MyComponent from './TestMyComp';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Home />
        <SaveDataToLocal />
        <MyComponent />
      </div>
    </div>
  );
}

export default App;