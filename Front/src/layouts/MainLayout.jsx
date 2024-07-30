import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../AuthContext'; 

const MainLayout = () => {
    const { isLoggedIn, setIsLoggedIn, checkAuthStatus } = useAuth();

    return (
        <>
            <Navbar 
                isLoggedIn={isLoggedIn} 
                setIsLoggedIn={setIsLoggedIn} 
                checkAuthStatus={checkAuthStatus} 
            />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;