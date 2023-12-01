import React, { useState } from 'react';
import '../styles/AddNews.css';
const AddNews = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://hellafragilesite.com/film-reviews-api/api-add-news.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });

            if (response.ok) {
                const data = await response.json();
                const { id } = data; 
                console.log('Данные успешно добавлены. ID:', id);
                setTitle(''); 
                setDescription(''); 
            } else {
                console.log('Ошибка при добавлении данных');
            }
        } catch (error) {
            console.log('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='add-news-box'>
            <div>
                <label htmlFor="title" className='add-news-title'>Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="description" className='add-news-title'>Description:</label>
                <br />
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit">Add</button>
        </form>
    );
};

export default AddNews;
