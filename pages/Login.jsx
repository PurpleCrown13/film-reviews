import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/RegisterLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const Login = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        const logoutMessage = localStorage.getItem('logoutMessage');
        if (logoutMessage) {
            toast.success(logoutMessage, {
                style: {
                    borderRadius: '50px',
                    background: '#121212',
                    color: '#fff',
                },
            });
            localStorage.removeItem('logoutMessage');
        }
    }, []);
    
    const history = useNavigate();
    const [login, setLogin] = useState('');
    const [pass, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://hellafragilesite.com/film-reviews-api/api-login.php', {
                login,
                pass
            });


            if (response.status === 200) {
                const name = response.data.name;
                localStorage.setItem('login', login);
                localStorage.setItem('name', name); 
                history('/cabinet');
            } else {
                console.log('Login failed');
            }

        } catch (error) {
            if (error.response) {
                console.log('Error occurred during login:', error.response.data);
            } else if (error.data) {
                console.log('Error occurred during login:', error.data);
            } else {
                console.log('Error occurred during login:', error.message);
            }
        }

    };


    return (
                
     <div><Toaster  />
        <motion.div className="login-container"
            initial={{
                scale: 0.3,
            }}
            animate={{
                scale: 0.9,
            }}
            transition={{
                delay: 0.2,
            }}
        >
            

            <form className="bg-zinc-800 p-12 rounded-lg shadow-lg text-white w-full mt-28" onSubmit={handleLogin}>
                <h2 className="text-4xl font-bold mb-8">Sign In</h2>
                <div className="mb-6">
                    <label htmlFor="username" className="block mb-4">Login</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your login"
                        className="w-full px-6 py-3 rounded-lg bg-zinc-700 text-white"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </div>

                <div className="mb-8">
                    <label htmlFor="password" className="block mb-4">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="w-full px-6 py-3 rounded-lg bg-zinc-700 text-white"
                        value={pass}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg mb-4">Sign In</button>
                <Link to="/register" className='redir-link'>Registration</Link>
            </form>
            

            </motion.div>
        </div>
    );
};

export default Login;
