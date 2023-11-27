// Home.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LinkList from './components/LinkItem';
import Modal from './components/Modal';

const Home = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleModalSubmit = async (formData) => {
        try {

          // Check if formData.link starts with 'http://' or 'https://'
          if (!formData.link.startsWith('http://') && !formData.link.startsWith('https://')) {
              // If not, prepend 'http://' to the link
              formData.link = 'http://' + formData.link;
          }
          const formDataForServer = new FormData();
          formDataForServer.append('text', formData.text);
          formDataForServer.append('link', formData.link);
          formDataForServer.append('image', formData.image);
      
          const response = await axios.post('http://localhost:3001/api/save-image', formDataForServer);
      
          // Handle the response from the server
          console.log(response.data);
        
          // Add the image filename to the form data object
          formData.image = "images/" + response.data.filename;
          const response2 = await axios.post('http://localhost:3001/api/add-entry', formData);
          
          // Handle the response from the server
          console.log(response2.data);

          // Close the modal after successful submission
          closeModal();

          // Use navigate('/') to navigate to the same route
          navigate('/');
        } catch (error) {
          console.error('Error submitting form:', error.message);
          // Handle errors appropriately
        }
    }
      

    return ( 
        <div className="home">
            <LinkList />
            <div className="addLinkBtn">
                <button onClick={openModal}>
                    <img src="/images/AddSign.png" alt="Add A link" />
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleModalSubmit} />
        </div>
    );
}

export default Home;
