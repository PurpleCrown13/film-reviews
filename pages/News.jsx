import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import '../styles/News.css';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useTranslation } from 'react-i18next';

const News = () => {
    const { t, i18n } = useTranslation();

    const [newsData, setNewsData] = useState([]);
    const history = useNavigate();
    useEffect(() => {
        const login = localStorage.getItem('login');
            if (!login) {
                history('/login');
                return;
            }
        fetchNewsData();
        window.scrollTo(0, 0);
    }, []);

    const fetchNewsData = async () => {
        try {
            const response = await fetch('http://hellafragilesite.com/film-reviews-api/api-news.php');
            const data = await response.json();
            setNewsData(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <motion.div className='news-wrapper'
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
        >
            <Helmet>
                <title>
                    {t('footer.news')}
                </title>
            </Helmet>
            <div className='news'>
                {newsData.map((newsItem, index) => (
                    <div className='news-card' key={index}>
                        <motion.div className='news-title'
                            initial={{
                                x: -300,
                                opacity: 0.2,
                            }}
                            animate={{
                                x: 0,
                                opacity: 1,
                            }}
                            transition={{
                                delay: 0.1,
                            }}
                        >
                            {newsItem.title}
                        </motion.div>
                        <motion.div className='news-content'
                            initial={{
                                x: 300,
                                opacity: 0.2,
                            }}
                            animate={{
                                x: 0,
                                opacity: 1,
                            }}
                            transition={{
                                delay: 0.4,
                            }}>
                            {newsItem.description}
                        </motion.div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default News;
