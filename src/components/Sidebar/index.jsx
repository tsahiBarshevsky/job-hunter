import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { MdDashboard } from 'react-icons/md';
import { IoStatsChart } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';
import { useAuth } from '../../utils/context';
import { ThemeContext } from '../../utils/themeContext';
import Menu from '../Menu';
import useStyles from './styles';
import './sidebar.sass';

// Firebase
import { signOut } from 'firebase/auth';
import { authentication } from '../../utils/firebase';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const classes = useStyles();

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
        <div className={`sidebar-container sidebar-container-${theme}`}>
            <div className="wrapper">
                <div style={{ marginBottom: 20 }}>
                    <Typography className={classes.logo}>Job</Typography>
                    <Typography className={classes.logo}>Hunter</Typography>
                </div>
                {/* {user.photoURL &&
                    <div className={`image-wrapper image-wrapper-${theme}`}>
                        <img src={user.photoURL} alt={user.displayName} className="user-image" />
                    </div>
                } */}
                <ul className="links">
                    <li
                        onClick={() => setActiveTab('tab1')}
                        className={activeTab === 'tab1' ? `link link-${theme} active active-${theme}` : `link link-${theme}`}
                    >
                        <MdDashboard className="icon" />
                        <Typography className={classes.text}>Jobs Board</Typography>
                    </li>
                    <li
                        onClick={() => setActiveTab('tab2')}
                        className={activeTab === 'tab2' ? `link link-${theme} active active-${theme}` : `link link-${theme}`}
                    >
                        <IoStatsChart className="icon" />
                        <Typography className={classes.text}>Statistics</Typography>
                    </li>
                </ul>
            </div>
            <div className="links">
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    disableRipple
                    className={`options options-${theme}`}
                >
                    <div className="wrapper">
                        <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="user-image"
                        />
                        <Typography
                            className={classes.text}
                            variant="caption"
                            noWrap
                        >
                            {user.displayName}
                        </Typography>
                    </div>
                    <IoMdSettings />
                </Button>
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
                    className={activeTab === 'tab1' ? `mobile-link mobile-link-${theme} active active-${theme}` : `mobile-link mobile-link-${theme}`}
                >
                    <MdDashboard className="mobile-icon" />
                    <Typography className={classes.text} variant="subtitle2">Jobs Board</Typography>
                </li>
                <li
                    onClick={() => setActiveTab('tab2')}
                    className={activeTab === 'tab2' ? `mobile-link mobile-link-${theme} active active-${theme}` : `mobile-link mobile-link-${theme}`}
                >
                    <IoStatsChart className="mobile-icon" />
                    <Typography className={classes.text} variant="subtitle2">Statistics</Typography>
                </li>
                <li
                    onClick={toggleTheme}
                    className={`mobile-link mobile-link-${theme}`}
                >
                    {theme === 'light' ?
                        <BsSunFill className="mobile-icon" />
                        :
                        <BsFillMoonFill className="mobile-icon" />
                    }
                    <Typography className={classes.text} variant="subtitle2">Switch Theme</Typography>
                </li>
                <li
                    onClick={onSignOut}
                    className={`mobile-link mobile-link-${theme}`}
                >
                    <FiLogOut className="mobile-icon" />
                    <Typography className={classes.text} variant="subtitle2">Sign Out</Typography>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;