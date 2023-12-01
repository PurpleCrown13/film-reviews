import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/Edit.css";
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet";

const Edit = () => {
    const { id } = useParams();
    const history = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [userLogin, setUserLogin] = useState('');
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://hellafragilesite.com/film-reviews-api/api-all.php?id=${id}`);
                const foundMovie = response.data.find((movie) => movie.id === id);
                if (foundMovie) {
                    setMovie(foundMovie);

                    const login = foundMovie.login;
                    if (login === localStorage.getItem('login')) {
                        setUserLogin(login);
                    } else {
                        setError(true);
                    }
                } else {
                    setError(true);
                }
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.put(`http://hellafragilesite.com/film-reviews-api/api-update.php?id=${id}`, movie);
            history(`/movies/${id}`);
        } catch (error) {
        }
    };

    if (loading) {
        return <div></div>;
    }

    if (error) {
        return <div>Не удалось загрузить фильм для редактирования.</div>;
    }

    if (!movie) {
        return <div>Фильм не найден.</div>;
    }

    if (userLogin !== localStorage.getItem('login')) {
        return <div>У вас нет доступа к этой странице.</div>;
    }

    return (
        <div className='edit-container'>
            <Helmet>
                <title>
                    {movie.name}
                </title>
            </Helmet>
            <form onSubmit={handleSubmit}>
                <label>
                    {t('dlc.name')}
                    <br />
                    <textarea
                        type="text"
                        value={movie.name}
                        onChange={(e) => setMovie({ ...movie, name: e.target.value })}
                    />
                </label>
                <br />
                <br />
                <label>
                    {t('dlc.season')}
                    <br />
                    <textarea
                        type="text"
                        value={movie.season}
                        onChange={(e) => setMovie({ ...movie, season: e.target.value })}
                    />
                </label>
                <br />
                <br />
                <label>
                    {t('dlc.imagelink')}
                    <br />
                    <textarea
                        type="text"
                        value={movie.image}
                        onChange={(e) => setMovie({ ...movie, image: e.target.value })}
                    />
                </label>
                <br />
                <br />
                <label>
                    {t('dlc.year')}
                    <br />
                    <textarea
                        type="number"
                        value={movie.year}
                        onChange={(e) => setMovie({ ...movie, year: e.target.value })}
                    />
                </label>
                <br />
                <br />
                <label>
                    {t('dlc.date')}
                    <br />
                    <textarea
                        type="text"
                        value={movie.date}
                        onChange={(e) => setMovie({ ...movie, date: e.target.value })}
                    />
                </label>
                <br />
                <br />
                <label>
                    {t('dlc.genre')}
                    <br />
                    <textarea
                        type="text"
                        value={movie.genre}
                        onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
                    />
                </label>
                <br />
                <br />
                <label>
                    {t('dlc.plot')}
                    <br />
                    <textarea
                        type="number"
                        value={movie.plot}
                        onChange={(e) => setMovie({ ...movie, plot: e.target.value })}
                    />
                </label>
                <br />
                <br />
                <label>
                    {t('dlc.visual')}
                    <br />
                    <textarea
                        type="number"
                        value={movie.visual}
                        onChange={(e) => setMovie({ ...movie, visual: e.target.value })}
                    />
                </label>
                <br />
                <br />
                <label>
                    {t('dlc.originality')}
                    <br />
                    <textarea
                        type="number"
                        value={movie.originality}
                        onChange={(e) => setMovie({ ...movie, originality: e.target.value })}
                    />
                </label>
                <br />
                <br />
                <label>
                    {t('dlc.atmosphere')}
                    <br />
                    <textarea
                        type="number"
                        value={movie.atmosphere}
                        onChange={(e) => setMovie({ ...movie, atmosphere: e.target.value })}
                    />
                </label>
                <br />
                <br />
                <label>
                    {t('dlc.finalestimate')}
                    <br />
                    <textarea
                        type="number"
                        value={movie.rating}
                        onChange={(e) => setMovie({ ...movie, rating: e.target.value })}
                    />
                </label>
                <br />
                <br />
                <label>
                    {t('dlc.review')}
                    <br />
                    <textarea
                        type="text"
                        value={movie.comment}
                        onChange={(e) => setMovie({ ...movie, comment: e.target.value })}
                    />
                </label>
                <br />
                <br />
                <label>
                    {t('dlc.franchise')}
                    <br />
                    <textarea
                        type="text"
                        value={movie.franchise}
                        onChange={(e) => setMovie({ ...movie, franchise: e.target.value })}
                    />
                </label>
                <br />
                <br />
                <button type="submit">{t('dlc.change')}</button>
            </form>
        </div>
    );
};

export default Edit;
