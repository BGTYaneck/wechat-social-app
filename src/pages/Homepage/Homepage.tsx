import React from 'react';
import Navigation from '../../components/Navigation/Navigation';
import { getCurrentUserId } from '../../supabase/auth';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();
    getCurrentUserId().then((value) => {
        if (!value) navigate('/login');
    });

    return (
        <>
            <Navigation />
        </>
    );
};

export default Homepage;
