import React, { useEffect } from 'react';
import '../styles/ScrollButton.css';

const ScrollButton = () => {
    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };

        const scrollToBottom = () => {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
        };

        return () => {
            window.removeEventListener('scroll', scrollToTop);
            window.removeEventListener('scroll', scrollToBottom);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleScrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    return (
        <div className="scroll-button-container">
            <button className="scroll-button" onClick={handleScrollToTop}>
                <span className="scroll-button-icon">↑</span>
            </button>
            <button className="scroll-button" onClick={handleScrollToBottom}>
                <span className="scroll-button-icon">↓</span>
            </button>
        </div>
    );
};

export default ScrollButton;
