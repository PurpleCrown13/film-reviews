import React, { useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/FranchiseDetailed.css';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet";
import useSWR from 'swr';

const FranchiseDetailed = () => {
    window.scrollTo(0, 0);
    const { franchise } = useParams();
    const navigate = useNavigate();
    const login = localStorage.getItem('login');
    useEffect(() => {
        if (!login) {
            navigate('/login');
        }
    }, [login, navigate]);
    const { t, i18n } = useTranslation();

    const { data: franchiseData, error, isValidating } = useSWR(
        'http://hellafragilesite.com/film-reviews-api/api-all.php',
        async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            return data.filter((item) => item.franchise === franchise && item.login === login);
        },
        {
            revalidateOnMount: true,
        }
    );


    if (error) return "Error.";
    if (isValidating) return <div className="spinner">
        <span className="loading loading-infinity loading-lg"></span>
    </div>;

    const handleRowClick = (itemId) => {
        navigate(`/movies/${itemId}`);
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
                    {t('dlc.franchise')}  {franchise}
                </title>
            </Helmet>
            <div>
                <p className='f-d-title'>  {t('dlc.franchise')}  {franchise}</p>
                <div className='franchise-detaile-container'>
                    <motion.table
                        className='detailed-table'
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                delay: 0.1,
                                duration: 0.3,
                            },
                        }}
                    >
                        <thead>
                            <tr>
                                <th>{t('dlc.part')}</th>
                                <th>{t('dlc.image')}</th>
                                <th>{t('dlc.name')}</th>
                                <th>{t('dlc.rating')}</th>
                            </tr>
                        </thead>
                        <motion.tbody>
                            {franchiseData.map((item, index) => (
                                <motion.tr
                                    key={index}
                                    onClick={() => handleRowClick(item.id)}
                                    className='clickable-row'
                                    initial={{
                                        opacity: 0,
                                        y: 100,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            delay: 0.2 + index * 0.1,
                                            duration: 0.3,
                                        },
                                    }}
                                >
                                    <td className="f-d-season">{item.season}</td>
                                    <td>
                                        <img src={item.image} alt='' />
                                    </td>
                                    <td>{item.name}</td>
                                    <td><div className="f-d-rating">{item.rating}</div></td>
                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </motion.table>
                </div>
            </div>
        </motion.div>
    );
};

export default FranchiseDetailed;
