import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { MdDashboard } from 'react-icons/md';
import { IoStatsChart } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';
import { useAuth } from '../../utils/context';
import { ThemeContext } from '../../utils/themeContext';
import './sidebar.sass';

// Firebase
import { signOut } from 'firebase/auth';
import { authentication } from '../../utils/firebase';
import Menu from '../Menu';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const onSignOut = () => {
        handleClose();
        signOut(authentication)
            .then(() => navigate('/'))
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <div className="sidebar-container">
            <ul className="links">
                <li
                    onClick={() => setActiveTab('tab1')}
                    className={activeTab === 'tab1' ? "link active" : "link"}
                >
                    <MdDashboard className="icon" />
                    <Typography>Jobs Board</Typography>
                </li>
                <li
                    onClick={() => setActiveTab('tab2')}
                    className={activeTab === 'tab2' ? "link active" : "link"}
                >
                    <IoStatsChart className="icon" />
                    <Typography>Statistics</Typography>
                </li>
            </ul>
            <div
                className="user"
                onClick={handleClick}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <img src={user.photoURL} alt={user.displayName} className="user-image" />
                <Typography variant="caption">{user.displayName}</Typography>
            </div>
            <Menu
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                onSignOut={onSignOut}
            />
            <ul className="mobile-links">
                <li
                    onClick={() => setActiveTab('tab1')}
                    className={activeTab === 'tab1' ? "mobile-link active" : "mobile-link"}
                >
                    <MdDashboard className="mobile-icon" />
                    <Typography>Jobs Board</Typography>
                </li>
                <li
                    onClick={() => setActiveTab('tab2')}
                    className={activeTab === 'tab2' ? "mobile-link active" : "mobile-link"}
                >
                    <IoStatsChart className="mobile-icon" />
                    <Typography>Statistics</Typography>
                </li>
                <li
                    onClick={toggleTheme}
                    className="mobile-link"
                >
                    {theme === 'light' ?
                        <BsSunFill className="mobile-icon" />
                        :
                        <BsFillMoonFill className="mobile-icon" />
                    }
                    <Typography>Switch Theme</Typography>
                </li>
                <li
                    onClick={onSignOut}
                    className="mobile-link"
                >
                    <FiLogOut className="mobile-icon" />
                    <Typography>Sign Out</Typography>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;