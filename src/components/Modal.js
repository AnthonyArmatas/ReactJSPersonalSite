// Modal.js
import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        text: '',
        link: '',
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file,
        });
    }

    const isSubmitDisabled = () => {
        return formData.link.trim() === '';
    }

    const handleSubmit = () => {
        const formDataForServer = new FormData();
        onSubmit(formData);
        // console.log("Post 1" + formData);
        setFormData({
            text: '',
            link: '',
            image: null,
        });
    }

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <p>This is a modal!</p>
                
                <ul className="form-list">
                    <li>
                        <label>
                            Text:
                            <input
                                type="text"
                                name="text"
                                value={formData.text}
                                onChange={handleInputChange}
                            />
                        </label>
                    </li>

                    <li>
                        <label>
                            Link:
                            <input
                                type="text"
                                name="link"
                                value={formData.link}
                                onChange={handleInputChange}
                            />
                        </label>
                    </li>

                    <li>
                        <label>
                            Image:
                            <input
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                            />
                        </label>
                    </li>
                </ul>

                <button onClick={handleSubmit} disabled={isSubmitDisabled()}>
                    Submit
                </button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Modal;
