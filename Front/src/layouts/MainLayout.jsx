import { Outlet } from 'react-router-dom'
import React from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';


const MainLaout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )

}

export default MainLaout;