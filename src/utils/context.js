import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authentication } from './firebase';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        authentication.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });
    }, [user, navigate]);

    const value = { user };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}