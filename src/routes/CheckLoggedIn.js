// checkLoggedIn.js

// Import dependencies
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet ,useNavigate } from 'react-router-dom';

// Middleware function to check if the user is logged in
const CheckLoggedIn = (props) => {
    const navigate = useNavigate();
    // Get the user state from Redux store
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            navigate('/authentication/sign-in');
        }
    }, [user, navigate]);

    // This component doesn't render anything, so return null
    return (
        <>
            {props.children}
            <Outlet />
        </>
    )

};

// Export the middleware function
export default CheckLoggedIn;
