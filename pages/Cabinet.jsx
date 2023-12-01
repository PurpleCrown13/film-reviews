import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
    import '../styles/Cabinet.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { message, Popconfirm } from 'antd';
import { Helmet } from "react-helmet";
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import React from 'react';
import Marquee from 'react-fast-marquee';
import { Alert } from 'antd';
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Snippet } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import toast, { Toaster } from 'react-hot-toast';





ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,);


const Cabinet = () => {
    
    const [movieCount, setMovieCount] = useState(0);
    const [animeCount, setAnimeCount] = useState(0);
    const [cartoonCount, setCartoonCount] = useState(0);
    const [seriesCount, setSeriesCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [averageMovieRating, setAverageMovieRating] = useState(0);
    const [averageAnimeRating, setAverageAnimeRating] = useState(0);
    const [averageCartoonRating, setAverageCartoonRating] = useState(0);
    const [averageSeriesRating, setAverageSeriesRating] = useState(0);
    const [averageTotalRating, setAverageTotalRating] = useState(0);
    const [year2023Data, setYear2023Data] = useState(null);
    const login = localStorage.getItem('login');
    const name = localStorage.getItem('name');
    const history = useNavigate();
    const { t, i18n } = useTranslation();
    const locales = {
        en: { title: 'English' },
        ua: { title: 'Українська' },
        ru: { title: 'Русский' },
    };
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        toast(t('main.changelang'),
            {
                icon: '🌐',
                style: {
                    borderRadius: '50px',
                    background: '#121212',
                    color: '#fff',
                },
            }
        );
    };
    const confirm = (e) => {
        console.log(e);
        handleDeleteLogin()
    };
    const cancel = (e) => {
        console.log(e);
        toast.error(t('main.logcancel'),
            {
                style: {
                    borderRadius: '50px',
                    background: '#121212',
                    color: '#fff',
                },
            }
        );
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: t('main.numberViews'),
            },
        },
    };
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentURL = `${window.location.protocol}//${window.location.host}`;
    const [exist, setExist] = useState(false); 
    const [isSelected, setIsSelected] = useState(exist);
    const [data, setData] = useState([]);
    const dataLine = {
        labels,
        datasets: [
            {
                fill: true,
                label: t('main.watched'),
                data, 
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.3)',
            },
        ],
    };
    const calculateData = (apiData) => {
        const monthCounts = Array(12).fill(0); 
        const login = localStorage.getItem('login'); 
        const dateRegex = /(\d{1,2}[./]\d{1,2}[./]\d{2,4})/;
        apiData.forEach((item) => {
            const date = item.date;
            if (date) {
                const matches = date.match(dateRegex);
                if (matches) {
                    const matchedDate = matches[1];
                    if (matchedDate.endsWith("23") || matchedDate.endsWith("2023")) {
                        if (item.login === login) {
                            const monthIndex = parseInt(matchedDate.split(/[./]/)[1]) - 1;
                            if (!isNaN(monthIndex)) {
                                monthCounts[monthIndex]++; 
                            }
                        }
                    }
                }
            }
        });

        return monthCounts;
    };
    const pieOptions = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((acc, cur) => acc + cur, 0);
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(2) + '%' : '0.00%';
                        return ` ${value} ${t('main.evaluations')} (${percentage})`;
                    },
                },
            },
        },
    };
    const [allRatingsData, setAllRatingsData] = useState({
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                backgroundColor: [
                    'rgba(255, 52, 26, 0.5)',   // #FF341A в формате RGBA
                    'rgba(246, 125, 0, 0.5)',   // #F67D00 в формате RGBA
                    'rgba(235, 246, 0, 0.5)',   // #EBF600 в формате RGBA
                    'rgba(235, 246, 0, 0.5)',   // #EBF600 в формате RGBA
                    'rgba(11, 182, 82, 0.5)',   // #0BB652 в формате RGBA
                    'rgba(11, 182, 82, 0.5)',   // #0BB652 в формате RGBA
                    'rgba(11, 182, 82, 0.5)',   // #0BB652 в формате RGBA
                    'rgba(0, 155, 255, 0.5)',   // #009BFF в формате RGBA
                    'rgba(0, 155, 255, 0.5)',   // #009BFF в формате RGBA
                    'rgba(200, 150, 217, 0.5)', // #C896D9 в формате RGBA
                ],
                borderColor: [
                    'rgba(255, 52, 26, 1)',   // #FF341A в формате RGBA
                    'rgba(246, 125, 0, 1)',   // #F67D00 в формате RGBA
                    'rgba(235, 246, 0, 1)',   // #EBF600 в формате RGBA
                    'rgba(235, 246, 0, 1)',   // #EBF600 в формате RGBA
                    'rgba(11, 182, 82, 0.5)', // #0BB652 в формате RGBA
                    'rgba(11, 182, 82, 1)',   // #0BB652 в формате RGBA
                    'rgba(11, 182, 82, 1)',   // #0BB652 в формате RGBA
                    'rgba(0, 155, 255, 1)',   // #009BFF в формате RGBA
                    'rgba(0, 155, 255, 1)',   // #009BFF в формате RGBA
                    'rgba(200, 150, 217, 1)', // #C896D9 в формате RGBA
                ],
                borderWidth: 2,
            },
        ],
    });
    const [allRatingsData23, setAllRatingsData23] = useState({
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                backgroundColor: [
                    'rgba(255, 52, 26, 0.5)',   // #FF341A в формате RGBA
                    'rgba(246, 125, 0, 0.5)',   // #F67D00 в формате RGBA
                    'rgba(235, 246, 0, 0.5)',   // #EBF600 в формате RGBA
                    'rgba(235, 246, 0, 0.5)',   // #EBF600 в формате RGBA
                    'rgba(11, 182, 82, 0.5)',   // #0BB652 в формате RGBA
                    'rgba(11, 182, 82, 0.5)',   // #0BB652 в формате RGBA
                    'rgba(11, 182, 82, 0.5)',   // #0BB652 в формате RGBA
                    'rgba(0, 155, 255, 0.5)',   // #009BFF в формате RGBA
                    'rgba(0, 155, 255, 0.5)',   // #009BFF в формате RGBA
                    'rgba(200, 150, 217, 0.5)', // #C896D9 в формате RGBA
                ],
                borderColor: [
                    'rgba(255, 52, 26, 1)',   // #FF341A в формате RGBA
                    'rgba(246, 125, 0, 1)',   // #F67D00 в формате RGBA
                    'rgba(235, 246, 0, 1)',   // #EBF600 в формате RGBA
                    'rgba(235, 246, 0, 1)',   // #EBF600 в формате RGBA
                    'rgba(11, 182, 82, 0.5)', // #0BB652 в формате RGBA
                    'rgba(11, 182, 82, 1)',   // #0BB652 в формате RGBA
                    'rgba(11, 182, 82, 1)',   // #0BB652 в формате RGBA
                    'rgba(0, 155, 255, 1)',   // #009BFF в формате RGBA
                    'rgba(0, 155, 255, 1)',   // #009BFF в формате RGBA
                    'rgba(200, 150, 217, 1)', // #C896D9 в формате RGBA
                ],
                borderWidth: 2,
            },
        ],
    });
    const [activeTab, setActiveTab] = useState(1);
    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    useEffect(() => {
        if (!login) {
            history('/login');
            return;
        }
        axios.get("http://hellafragilesite.com/film-reviews-api/api-top5.php")
            .then((response) => {
                const data = response.data;
                const login = localStorage.getItem("login");
                const userRecord = data.find((record) => record.login == login);
                if (userRecord) {
                    const existValue = userRecord.exist == "true";
                    setExist(existValue);
                    console.log('exist value:', existValue);
                    console.log('exist value:', userRecord.name1);
                } else {
                    setExist(false);
                    console.log('exist value:', false);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        axios
            .get("http://hellafragilesite.com/film-reviews-api/api-all.php")
            .then((response) => {
                const data = response.data;
                const calculatedData = calculateData(data);
                setData(calculatedData);
                const filteredYear2023Data = data.filter(item => item.date && (item.date.endsWith(".23") || item.date.endsWith("/23") || item.date.endsWith(".2023") || item.date.endsWith("/2023")));
                setYear2023Data(filteredYear2023Data);
                const movieData = getWordCountAndRating(data, "Фильм", login);
                const animeData = getWordCountAndRating(data, "Аниме", login);
                const cartoonData = getWordCountAndRating(data, "Мультфильм", login);
                const seriesData = getWordCountAndRating(data, "Сериал", login);
                const totalData = getWordCountAndRating(data, "", login);
                setMovieCount(movieData.count);
                setAnimeCount(animeData.count);
                setCartoonCount(cartoonData.count);
                setSeriesCount(seriesData.count);
                setTotalCount(totalData.count);
                setAverageMovieRating(movieData.averageRating);
                setAverageAnimeRating(animeData.averageRating);
                setAverageCartoonRating(cartoonData.averageRating);
                setAverageSeriesRating(seriesData.averageRating);
                setAverageTotalRating(totalData.averageRating);
                const userRatings = data.filter(item => item.login === login && !isNaN(parseFloat(item.rating)));
                const userRatings23 = filteredYear2023Data.filter(item => item.login === login && !isNaN(parseFloat(item.rating)));
                const ratingsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                const ratingsCount23 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                userRatings.forEach(item => {
                    const rating = parseFloat(item.rating);
                    if (!isNaN(rating) && rating >= 1 && rating <= 10) {
                        const index = Math.floor(rating) - 1;
                        ratingsCount[index]++;
                    }
                });
                userRatings23.forEach(item => {
                    const rating = parseFloat(item.rating);
                    if (!isNaN(rating) && rating >= 1 && rating <= 10) {
                        const index = Math.floor(rating) - 1;
                        ratingsCount23[index]++;
                    }
                });
                setAllRatingsData(prevData => ({
                    ...prevData,
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: ratingsCount,
                        },
                    ],
                }));
                setAllRatingsData23(prevData => ({
                    ...prevData,
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: ratingsCount23,
                        },
                    ],
                }));
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    const getWordCountAndRating = (data, word, login) => {
        const filteredData = data.filter(item => item.genre && item.genre.includes(word) && item.login === login);
        const count = filteredData.length;
        let totalRating = 0;
        for (let i = 0; i < count; i++) {
            const rating = parseFloat(filteredData[i].rating);
            if (!isNaN(rating)) {
                totalRating += rating;
            }
        }
        const averageRating = count > 0 ? (totalRating / count).toFixed(2) : '0.00';
        return {
            count,
            averageRating,
        };
    };
    const getCountByGenre = (data, genre, login) => {
        if (!data) {
            return 0;
        }
        const filteredData = data.filter(item => item.genre.includes(genre) && item.login === login);
        const count = filteredData.length;
        return count;
    };
    const getAverageRatingByGenre = (data, genre, login) => {
        if (!data) {
            return '0.00';
        }
        const filteredData = data.filter(item => item.genre.includes(genre) && item.login === login);
        const count = filteredData.length;
        let totalRating = 0;
        for (let i = 0; i < count; i++) {
            const rating = parseFloat(filteredData[i].rating);
            if (!isNaN(rating)) {
                totalRating += rating;
            }
        }
        const averageRating = count > 0 ? (totalRating / count).toFixed(2) : '0.00';
        return averageRating;
    };
    const getAverageRating = (data) => {
        if (!data) {
            return '0.00';
        }
        const count = data.length;
        let totalRating = 0;
        for (let i = 0; i < count; i++) {
            const rating = parseFloat(data[i].rating);
            if (!isNaN(rating)) {
                totalRating += rating;
            }
        }
        const averageRating = count > 0 ? (totalRating / count).toFixed(2) : '0.00';
        return averageRating;
    };
    const handleDeleteLogin = () => {
        const logoutMessage = t('main.logsuccess');
        localStorage.removeItem('login');
        localStorage.removeItem('name');
        localStorage.setItem('logoutMessage', logoutMessage);
        history('/login');
    };
    const top5movies = [
        { value: 'cat', label: 'Фильм 11' },
        { value: 'dog', label: 'Пила 20' },
        { value: 'rabbit', label: 'Витя' },
    ];
    const handleSwitchChange = (value) => {
        setExist(value);

        // Отправляем значение на сервер
        axios.post("http://hellafragilesite.com/film-reviews-api/update-exist.php", {
            login: localStorage.getItem('login'),
            exist: value ? "true" : "false" 
        })
            .then((response) => {
                console.log("Значение успешно отправлено на сервер.");
            })
            .catch((error) => {
                console.error("Ошибка при отправке значения на сервер:", error);
            });
    };

    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);
    const [sortColumn2, setSortColumn2] = useState();
    const [sortType2, setSortType2] = useState();
    const [loading2, setLoading2] = useState(false);



    const dataTable = [
        { type: t('main.movies'), evaluated: movieCount, average: averageMovieRating },
        { type: t('main.anime'), evaluated: animeCount, average: averageAnimeRating },
        { type: t('main.cartoons'), evaluated: cartoonCount, average: averageCartoonRating },
        { type: t('main.serials'), evaluated: seriesCount, average: averageSeriesRating },
        { type: t('main.all'), evaluated: totalCount, average: averageTotalRating },
    ];

    const dataTable2 = [
        { type: t('main.movies'), evaluated: getCountByGenre(year2023Data, "Фильм", login), average: getAverageRatingByGenre(year2023Data, "Фильм", login) },
        { type: t('main.anime'), evaluated: getCountByGenre(year2023Data, "Аниме", login), average: getAverageRatingByGenre(year2023Data, "Аниме", login) },
        { type: t('main.cartoons'), evaluated: getCountByGenre(year2023Data, "Мультфильм", login), average: getAverageRatingByGenre(year2023Data, "Мультфильм", login) },
        { type: t('main.serials'), evaluated: getCountByGenre(year2023Data, "Сериал", login), average: getAverageRatingByGenre(year2023Data, "Сериал", login) },
        { type: t('main.all'), evaluated: year2023Data ? getCountByGenre(year2023Data, "", login) : 0, average: getAverageRatingByGenre(year2023Data, "", login) },
    ];


    

    const handleSortColumn = (columnName) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (sortColumn === columnName) {
                setSortType(sortType === 'asc' ? 'desc' : 'asc');
            } else {
                setSortColumn(columnName);
                setSortType('asc');
            }
        }, 500);
    };

    const handleSortColumn2 = (columnName) => {
        setLoading2(true);
        setTimeout(() => {
            setLoading2(false);
            if (sortColumn2 === columnName) {
                setSortType2(sortType2 === 'asc' ? 'desc' : 'asc');
            } else {
                setSortColumn2(columnName);
                setSortType2('asc');
            }
        }, 500);
    };


    const sortedData = () => {
        if (sortColumn && sortType) {
            return dataTable.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                if (typeof x === 'string') {
                    x = x.charCodeAt();
                }
                if (typeof y === 'string') {
                    y = y.charCodeAt();
                }
                return sortType === 'asc' ? x - y : y - x;
            });
        }
        return dataTable;
    };

    const sortedData2 = () => {
        if (sortColumn2 && sortType2) {
            return dataTable2.sort((a, b) => {
                let x = a[sortColumn2];
                let y = b[sortColumn2];
                if (typeof x === 'string') {
                    x = x.charCodeAt();
                }
                if (typeof y === 'string') {
                    y = y.charCodeAt();
                }
                return sortType2 === 'asc' ? x - y : y - x;
            });
        }
        return dataTable2;
    };


    const getSortIndicator = (columnName) => {
        if (sortColumn === columnName) {
            return sortType === 'asc' ? ' ⇈' : ' ⇊';
        }
        return ' ⇵';
    };

    const getSortIndicator2 = (columnName) => {
        if (sortColumn2 === columnName) {
            return sortType2 === 'asc' ? ' ⇈' : ' ⇊';
        }
        return ' ⇵';
    };


    return (
        <motion.div className="cabinet-wrapper"
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}

        >
            <Helmet>
                <title>
                    {t('header.cabinet')}
                </title>
            </Helmet>
            <h1 style={{ textAlign: "center", margin: "50px" , color: "white", fontSize: "30px"}}>{t('main.cabinetinfo')}{name}</h1>
            <div className="tab-header">
                <Button variant="shadow"   className={`tab ${activeTab === 1 ? 'active-tab' : ''}`} onClick={() => handleTabClick(1)}>
                        {t('main.stattitleall')}
                </Button>
                <Button variant="shadow"  className={`tab ${activeTab === 2 ? 'active-tab' : ''}`} onClick={() => handleTabClick(2)}>
                    {t('main.stattitle23')}
                </Button>
                <Button variant="shadow"  className={`tab ${activeTab === 3 ? 'active-tab' : ''}`} onClick={() => handleTabClick(3)}>
                    {t('main.stattitle24')}
                </Button>
            </div>
            <div className="tab-content">
                {activeTab === 1 && <div>
                    <motion.table
                        className="statistic-table"
                        initial={{
                            opacity: 0,
                            y: -200,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.4,
                        }}
                        style={{ tableLayout: 'fixed' }}
                    >
                        <thead>
                            <tr className="statistic-table-title">
                                <th colSpan="3">{t('main.statall')}</th>
                            </tr>
                            <tr>
                                <th>
                                    {t('main.type')}
                                </th>
                                <th onClick={() => handleSortColumn('evaluated')} style={{ cursor: 'pointer' }}>
                                    {t('main.evaluated')}
                                    {getSortIndicator('evaluated')}
                                </th>
                                <th onClick={() => handleSortColumn('average')} style={{ cursor: 'pointer' }}>
                                    {t('main.average')}
                                    {getSortIndicator('average')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData().map((item, index) => (
                                <tr key={index}>
                                    <td>{item.type}</td>
                                    <td>{item.evaluated}</td>
                                    <td>{item.average}</td>
                                </tr>
                            ))}
                        </tbody>
                    </motion.table>
                    <div className="chart-container">
                        <Pie data={allRatingsData} options={pieOptions} />
                    </div>
                </div>}
                {activeTab === 2 && <div>
                    <div className="line-chart">
                        <Line options={options} data={dataLine} />
                    </div>
                    <motion.table
                        className="statistic-table"
                        initial={{
                            opacity: 0,
                            y: -200,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.2,
                        }}
                        style={{ tableLayout: 'fixed' }}
                    >
                        <thead>
                            <tr className="statistic-table-title">
                                <th colSpan="3">{t('main.stat23')}</th>
                            </tr>
                            <tr>
                                <th onClick={() => handleSortColumn2('type')} style={{ cursor: 'pointer' }}>
                                    {t('main.type')}
                                    {getSortIndicator2('type')}
                                </th>
                                <th onClick={() => handleSortColumn2('evaluated')} style={{ cursor: 'pointer' }}>
                                    {t('main.evaluated')}
                                    {getSortIndicator2('evaluated')}
                                </th>
                                <th onClick={() => handleSortColumn2('average')} style={{ cursor: 'pointer' }}>
                                    {t('main.average')}
                                    {getSortIndicator2('average')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData2().map((item, index) => (
                                <tr key={index}>
                                    <td>{item.type}</td>
                                    <td>{item.evaluated}</td>
                                    <td>{item.average}</td>
                                </tr>
                            ))}
                        </tbody>
                    </motion.table>
                    <div className="chart-container">
                        <Pie data={allRatingsData23} options={pieOptions} />
                    </div>
                </div>}
                {activeTab === 3 && <div>
                    <Alert
                        type="info"
                        banner
                        className="running-alert"
                        message={
                            <Marquee pauseOnHover gradient={false} speed={150} >
                                {t('main.runningalert')}
                            </Marquee>
                        }
                    />
                </div>}
            </div>
            <div className="select-container">
                {contextHolder}
                <Select
                    placeholder={locales[i18n.resolvedLanguage].title} 
                    className="select-cabinet  max-w-xs dark"
                    value={i18n.resolvedLanguage}
                        onChange={(e) => {
                        i18n.changeLanguage(e.target.value).then(() => {
                            success();
                        });
                    }}
                >
                    {Object.keys(locales).map((locale) => (
                        <SelectItem key={locale} value={locale} className="select-item">
                            {locales[locale].title}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="settings-container">
                <h1 style={{ textAlign: "center", color: "white", fontSize: "30px" }}>{t('cabin.1')} {name}</h1>
                <Switch isSelected={exist} onValueChange={handleSwitchChange} color="primary" style={{ margin: "50px" }}>{t('cabin.2')}</Switch>
                <div className="next-ui-accordion-container">
                    {exist ? (
                    <Accordion variant="shadow" selectionMode="multiple">
                            <AccordionItem key="1" aria-label="Accordion 1" title={t('cabin.3')} >
                            <div className="next-ui-accordion">
                                    <Snippet size="lg" symbol="" variant="solid" className="accordion-snippet">
                                        {`${currentURL}/profile/${login}`}
                                    </Snippet>
                                <Link showAnchorIcon href={`${currentURL}/profile/${login}`} color="foreground" isBlock className="next-ui-link">
                                        {t('cabin.4')}
                                </Link>
                            </div>
                        </AccordionItem>
                            <AccordionItem key="2" aria-label="Accordion 2" title={t('cabin.5')} >
                            <div className="next-ui-accordion">
                                    <Snippet size="lg" symbol="" variant="solid" className="accordion-snippet">
                                        {`${currentURL}/top5-settings/${login}`}
                                    </Snippet>
                                    <Link showAnchorIcon href={`${currentURL}/top5-settings/${login}`} color="foreground" isBlock className="next-ui-link">
                                        {t('cabin.6')}
                                </Link>
                            </div>
                        </AccordionItem>
                        </Accordion>
                    ) : null}
                </div>
            </div>
            <div className="logout-container">
                <Popconfirm
                    title={t('main.logtitle')}
                    description={t('main.logquestion')}
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText={t('main.logyes')}
                    cancelText={t('main.logno')}
                    okType="default"
                >
                    <Button variant="flat" className="logout" >
                        {t('main.exit')}
                    </Button>
                </Popconfirm>
                    <Toaster />
            </div>
        </motion.div>
    );
};
export default Cabinet;
