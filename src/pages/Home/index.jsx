import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../utils/themeContext';
import { Login, Registration, Switch } from '../../components';
import { useAuth } from '../../utils/context';
import './homepage.sass';

const HomePage = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [mode, setMode] = useState('login');
    const navigate = useNavigate();

    const toggleMode = (mode) => {
        setMode(mode);
    }

    useEffect(() => {
        document.title = `Job Hunter`;
        if (user)
            navigate('/dashboard');
    }, [user, navigate]);

    return (
        <>
            <div className={`homepage-container homepage-container-${theme}`}>
                <div className="switch">
                    <Switch
                        sx={{ m: 1 }}
                        onChange={toggleTheme}
                        checked={theme === 'light' ? false : true}
                    />
                </div>
                {mode === 'login' ?
                    <Login toggleMode={toggleMode} />
                    :
                    <Registration toggleMode={toggleMode} />
                }
            </div>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme}
            />
        </>
    )
}

export default HomePage;