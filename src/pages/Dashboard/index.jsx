import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/context';

const DashbaordPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
    }, [navigate, user]);

    return user && (
        <div>{user.displayName}</div>
    )
}

export default DashbaordPage;