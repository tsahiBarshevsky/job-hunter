import React, { useState, useEffect, createContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const getThemeFromStorage = () => {
        const item = JSON.parse(localStorage.getItem('@theme'));
        return item !== null ? item : 'light';
    }

    const setThemeAtStorage = (theme) => {
        localStorage.setItem('@theme', JSON.stringify(theme));
    }

    useEffect(() => {
        const res = getThemeFromStorage();
        setTheme(res);
    }, []);

    const toggleTheme = async () => {
        if (theme === 'light') {
            setTheme('dark');
            setThemeAtStorage('dark');
        }
        else {
            setTheme('light');
            setThemeAtStorage('light');
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}