import '../styles/Top5Settings.css';
import { useParams } from 'react-router-dom';
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet";

const Top5Settings = () => {
    const { login } = useParams();
    const savedLogin = localStorage.getItem('login');
    const isLoginMatch = login === savedLogin;
    const [movieOptions, setMovieOptions] = useState([]);
    const [imageOptions, setImageOptions] = useState([]);
    const name = localStorage.getItem('name');
    const [selectedMovies, setSelectedMovies] = useState({
        name1: null,
        image1: null,
        name2: null,
        image2: null,
        name3: null,
        image3: null,
        name4: null,
        image4: null,
        name5: null,
        image5: null,
    });
    const sendSelectedDataToServer = async () => {
        try {
            const userLogin = localStorage.getItem('login');
            const requestData = {
                login: userLogin,
                name1: selectedMovies.name1,
                image1: selectedMovies.image1,
                name2: selectedMovies.name2,
                image2: selectedMovies.image2, 
                name3: selectedMovies.name3,
                image3: selectedMovies.image3, 
                name4: selectedMovies.name4,
                image4: selectedMovies.image4, 
                name5: selectedMovies.name5,
                image5: selectedMovies.image5, 
            };

            await axios.post('http://hellafragilesite.com/film-reviews-api/top5-add.php', requestData);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const moviesResponse = await axios.get('http://hellafragilesite.com/film-reviews-api/api-profile.php');
                const userLogin = localStorage.getItem('login');
                const validMovies = moviesResponse.data.filter(movie => movie.name !== undefined && movie.login === userLogin);
                const movieNames = validMovies.map(movie => movie.name);
                const movieImage = validMovies.map(movie => movie.image);
                setMovieOptions(movieNames);
                setImageOptions(movieImage);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const [allFieldsFilled, setAllFieldsFilled] = useState(false);

    const checkAllFieldsFilled = () => {
        for (let i = 1; i <= 5; i++) {
            const fieldName = `name${i}`;
            if (!selectedMovies[fieldName]) {
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        setAllFieldsFilled(checkAllFieldsFilled());
    }, [selectedMovies]);


    const isStepPrimary = (step) => {
        const fieldName = `name${step}`;
        return !!selectedMovies[fieldName];
    };

    const { t, i18n } = useTranslation();


    return (
        <div className='top5-container'>
            {isLoginMatch ? (
                <div>
                    <Helmet>
                        <title>
                            {t('patch3.16')}
                        </title>
                    </Helmet>
                    <div className='next-ui-autocomplete-container'>
                        <h1 className='top-title'>{t('patch3.17')} {name}</h1>
                        <Autocomplete
                            isRequired
                            label={t('patch3.18')}
                            variant='bordered'
                            size={"lg"}
                            className='next-ui-autocomplete'
                            defaultItems={movieOptions.map((item, index) => ({ value: item, label: item, key: index }))}
                            onSelectionChange={(selectedIndex) => {
                                const selectedMovie = movieOptions[selectedIndex];
                                const selectedImage = imageOptions[selectedIndex];
                                setSelectedMovies({
                                    ...selectedMovies,
                                    name1: selectedMovie,
                                    image1: selectedImage,
                                });
                            }}
                        >
                            {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                        </Autocomplete>
                        <Autocomplete
                            isRequired
                            label={t('patch3.18')}
                            variant='bordered'
                            size={"lg"}
                            className='next-ui-autocomplete'
                            defaultItems={movieOptions.map((item, index) => ({ value: item, label: item, key: index }))}
                            onSelectionChange={(selectedIndex) => {
                                const selectedMovie = movieOptions[selectedIndex];
                                const selectedImage = imageOptions[selectedIndex];
                                setSelectedMovies({
                                    ...selectedMovies,
                                    name2: selectedMovie,
                                    image2: selectedImage,
                                });
                            }}
                        >
                            {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                        </Autocomplete>
                        <Autocomplete
                            isRequired
                            label={t('patch3.18')}
                            variant='bordered'
                            size={"lg"}
                            className='next-ui-autocomplete'
                            defaultItems={movieOptions.map((item, index) => ({ value: item, label: item, key: index }))}
                            onSelectionChange={(selectedIndex) => {
                                const selectedMovie = movieOptions[selectedIndex];
                                const selectedImage = imageOptions[selectedIndex];
                                setSelectedMovies({
                                    ...selectedMovies,
                                    name3: selectedMovie,
                                    image3: selectedImage,
                                });
                            }}
                        >
                            {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                        </Autocomplete>
                        <Autocomplete
                            isRequired
                            label={t('patch3.18')}
                            variant='bordered'
                            size={"lg"}
                            className='next-ui-autocomplete'
                            defaultItems={movieOptions.map((item, index) => ({ value: item, label: item, key: index }))}
                            onSelectionChange={(selectedIndex) => {
                                const selectedMovie = movieOptions[selectedIndex];
                                const selectedImage = imageOptions[selectedIndex];
                                setSelectedMovies({
                                    ...selectedMovies,
                                    name4: selectedMovie,
                                    image4: selectedImage,
                                });
                            }}
                        >
                            {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                        </Autocomplete>
                        <Autocomplete
                            isRequired
                            label={t('patch3.18')}
                            variant='bordered'
                            size={"lg"}
                            className='next-ui-autocomplete'
                            defaultItems={movieOptions.map((item, index) => ({ value: item, label: item, key: index }))}
                            onSelectionChange={(selectedIndex) => {
                                const selectedMovie = movieOptions[selectedIndex];
                                const selectedImage = imageOptions[selectedIndex];
                                setSelectedMovies({
                                    ...selectedMovies,
                                    name5: selectedMovie,
                                    image5: selectedImage,
                                });
                            }}
                        >
                            {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                        </Autocomplete>
                    </div>
                    <div className='daisy-steps'>
                        <ul className="steps" >
                            <li data-content="✓" className={`step ${isStepPrimary(1) ? 'step-success' : ''}`}></li>
                            <li data-content="✓" className={`step ${isStepPrimary(2) ? 'step-success' : ''}`}></li>
                            <li data-content="✓" className={`step ${isStepPrimary(3) ? 'step-success' : ''}`}></li>
                            <li data-content="✓" className={`step ${isStepPrimary(4) ? 'step-success' : ''}`}></li>
                            <li data-content="✓" className={`step ${isStepPrimary(5) ? 'step-success' : ''}`}></li>
                        </ul>
                    </div>
                    <div className='next-ui-btn'>
                        <Button color="primary" size='lg' onClick={sendSelectedDataToServer} isDisabled={!allFieldsFilled}>
                            {t('patch3.20')}
                        </Button>
                    </div>
                </div>
            ) : (
                <div>
                        {t('patch3.19')}
                </div>
            )}
        </div>
    );
}

export default Top5Settings;
