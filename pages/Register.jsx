import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/RegisterLogin.css';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Register = () => {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [pass, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [passError, setPassError] = useState('');
    const history = useNavigate();

    const MySwal = withReactContent(Swal)


    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        if (value.length < 1 || value.length > 50) {
            setNameError('Nickname must contain 1 to 50 characters');
        } else {
            setNameError('');
        }
    };

    const handleLoginChange = (e) => {
        const value = e.target.value;
        setLogin(value);
        if (value.length < 1 || value.length > 50) {
            setLoginError('Login must contain 1 to 50 characters');
        } else {
            setLoginError('');
        }
    };

    const handlePassChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (value.length < 1 || value.length > 50) {
            setPassError('Password must contain 1 to 50 characters');
        } else {
            setPassError('');
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !login || nameError || loginError || passError) {
        return;
    }

    try {
        const checkLoginResponse = await fetch(
            'http://hellafragilesite.com/film-reviews-api/api-check-login.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login }),
            }
        );

        if (checkLoginResponse.ok) {
            const { isLoginUnique } = await checkLoginResponse.json();

            if (isLoginUnique) {
                const registerResponse = await fetch(
                    'http://hellafragilesite.com/film-reviews-api/api-register.php',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name, login, pass }),
                    }
                );

                if (registerResponse.ok) {
                    const secondTableResponse = await fetch(
                        'http://hellafragilesite.com/film-reviews-api/api-register-top5.php',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                login,
                                name,
                            }),
                        }
                    );

                    if (secondTableResponse.ok) {
                        console.log('Данные успешно добавлены в обе таблицы');
                        setName('');
                        setLogin('');
                        setPassword('');
                        history(`/login`);
                    } else {
                        console.log('Ошибка при добавлении данных во вторую таблицу');
                    }
                } else {
                    console.log('Ошибка при добавлении данных в первую таблицу');
                }
            } else {
                alert('User already exist'); 
            }
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Sorry!',
                text: 'Login already exist!',
                timer: "2000",
                showConfirmButton: false,

            });
        }
    } catch (error) {
        console.log('Ошибка:', error);
        history(`/login`);
    }
};


    return (
        <motion.div
            className="login-container"
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
            <form onSubmit={handleSubmit} className="bg-zinc-800 p-12 rounded-lg shadow-lg text-white w-full mt-28 register-form">
                <h2 className="text-4xl font-bold mb-8">Register</h2>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-4">Nickname</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your nickname"
                        className="w-full px-6 py-3 rounded-lg bg-zinc-700 text-white"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                    {nameError && <div className="error">{nameError}</div>}
                </div>
                <div className="mb-6">
                    <label htmlFor="login" className="block mb-4">Login</label>
                    <input
                        type="text"
                        id="login"
                        placeholder="Enter your login"
                        className="w-full px-6 py-3 rounded-lg bg-zinc-700 text-white"
                        value={login}
                        onChange={handleLoginChange}
                        required
                    />
                    {loginError && <div className="error">{loginError}</div>}
                </div>
                <div className="mb-8">
                    <label htmlFor="pass" className="block mb-4">Password</label>
                    <input
                        type="password"
                        id="pass"
                        placeholder="Enter your password"
                        className="w-full px-6 py-3 rounded-lg bg-zinc-700 text-white"
                        value={pass}
                        onChange={handlePassChange}
                        required
                    />
                    {passError && <div className="error">{passError}</div>}
                </div>
                <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-lg mb-4">Register</button>
                <Link to="/login" className='redir-link'>Sign In</Link>
            </form>

        </motion.div>
    );
};

export default Register;
