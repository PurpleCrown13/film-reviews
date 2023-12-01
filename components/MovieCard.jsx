import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MovieCard.css';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import Select from 'react-select';
import BrilliantButton from '../components/BrilliantButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pagination } from "@nextui-org/react";

const MovieCard = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!login) {
            history('/login');
            return;
        }
    }, []);

        

    const { t, i18n } = useTranslation();
    const login = localStorage.getItem('login');
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRating, setFilterRating] = useState(null);
    const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);
    const [filterYear, setFilterYear] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 20; 
    const [isLoading, setIsLoading] = useState(true);
    const history = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://hellafragilesite.com/film-reviews-api/api-all.php');
                const filteredMovies = response.data.filter(movie => movie.login === login);
                setMovies(filteredMovies);
                setIsLoading(false); 
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        setFilterRating(selectedValues);
    };

    const handleYearFilterChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        setFilterYear(selectedValues);
    };


    const handleFilterBoxToggle = () => {
        setIsFilterBoxOpen(!isFilterBoxOpen);
    };

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
        window.scrollTo(0, 0);
    };


    const yearOptions = [
        { value: "1920-1929", label: "1920-1929" },
        { value: "1930-1939", label: "1930-1939" },
        { value: "1940-1949", label: "1940-1949" },
        { value: "1950-1959", label: "1950-1959" },
        { value: "1960-1969", label: "1960-1969" },
        { value: "1970-1979", label: "1970-1979" },
        { value: "1980-1989", label: "1980-1989" },
        { value: "1990-1999", label: "1990-1999" },
        { value: "2000-2009", label: "2000-2009" },
        { value: "2010-2019", label: "2010-2019" },
        { value: "2020-2029", label: "2020-2029" },
    ];


    
    const ratingOptions = [
        { value: "10", label: "10" },
        { value: "9", label: "9" },
        { value: "8", label: "8" },
        { value: "7", label: "7" },
        { value: "6", label: "6" },
        { value: "5", label: "5" },
        { value: "4", label: "4" },
        { value: "3", label: "3" },
        { value: "2", label: "2" },
        { value: "1", label: "1" },
    ];

    const filteredMovies = movies.filter(movie =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterRating === null || filterRating.length === 0 || filterRating.includes(movie.rating.toString())) &&
        (filterYear === null || filterYear.length === 0 || filterYear.some(yearRange => {
            const [startYear, endYear] = yearRange.split('-');
            const movieYear = parseInt(movie.year);
            return movieYear >= parseInt(startYear) && movieYear <= parseInt(endYear);
        }))
    );

    

    const customStyles = {
        
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#121212',
            border:  '4px ridge gray',
            borderRadius: '10px',
            boxShadow: state.isFocused ? '0 0 0 2px #888' : 'none',
            padding: '5px',
            width : '30vw',
            fontSize: '20px',
            textAlign: 'center',
        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: '20px',
            
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#979EA3',
            color: '#fff',
            marginRight: '10px',
            
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            fontSize: '20px',
            padding: '5px',
            
            
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
            textAlign: 'center',
           
        }),
        menu: (provided, state) => ({
            ...provided,
            width: '100%',
            backgroundColor: '#121212',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginTop: '4px',
            fontSize: '20px',
            
            
        }),
        menuList: (provided) => ({
            ...provided,
            padding: '4px',
            fontSize: '20px',
            
            
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#fff', 
            fontFamily: 'Montserrat',
        }),
        input: (provided) => ({
            ...provided,
            color: '#fff', 
        }),
    };

    const containerStyles = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMovies = filteredMovies.slice(startIndex, endIndex);

    

    
    return (
        <div>
            {currentPage === 0 && <BrilliantButton buttonText={t('main.sort')} onClick={handleFilterBoxToggle} />}
            <AnimatePresence>
            {isFilterBoxOpen && (
                <motion.div className={`filter-box ${isFilterBoxOpen ? 'open' : ''}`}
                    initial={{ opacity: 0, y: -200, scale:0, }}
                    animate={{ opacity: 1, y: 0, scale: 1, }}
                    exit={{ opacity: 0, y: -200, scale: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="sidebar"> 
                            <h1 className="page-title">{t('main.sortrating')}</h1>
                        <label htmlFor="rating-filter"></label>
                        <div className="custom-select-container" style={containerStyles}>
                            <Select
                                id="rating-filter"
                                options={ratingOptions}
                                isMulti
                                onChange={handleFilterChange}
                                styles={customStyles}
                                placeholder=""
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary25: '#282C34',
                                        primary: 'black',

                                    },
                                })}
                            />
                        </div>
                        </div>
                        <div className="sidebar">
                            <h1 className="page-title">{t('main.sortyear')}</h1>
                            <label htmlFor="year-filter"></label>
                            <div className="custom-select-container" style={containerStyles}>
                                <Select
                                    id="year-filter"
                                    options={yearOptions}
                                    isMulti
                                    onChange={handleYearFilterChange}
                                    styles={customStyles}
                                    placeholder=""
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary25: '#282C34',
                                            primary: 'black',
                                        },
                                    })}
                                />
                            </div>
                        </div>

                    <div className="sidebar"> 
                            <h1 className="page-title">{t('main.search')}</h1>
                        <div className="search-bar">
                            <motion.input
                                type="text"
                                placeholder=""
                                value={searchTerm}
                                onChange={handleSearchChange}
                                whileFocus={{ width: '70%' }}
                                transition={{ duration: 0.3, ease: "linear" }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
            
            {isLoading ? (
                <div className="spinner">
                    <span className="loading loading-infinity loading-lg"></span>
                </div>
            ) : (
            <div className="wrapper">
                        {filteredMovies.length > itemsPerPage && (
                            <Pagination
                                isCompact
                                color="success"
                                variant="flat"
                                showControls
                                total={Math.ceil(filteredMovies.length / itemsPerPage)}
                                initialPage={currentPage + 1}
                                onChange={(page) => handlePageChange(page - 1)}
                                className="pagination"
                                classNames={{
                                    cursor:
                                    "bg-[#ADBAC0]",
                                }}
                                size='sm'
                            />
                        )}
                <div className="movie-container">
                    {currentMovies.map(movie => (
                        <Link to={`/movies/${movie.id}`} key={movie.id}>
                            <motion.div className="movie-card"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.5 }}>
                                <img src={movie.image} alt="" />
                                <h2 className="movie-name">{movie.name}</h2>
                                <div className="movie-rate text-blue-400" style={{ backgroundColor: getBackgroundColor(movie.rating) }}>
                                    {movie.rating}
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                    
                </div>
                
                {!isLoading && filteredMovies.length === 0 &&  (
                    <div className="Allert">{t('main.allert')}</div>
                )
                }
            </div>
            )}
        </div>
    );
};

export default MovieCard;
