import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashbaordPage, LoginPage } from '../pages';
import { AuthProvider } from '../utils/context';
import './App.sass';

export const App = () => {
    return (
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
                            <DashbaordPage />
                        </AuthProvider>
                    }
                />
            </Routes>
        </Router>
    )
}
