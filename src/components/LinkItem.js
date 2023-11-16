// src/LinkItem.js
import React, { useState, useEffect } from 'react';

const LinkList = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file
    const fetchData = async () => {
      try {

        const response = await fetch('assets/data.json');
        const jsonData = await response.json();
        
        // console.log(jsonData);
        setLinks(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  const deleteItem = () => {
    console.log('Delete Item' + id)
  }


  return (
    <div className="link-list">
      <h3>Link List</h3>
      <ul>
        {links.map((link) => (
          
          <li key={link.id}>
            <button className='RemoveBtn' onClick={() => deleteItem(link.id)}>
                <img className='RemoveImg' src="/images/RemoveSign.png" alt="Remove A link" />
              </button>
            <div className="link-item">
              <a href={link.link} target={link.link} rel="noopener noreferrer">
                <img src={link.image} alt={link.text} />
                {link.text}
              </a>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkList;

