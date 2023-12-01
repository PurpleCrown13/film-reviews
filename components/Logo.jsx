import React from 'react';
import '../styles/Logo.css';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className='logo'>
            <Link to="/" className='logo-text'>&nbsp; Film  &nbsp; Reviews &nbsp;</Link>
        </div>
    );
};

export default Logo;