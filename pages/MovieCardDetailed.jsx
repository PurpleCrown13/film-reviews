import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/MovieCardDetailed.css';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Image } from 'antd';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { Helmet } from "react-helmet";

const MovieCardDetailed = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { t, i18n } = useTranslation();
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [franchiseData, setFranchiseData] = useState([]);
    const history = useNavigate();
    const storedLogin = localStorage.getItem('login');
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
            color: '#ff3d47',
        },
    });
    
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(
                    'http://hellafragilesite.com/film-reviews-api/api-all.php'
                );
                const foundMovie = response.data.find((movie) => movie.id === id);
                if (foundMovie) {
                    if (foundMovie.login !== storedLogin) {
                        setError(true);
                    } else {
                        setMovie(foundMovie);
                        const franchiseResponse = await axios.get(
                            'http://hellafragilesite.com/film-reviews-api/api-all.php'
                        ); 
                        const filteredFranchiseData = franchiseResponse.data.filter(
                            (franchise) => franchise.franchise === foundMovie.franchise
                        );
                        setFranchiseData(filteredFranchiseData);
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
    }, [id, storedLogin]);

    if (loading) {
        return <div></div>;
    }

    if (error) {
        return (
            <div>У вас нет доступа к этой странице.</div>
        );
    }

    if (!movie) {
        return <div>Такого фильма не существует.</div>;
    }

    const getBackgroundColor = (rating) => {
        if (rating == 10) {
            return '#C896D9';
        } else if (rating >= 8 && rating <= 9) {
            return '#009BFF';
        } else if (rating >= 5 && rating <= 7) {
            return '#0BB652';
        } else if (rating >= 3 && rating <= 4) {
            return '#EBF600';
        } else if (rating >= 2 && rating <= 3) {
            return '#F67D00';
        } else if (rating == 1) {
            return '#FF341A';
        } else {
            return '#C1CAD1';
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(
                `http://hellafragilesite.com/film-reviews-api/api-delete-detailed.php?id=${id}`
            );
            history('/');
        } catch (error) {
        }
    };

    const handleEdit = () => {
        history(`/movies/${id}/edit`);
    };

    return (
        <motion.div
            className="det-movie-wrapper"
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            
        >
            <Helmet>
                <title>{movie.name}</title>
            </Helmet>
            <div
                className="background-image-layer"
                style={{
                    backgroundImage: `url(${movie.image})`, 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <div className="movie-box" >
                <div className='top-box'>
                    <motion.div
                        className="movie-image"
                        initial={{
                            x: -200,
                            opacity: 0.2,
                        }}
                        animate={{
                            x: 0,
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.6,
                        }}
                        style={{ maxWidth: '100%', height: 'auto' }}

                    >
                            <Image
                              
                                src={movie.image}
                                className='imageimage'
                            />
                        
                        
                    </motion.div>
                    <motion.div
                        className="right-box"
                        initial={{
                            x: 200,
                            opacity: 0.2,
                        }}
                        animate={{
                            x: 0,
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.6,
                        }}
                    >
                        <h2 className="movie-title">{movie.name}</h2>
                        <div className="movie-rating">
                            <h1 className="movie-rating-main">
                                {t('dlc.plot')}
                                <div
                                    className="movie-rating-part"
                                    style={{ backgroundColor: getBackgroundColor(movie.plot) }}
                                >
                                    {movie.plot}
                                </div>
                            </h1>
                            <h1 className="movie-rating-main">
                                {t('dlc.visual')}
                                <div
                                    className="movie-rating-part"
                                    style={{ backgroundColor: getBackgroundColor(movie.visual) }}
                                >
                                    {movie.visual}
                                </div>
                            </h1>
                            <h1 className="movie-rating-main">
                                {t('dlc.originality')}
                                <div
                                    className="movie-rating-part"
                                    style={{
                                        backgroundColor: getBackgroundColor(movie.originality),
                                    }}
                                >
                                    {movie.originality}
                                </div>
                            </h1>
                            <h1 className="movie-rating-main">
                                {t('dlc.atmosphere')}
                                <div
                                    className="movie-rating-part"
                                    style={{ backgroundColor: getBackgroundColor(movie.atmosphere) }}
                                >
                                    {movie.atmosphere}
                                </div>
                            </h1>
                            <h1 className="movie-rating-main">
                                {t('dlc.finalestimate')} 
                                &nbsp;
                                <StyledRating
                                    name="customized-color"
                                    defaultValue={parseInt(movie.rating)}
                                    icon={<FavoriteIcon fontSize="inherit" />}
                                    readOnly
                                    max={10}
                                    emptyIcon={<FavoriteIcon fontSize="inherit" sx={{ color: grey[900] }} />}
                                />
                            </h1>



                        </div>
                        <div className="movie-info">
                            <h1 className="movie-info-main">
                                {t('dlc.info')} <div className="movie-info-part">
                                    {t(`dlc.${movie.genre.toLowerCase()}`)}
                                </div>
                            </h1>
                            <h1 className="movie-info-main">
                                {t('dlc.season')}  <div className="movie-info-part">{movie.season}</div>
                            </h1>
                            <h1 className="movie-info-main">
                                {t('dlc.year')}  <div className="movie-info-part">{movie.year}</div>
                            </h1>
                            <h1 className="movie-info-main">
                                {t('dlc.date')}  <div className="movie-info-part">{movie.date}</div>
                            </h1>
                        </div>
                    </motion.div>
                </div>
                
            </div>
            <div className="movie-comment-box"> 
                <div className="movie-comment">{movie.comment}</div>
            </div>

            {movie.franchise && movie.login === storedLogin && (
                <div className="movie-franchise-box">
                    <div className="franchise-title">{movie.franchise}</div>
                    <div className="franchise-columns">
                        <div className="franchise-column-left">
                            <div className="franchise-season">{t('dlc.part')} </div>
                            <div className="franchise-name">{t('dlc.name')} </div>
                        </div>
                        <div className="franchise-column-right">
                            <div className="franchise-year">{t('dlc.year')} </div>
                            <div className="franchise-rating">{t('dlc.rating')} </div>
                        </div>
                    </div>

                    {franchiseData
                        .filter((franchise) => franchise.login === storedLogin) 
                        .sort((a, b) => b.year - a.year) 
                        .map((franchise) => (
                            <div className="franchise-content" key={franchise.id}>
                                <div className="franchise-content-left">
                                    <div className="franchise-content-season">{franchise.season}</div>
                                    <Link
                                        to={`/movies/${franchise.id}`}
                                        className={`franchise-content-name ${franchise.name === movie.name ? 'highlighted' : ''}`}
                                    >
                                        {franchise.name}
                                    </Link>
                                </div>
                                <div className="franchise-content-right">
                                    <div className="franchise-content-year">{franchise.year}</div>
                                    <div
                                        className="franchise-content-rating"
                                        style={{ backgroundColor: getBackgroundColor(franchise.rating) }}
                                    >
                                        {franchise.rating}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}

            <div className="useful-buttons">
                <button onClick={handleDelete}>
                    <svg
                        width="46"
                        height="46"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2z"></path>
                        <path d="m15 9-6 6"></path>
                        <path d="m9 9 6 6"></path>
                    </svg>
                </button>
                <button onClick={handleEdit}>
                    <svg width="46" height="46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                        <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"></path>
                    </svg>
                </button>
            </div>
        </motion.div>
    );
};

export default MovieCardDetailed;
