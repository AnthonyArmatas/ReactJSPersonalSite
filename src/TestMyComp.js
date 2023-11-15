import React from 'react';

const MyComponent = () => {
  const downloadJsonFile = () => {
    const data = {
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ],
    };

    // Convert the data object to a JSON string
    const jsonData = JSON.stringify(data, null, 2);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'data.json';

    // Append the link to the document and trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <h1>Save JSON Data</h1>
      <button onClick={downloadJsonFile}>Download JSON File</button>
    </div>
  );
};

export default MyComponent;
