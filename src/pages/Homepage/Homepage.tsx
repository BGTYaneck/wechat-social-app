import React, { useEffect } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import { getCurrentUserId } from '../../supabase/auth';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        getCurrentUserId().then((value) => {
            if (!value) navigate('/login');
        });
    }, []);

    return (
        <>
            <Navigation />
        </>
    );
};

export default Homepage;
