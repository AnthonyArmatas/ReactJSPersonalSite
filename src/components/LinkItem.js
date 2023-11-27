// src/LinkItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LinkList = ({ links, updateLinkList }) => {
  const [loading, setLoading] = useState(true);


  const handleDeleteEntry = async (entryId) => {
    try {
      console.log(`PreDelete with ID ${entryId}.`);
      await axios.delete(`http://localhost:3001/api/delete-entry/${entryId}`);
      console.log(`Entry with ID ${entryId} deleted successfully.`);

      // Update the link list after successful deletion
      updateLinkList();

    } catch (error) {
      console.error('Error deleting entry:', error.message);
    }
  };



  useEffect(() => {
    setLoading(false);
  }, [links]);

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