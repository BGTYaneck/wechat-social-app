import React, { useEffect } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import { getCurrentUserId } from '../../supabase/auth';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../../components/Profile/UserProfile';

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
            <div style={{ marginTop: '4rem' }}></div>
        </>
    );
};

export default Homepage;
