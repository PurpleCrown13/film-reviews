import React from 'react';
import '../styles/Header.css'; 
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';




const Header = () => {
    const { t, i18n } = useTranslation();


    return (
        <div className='header'>
            <motion.div className='header-content'>
                <Link to="/add" className='header-link'><motion.div
                >
                    <div>
                        {t('header.add')}</div>
                </motion.div></Link>
                <Link to="/best" className='header-link'><motion.div
                >
                    <div>
                        {t('header.best')}</div>
                </motion.div></Link>
                <Link to="/plannes" className='header-link'><motion.div
                >
                    <div>
                        {t('header.planns')}</div>
                </motion.div></Link>
                
                <Link to="/cabinet" className='header-link'><motion.div
                >
                    <div>
                        {t('header.cabinet')}</div>
                </motion.div></Link>
                
            </motion.div>
        </div>
    );
};

export default Header;