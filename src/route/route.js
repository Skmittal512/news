import React from 'react'

import { Outlet, Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";


import BlogsPage from '../pages/BlogsPage/BlogsPage';
import BlogDetails from '../pages/BlogsPage/BlogDetails';






const AppRoutes = () => {
    return (
        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
    )
}

export default AppRoutes;
