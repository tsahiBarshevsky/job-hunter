import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { DashboardPage, LoginPage } from '../pages';
import { AuthProvider } from '../utils/context';
import { ThemeContext } from '../utils/themeContext';
import './App.sass';

export const App = () => {
    const { theme } = useContext(ThemeContext);
    const darkTheme = createTheme({
        palette: {
            mode: theme,
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <AuthProvider>
                                <LoginPage />
                            </AuthProvider>
                        }
                    />
                    <Route
                        exact
                        path="/dashboard"
                        element={
                            <AuthProvider>
                                <DashboardPage />
                            </AuthProvider>
                        }
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    )
}
