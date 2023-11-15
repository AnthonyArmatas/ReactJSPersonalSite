import React, { useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState({
    items: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ],
  });

  const SaveDataToLocal = () => {
    try {
      // Convert the data object to a JSON string and save it to localStorage
      localStorage.setItem('myData', JSON.stringify(data));
      console.log('Data saved to localStorage.');
      console.log('The data is' + localStorage.getItem('myData'));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div>
      <h1>Save JSON Data</h1>
      <button onClick={SaveDataToLocal}>Save Data to localStorage</button>
    </div>
  );
};

export default MyComponent;
