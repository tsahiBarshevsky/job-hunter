import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { DashboardPage, DemoPage, HomePage, NotFound } from '../pages';
import { AuthProvider } from '../utils/context';
import { ThemeContext } from '../utils/themeContext';
import 'react-toastify/dist/ReactToastify.css';
import './App.sass';

export const App = () => {
    const { theme } = useContext(ThemeContext);
    const appTheme = createTheme({
        palette: {
            mode: theme
        }
    });

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <AuthProvider>
                                <HomePage />
                            </AuthProvider>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <AuthProvider>
                                <DashboardPage />
                            </AuthProvider>
                        }
                    />
                    <Route
                        path="/demo"
                        element={
                            <AuthProvider>
                                <DemoPage />
                            </AuthProvider>
                        }
                    />
                    <Route
                        path="*"
                        element={<NotFound />}
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    )
}
