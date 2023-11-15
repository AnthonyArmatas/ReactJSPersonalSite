// src/LinkItem.js
import React from 'react';

const LinkItem = ({ title, url }) => {
  return (
    <div className="link-item">
      <h3>{title}</h3>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    </div>
  );
};

export default LinkItem;
