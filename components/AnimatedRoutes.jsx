import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from "../pages/Home";
import Cabinet from "../pages/Cabinet";
import Edit from "../pages/Edit";
import AddMovie from "../pages/AddMovie";
import Best from "../pages/Best";
import Plannes from "../pages/Plannes";
import Franchise from "../pages/Franchise";
import AddNews from "../pages/AddNews";
import News from "../pages/News";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ErrorLog from "../pages/ErrorLog";
import MovieCardDetailed from "../pages/MovieCardDetailed";
import FranchiseDetailed from "../pages/FranchiseDetailed";
import { AnimatePresence } from "framer-motion";
import CabinetDetailed from "../pages/CabinetDetailed";
import Top5Settings from "../pages/Top5Settings";


const AnimatedRoutes = () => {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <AnimatePresence mode="wait"> 
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/movies/:id" element={<MovieCardDetailed />} />
                <Route path="/cabinet" element={<Cabinet />} />
                <Route path="/movies/:id/edit" element={<Edit />} />
                <Route path="/add" element={<AddMovie />} />
                <Route path="/best" element={<Best />} />
                <Route path="/plannes" element={<Plannes />} />
                <Route path="/franchise" element={<Franchise />} />
                <Route path="/franchise/:franchise" element={<FranchiseDetailed />} />
                <Route path="/news" element={<News />} />
                <Route path="/add-news" element={<AddNews />} />
                <Route path="/*" element={<ErrorLog />} />
                <Route path="/profile/:username" element={<CabinetDetailed />} />
                <Route path="/top5-settings/:login" element={<Top5Settings />} />
            </Routes>
        </AnimatePresence>  
    );
}

export default AnimatedRoutes;