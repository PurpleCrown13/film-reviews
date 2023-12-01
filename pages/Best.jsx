import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MovieCard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet";
import { Pagination } from "@nextui-org/react";

const Best = () => {
    const [movies, setMovies] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const moviesPerPage = 9;
    const pagesVisited = pageNumber * moviesPerPage;
    const [isLoading, setIsLoading] = useState(true);
    const login = localStorage.getItem('login');
    const history = useNavigate();
    const { t, i18n } = useTranslation();
    
    useEffect(() => {

        if (!login) {
            history('/login');
            return;
        }

        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://hellafragilesite.com/film-reviews-api/api-all.php');
                const filteredMovies = response.data.filter(movie => movie.rating == 10 && movie.login == login);
                setMovies(filteredMovies);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const displayMovies = movies
        .slice(pagesVisited, pagesVisited + moviesPerPage)
        .map(movie => (
            <Link to={`/movies/${movie.id}`} key={movie.id}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="movie-card-best"
                >
                    <img src={movie.image} alt="" />
                    <h2 className="movie-name-best">{movie.name}</h2>
                </motion.div>
            </Link>
        ));

    const pageCount = Math.ceil(movies.length / moviesPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
        window.scrollTo(0, 0);
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            
        >
            <Helmet>
                <title>
                    {t('header.best')}
                </title>
            </Helmet>
            <div className="wrapper">
                <h1 className="page-title-best">{t('main.best')}</h1>
                {movies.length > 0 && (
                    <Pagination
                        isCompact
                        color="warning"
                        variant={"flat"}
                        showControls
                        total={pageCount}
                        initialPage={pageNumber + 1}
                        onChange={(page) => changePage({ selected: page - 1 })}
                        className="pagination"
                        classNames={{
                            cursor:
                                "bg-[#ADBAC0]",
                        }}
                        size="sm"
                    />
                )}
                {isLoading ? (
                    <div className="spinner">
                        <span className="loading loading-infinity loading-lg"></span>
                    </div>
                    
                ) : (
                    
                    <div className="movie-container-best">{displayMovies}</div>
                )}
                {!isLoading && movies.length === 0 && (
                    <div className="Allert">{t('main.allert')}</div>
                )}
            </div>
        </motion.div>
    );
}

export default Best;
