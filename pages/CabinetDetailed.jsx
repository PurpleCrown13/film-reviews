import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import '../styles/CabinetDetailed.css';
import { Tooltip, Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CheckIcon } from "./CheckIcon.jsx";
import { CircularProgress } from "@nextui-org/react";
import { useTranslation } from 'react-i18next';


const CabinetDetailed = () => {
    const [movieCount, setMovieCount] = useState(0);
    const [animeCount, setAnimeCount] = useState(0);
    const [cartoonCount, setCartoonCount] = useState(0);
    const [seriesCount, setSeriesCount] = useState(0);
    const { username } = useParams();
    const [top5Data, setTop5Data] = useState([]);
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [visibleMoviesCount, setVisibleMoviesCount] = useState(40); 
    const { t, i18n } = useTranslation();

    const fetchData = async () => {
        try {
            const top5Response = await axios.get(`http://hellafragilesite.com/film-reviews-api/api-top5.php?login=${username}`);
            setTop5Data(top5Response.data);

            const watchedMoviesResponse = await axios.get(`http://hellafragilesite.com/film-reviews-api/api-profile.php?username=${username}`);
            const filteredWatchedMovies = watchedMoviesResponse.data.filter(movie => movie.login === username);
            console.log(filteredWatchedMovies);
            setWatchedMovies(filteredWatchedMovies);
           
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let animeCount = 0;
        let movieCount = 0;
        let cartoonCount = 0;
        let seriesCount = 0;
        watchedMovies.forEach((movie) => {
            if (movie.genre === "Аниме") {
                animeCount++;
            } else if (movie.genre === "Фильм") {
                movieCount++;
            } else if (movie.genre === "Мультфильм") {
                cartoonCount++;
            } else if (movie.genre === "Сериал") {
                seriesCount++;
            }
        });
        setAnimeCount(animeCount);
        setMovieCount(movieCount);
        setCartoonCount(cartoonCount);
        setSeriesCount(seriesCount);
    }, [watchedMovies]);

    const handleLoadMore = () => {
        setVisibleMoviesCount(prevCount => prevCount + 40); 
    };

    if (top5Data.length == 0 || top5Data[0].exist == "false") {
        return (
            <div>
                <Helmet>
                    <title>
                        {t('patch3.1')}
                    </title>
                </Helmet>
                <div className="profile-name">
                    <Chip color="danger" variant="dot" className="next-ui-title-chip" radius="md"
                    >
                        {t('patch3.15')}
                    </Chip>
                </div>
            </div>
        );
    }
    
    return (
        <div >
            <Helmet>
                <title>
                    {t('patch3.1')}
                </title>
            </Helmet>
            <div className="divider before:bg-[#ADBAC0] after:bg-[#ADBAC0] divider-name" >
                <div className="profile-name">
                    <Chip color="default" variant="flat" className="next-ui-title-chip" radius="md">
                        {t('patch3.1')} {top5Data.length > 0 ? top5Data.find(item => item.login === username)?.name : username}
                    </Chip>

                </div>
            </div>
            <div className="topp-box"> 
            <div className="admin-chips">
                {username === 'TestUser' && (
                    <Chip
                        startContent={<CheckIcon size={30} />}
                        variant="shadow"
                        className="admin-chips-image"
                        classNames={{
                            base: "bg-[#F25022]",
                        }}
                        >
                        <div className="admin-chips-text">Test Account</div>
                    </Chip>
                )}
            </div>
            </div>
            <div className="" >
                <div className="divider before:bg-[#ADBAC0] after:bg-[#ADBAC0]">
                    <div className="profile-name">
                        <Chip variant="flat" className="next-ui-title-chip" radius="md"
                        >
                            {t('patch3.2')}
                        </Chip>
                    </div>
                </div>
            </div>
            <div>
                {top5Data
                    .filter(item => item.login === username) 
                    .map((item, index) => (
                        <div key={index} className="top-5">
                            <Tooltip
                                classNames={{
                                base: [
                                    "before:bg-neutral-400 dark:before:bg-white",
                                ],
                                }}
                                content={item.name1} className="capitalize" size="lg" placement="bottom">
                                <Image src={item.image1} alt="" className="top-5-image" />
                            </Tooltip>
                            <Tooltip classNames={{
                                base: [
                                    "before:bg-neutral-400 dark:before:bg-white",
                                ],
                                }}  content={item.name2} className="capitalize" size="lg" placement="bottom">
                                <Image src={item.image2} alt="" className="top-5-image" />
                            </Tooltip>
                            <Tooltip classNames={{
                                base: [
                                    "before:bg-neutral-400 dark:before:bg-white",
                                ],
                                }}  content={item.name3} className="capitalize" size="lg" placement="bottom">
                                <Image src={item.image3} alt="" className="top-5-image" />
                            </Tooltip>
                            <Tooltip classNames={{
                                base: [
                                    "before:bg-neutral-400 dark:before:bg-white",
                                ],
                                }}  content={item.name4} className="capitalize" size="lg" placement="bottom">
                                <Image src={item.image4} alt="" className="top-5-image" />
                            </Tooltip>
                            <Tooltip classNames={{
                                base: [
                                    "before:bg-neutral-400 dark:before:bg-white",
                                ],
                                }}  content={item.name5} className="capitalize" size="lg" placement="bottom">
                                <Image src={item.image5} alt="" className="top-5-image" />
                            </Tooltip>
                        </div>
                    ))
                }
            </div>
            <div className="divider before:bg-[#ADBAC0] after:bg-[#ADBAC0]" style={{marginTop: "70px"}}>
                    <div className="profile-name">
                    <Chip variant="flat" className="next-ui-title-chip" radius="md"
                        >
                        {t('patch3.3')}
                        </Chip>
                    </div>
                </div>
            {watchedMovies != 0 && (
                <div className="daisy-stats ">
                        <div className="stat place-items-center bg-[#ADBAC0]">
                            <CircularProgress
                                formatOptions={{ style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                                size="sm"
                                value={animeCount}
                                maxValue={watchedMovies.length}
                                showValueLabel={true}
                                classNames={{
                                    svg: "w-28 h-28 drop-shadow-md",
                                    indicator: "stroke-[#fff]",
                                    track: "stroke-black",
                                    value: "text-xl font-semibold text-black",
                                }}
                            />
                            <div className="stat-title">{t('patch3.4')}</div>
                            <div className="stat-value">{animeCount}</div>
                        </div>
                        <div className="stat place-items-center bg-[#C1CAD1]">
                            <CircularProgress
                                formatOptions={{ style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                                size="sm"
                                value={movieCount}
                                maxValue={watchedMovies.length}
                                showValueLabel={true}
                                classNames={{
                                    svg: "w-28 h-28 drop-shadow-md",
                                    indicator: "stroke-[#fff]",
                                    track: "stroke-black",
                                    value: "text-xl font-semibold text-black",
                                }}
                            />
                            <div className="stat-title">{t('patch3.5')}</div>
                            <div className="stat-value">{movieCount}</div>
                        </div>
                        <div className="stat place-items-center center-viewed">
                            <div className="stat-value">{watchedMovies.length}</div>
                            <div className="stat-title">{t('patch3.6')}</div>
                        </div>
                        <div className="stat place-items-center bg-[#C1CAD1]">
                            <CircularProgress
                                formatOptions={{ style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                                size="sm"
                                value={seriesCount}
                                maxValue={watchedMovies.length}
                                showValueLabel={true}
                                classNames={{
                                    svg: "w-28 h-28 drop-shadow-md",
                                    indicator: "stroke-[#fff]",
                                    track: "stroke-black",
                                    value: "text-xl font-semibold text-black",
                                }}
                            />
                            <div className="stat-title">{t('patch3.7')}</div>
                            <div className="stat-value">{seriesCount}</div>
                        </div>
                        <div className="stat place-items-center bg-[#ADBAC0]">
                            <CircularProgress
                                formatOptions={{ style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                                size="sm"
                                value={cartoonCount}
                                maxValue={watchedMovies.length}
                                showValueLabel={true}
                                classNames={{
                                    svg: "w-28 h-28 drop-shadow-md",
                                    indicator: "stroke-[#fff]",
                                    track: "stroke-black",
                                    value: "text-xl font-semibold text-black",
                                }}
                            />
                            <div className="stat-title">{t('patch3.8')}</div>
                            <div className="stat-value">{cartoonCount}</div>
                        </div>

                </div>
            )}
            
            
            <div className="philpmoteka">
                <div className="image-container">
                    {watchedMovies.slice(0, visibleMoviesCount).map((movie, index) => (
                        <Tooltip key={index}
                            classNames={{
                                base: [
                                    "before:bg-neutral-400 dark:before:bg-white",
                                ],
                                content: [
                                    "py-2 px-4 shadow-xl",
                                    "text-black bg-gradient-to-br from-white to-neutral-400",
                                ],
                            }}
                            content={movie.name}  size="lg">
                            <Card isPressable onPress={() => {
                                setSelectedMovie(movie);
                                onOpen();
                            }} className="card-cd">
                                <img src={movie.image} alt={movie.name} className="cd-img" />
                            </Card>
                        </Tooltip>
                    ))}
                </div>
            </div>
            
            <div>
                {visibleMoviesCount < watchedMovies.length && (
                    <div className="load-more-button-container">
                        <Button onClick={handleLoadMore} variant="solid"
                            classNames={{
                                base: [
                                    "before:bg-neutral-400 dark:before:bg-white",
                                ],
                            }}
                            className="load-more">
                            {t('patch3.9')}
                        </Button>
                    </div>
                )}
            </div>

            



            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onClose}
                className="dark"
                size="lg"
                hideCloseButton
            >
                <ModalContent >
                    <>
                        <ModalHeader className="modal-head">
                            <div className="cd-img-modal-background-head" style={{ backgroundImage: `url(${selectedMovie?.image})` }} />
                            {selectedMovie?.name}
                        </ModalHeader>
                        <ModalBody className="cd-img-modal-container">
                            <div className="cd-img-modal-background" style={{ backgroundImage: `url(${selectedMovie?.image})` }} />

                            <Image src={selectedMovie?.image} alt="" isBlurred className="cd-img-modal" />
                            <div className="modal-bottom-rating-date">
                                <div>{t('patch3.10')}</div>
                                <div>
                                    {selectedMovie?.date}
                                </div>
                            </div>
                            <div className="modal-bottom">
                                <div className="modal-bottom-rating">
                                    <div className="plot">
                                        <Chip color="warning" variant="flat" className="next-ui-chip" classNames={{
                                            base: "bg-gradient-to-r from-blue-900 to-blue-600",
                                            content: "drop-shadow shadow-black text-white",
                                        }}
                                        >
                                            {t('patch3.11')} {selectedMovie?.plot}
                                        </Chip>
                                    </div>
                                    <div className="visual">
                                        <Chip color="warning" variant="flat" className="next-ui-chip" classNames={{
                                            base: "bg-gradient-to-r from-pink-900 to-pink-600",
                                            content: "drop-shadow shadow-black text-white",
                                        }}
                                        >
                                            {t('patch3.12')} {selectedMovie?.visual}
                                        </Chip>
                                    </div>
                                    <div className="originality">
                                        <Chip color="warning" variant="flat" className="next-ui-chip" classNames={{
                                            base: "bg-gradient-to-r from-orange-900 to-orange-600",
                                            content: "drop-shadow shadow-black text-white",
                                        }}
                                        >
                                            {t('patch3.13')} {selectedMovie?.originality}
                                        </Chip>
                                    </div>
                                    <div className="atmosphere">
                                        <Chip color="warning" variant="flat" className="next-ui-chip" classNames={{
                                            base: "bg-gradient-to-r from-lime-900 to-lime-600",
                                            content: "drop-shadow shadow-black text-white font-semibold",
                                        }}
                                        >
                                            {t('patch3.14')} {selectedMovie?.atmosphere}
                                        </Chip>
                                    </div>
                                </div>

                                
                            </div>
                            <div className="modal-bottom-rating-result">
                                {selectedMovie?.rating}
                            </div>
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>

        </div>
    );
}

export default CabinetDetailed;
