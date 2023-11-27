// src/LinkItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LinkList = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/get-json');
        setLinks(response.data.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching JSON data:', error.message);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  const fetchDataJsonData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/get-json');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching JSON data:', error.message);
      throw error; // Re-throw the error to be caught by the calling function
    }
  };


  const handleDeleteEntry = async (entryId) => {
    try {
      console.log(`PreDelete with ID ${entryId}.`);
      await axios.delete(`http://localhost:3001/api/delete-entry/${entryId}`);
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== entryId));
      console.log(`Entry with ID ${entryId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting entry:', error.message);
    }
  };

  return (
    <div className="link-list">
      <h3>Link List</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <button className='RemoveBtn' onClick={() => handleDeleteEntry(link.id)}>
                <img className='RemoveImg' src="/images/RemoveSign.png" alt="Remove A link" />
              </button>
              <div className="link-item">
                <a href={link.link} target={link.link} rel="noopener noreferrer">
                <img src={`http://localhost:3001/${link.image}`} alt={link.text} />
                  {link.text}
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LinkList;
