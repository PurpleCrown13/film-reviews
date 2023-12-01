import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const ErrorLog = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            className='ErrorLog'
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            
        >
            <Helmet>
                <title>
                    Error
                </title>
            </Helmet>
            <h1>Error.</h1>
            <img src={'./error.jpg'} />
        </motion.div>
    );
}

export default ErrorLog;