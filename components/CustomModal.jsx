import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../styles/ScrollButton.css';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import {
    QuestionCircleOutlined,
} from '@ant-design/icons';

const CustomModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formValues, setFormValues] = useState({ theme: '', message: '' });
    const { t, i18n } = useTranslation();

    useEffect(() => {
        Modal.setAppElement('#root'); 
    }, []);

    const sendData = async (data) => {
        try {
            const response = await axios.post('http://hellafragilesite.com/api-need-help.php', data);
            console.log(response.data); 
            setFormValues({ theme: '', message: '' }); 
        } catch (error) {
            console.error(error); 
        }
    };

    const handleButtonClick = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        sendData(formValues);
    };

    return (
        <div className="modal-container">
            <button className="modal-button" onClick={handleButtonClick}>
                <span className="scroll-button-icon"><QuestionCircleOutlined /></span>
            </button>

            <Modal
                isOpen={isOpen}
                onRequestClose={handleCloseModal}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <button className="close-button" onClick={handleCloseModal}>
                    &times;
                </button>
                <h2 className='send-title'>{t('help.title')}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='send-message'>{t('help.theme')}</label>
                        <br />
                        <input
                            type="text"
                            name="theme"
                            className='send-input'
                            value={formValues.theme}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className='send-message'>{t('help.message')}</label>
                        <br />
                        <textarea
                            name="message"
                            cols="30"
                            rows="10"
                            className='send-area'
                            value={formValues.message}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <button type="submit" className="send-button">{t('help.send')}</button>
                </form>
            </Modal>
        </div>
    );
};

export default CustomModal;
