import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Footer = () => {
    const { t, i18n } = useTranslation();

    return (
        <footer className="footer">
            <div className="text-white py-8">
                
            <div className="flex flex-col items-center justify-center items-center ">
                    <div className="flex items-center mb-6 footer-links">
                    <Link to="/franchise" className="mr-6 transition duration-300 ease-in-out hover:text-gray-400 flex items-center footer-link">
                            <svg className="w-6 h-6  mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.315 1.665a.8.8 0 0 0-.63 0l-11.2 4.8a.8.8 0 0 0 0 1.47l11.2 4.8a.8.8 0 0 0 .63 0l11.2-4.8a.8.8 0 0 0 0-1.47l-11.2-4.8Z"></path>
                                <path d="M12 15.93 1.115 11.265l-.63 1.47L12 17.671l11.515-4.936-.63-1.47L12 15.93Z"></path>
                                <path d="m1.115 16.065-.63 1.47L12 22.471l11.515-4.936-.63-1.47L12 20.73 1.115 16.065Z"></path>
                            </svg>
                            {t('footer.franchise')}
                        </Link>
                        <Link to="/news" className="mr-6 transition duration-300 ease-in-out hover:text-gray-400 flex items-center footer-link">
                            <svg className="w-6 h-6  mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M6.45.05h11.1V4a2.35 2.35 0 0 1-2.35 2.35H8.8A2.35 2.35 0 0 1 6.45 4V.05Zm1.5 1.5V4c0 .47.38.85.85.85h6.4c.47 0 .85-.38.85-.85V1.55h-8.1Zm-6.3.1H6.4v1.5H3.15V21.6c0 .47.38.85.85.85h16c.47 0 .85-.38.85-.85V3.15H17.6v-1.5h4.75V21.6A2.35 2.35 0 0 1 20 23.95H4a2.35 2.35 0 0 1-2.35-2.35V1.65Zm15.714 9.244-6.127 7.003L7.47 14.13l1.06-1.06 2.634 2.633 5.072-5.797 1.128.988Z" clip-rule="evenodd"></path>
                            </svg>
                            {t('footer.news')}
                    </Link>
                    </div>
                    <blockquote className="quote">
                        "You think darkness is your ally. But you merely adopted the dark. I was born in it. Formed by it."
                    </blockquote>
                    <span className="text-3xl font-bold mb-6 logo-footer">Film Reviews</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


