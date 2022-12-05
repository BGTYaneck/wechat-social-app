import supabase from '../../supabase/supabase';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserId } from '../../supabase/auth';
import { useEffect } from 'react';
import { getProfile } from '../../supabase/profiles';
const Redirect = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const fun = async () => {
            const profile = await getProfile();
            if (profile === null) {
                navigate('/complete-profile');
                return;
            }
            navigate('/');
        };
        fun();
    }, []);
    return <h1>Redirecting...</h1>;
};
export default Redirect;
