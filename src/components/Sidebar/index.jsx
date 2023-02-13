import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { toast } from 'react-toastify';
import { CSVLink } from "react-csv";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button } from '@mui/material';
import { MdDashboard } from 'react-icons/md';
import { IoStatsChart } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { useAuth } from '../../utils/context';
import { ThemeContext } from '../../utils/themeContext';
import { headers } from '../../utils/constants';
import { resetJobs } from '../../store/actions/jobs';
import { resetStats } from '../../store/actions/stats';
import Menu from '../Menu';
import useStyles from './styles';
import './sidebar.sass';

// Firebase
import { signOut } from 'firebase/auth';
import { authentication } from '../../utils/firebase';

const Sidebar = ({ activeTab, setActiveTab, displayName }) => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const stats = useSelector(state => state.stats);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();
    const dispatch = useDispatch();

    const csvReport = {
        data: stats.map(row => ({
            ...row,
            created: Object.keys(row.created).length === 0 ?
                moment(row.created).format('DD/MM/YYYY HH:mm')
                :
                moment.unix(row.created.seconds).format("DD/MM/YYYY HH:mm")
        })),
        headers: headers,
        filename: user && location.pathname !== '/demo' ? `${user.email} jobs.csv` : 'demo user jobs.csv'
    };

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
            .then(() => {
                dispatch(resetJobs());
                dispatch(resetStats());
            })
            .catch((error) => {
                console.log(error.message);
                toast.error('An unexpected error occurred');
            });
    }

    return (
        <div className={`sidebar-container sidebar-container-${theme}`}>
            <div className="wrapper">
                {location.pathname !== '/demo' ?
                    <div className="logo">
                        <Typography className={classes.logo}>Job</Typography>
                        <Typography className={classes.logo}>Hunter</Typography>
                    </div>
                    :
                    <Link to="/" className="logo link">
                        <Typography className={classes.logo}>Job</Typography>
                        <Typography className={classes.logo}>Hunter</Typography>
                    </Link>
                }
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
                        <Typography className={classes.text}>Metrics</Typography>
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
                    className={
                        location.pathname !== '/demo' ?
                            `options options-${theme} ${user.displayName || displayName ? `display-name` : `email`}`
                            :
                            `options options-${theme} display-name`
                    }
                >
                    {location.pathname === '/demo' ?
                        <div className="wrapper">
                            <div className={`user-avatar user-avatar-${theme}`}>
                                <img
                                    src={require('../../assets/demo-avatar.png')}
                                    alt="demo avatar"
                                    className="demo-image"
                                />
                            </div>
                            <Typography
                                className={classes.text}
                                variant="caption"
                                noWrap
                            >
                                {displayName}
                            </Typography>
                        </div>
                        :
                        <div className="wrapper">
                            {user.photoURL ?
                                <img
                                    src={user.photoURL}
                                    alt={user.displayName}
                                    className="user-image"
                                />
                                :
                                <div className={`user-avatar user-avatar-${theme}`}>
                                    <BiUser className="icon" />
                                </div>
                            }
                            {!displayName ?
                                <Typography
                                    className={classes.text}
                                    variant="caption"
                                    noWrap
                                >
                                    {user.displayName ? user.displayName : user.email}
                                </Typography>
                                :
                                <Typography
                                    className={classes.text}
                                    variant="caption"
                                    noWrap
                                >
                                    {displayName}
                                </Typography>
                            }
                        </div>
                    }
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
                    <Typography className={clsx(classes.text, classes.mobileText)} variant="caption">Jobs Board</Typography>
                </li>
                <li
                    onClick={() => setActiveTab('tab2')}
                    className={activeTab === 'tab2' ? `mobile-link mobile-link-${theme} active active-${theme}` : `mobile-link mobile-link-${theme}`}
                >
                    <IoStatsChart className="mobile-icon" />
                    <Typography className={clsx(classes.text, classes.mobileText)} variant="caption">Metrics</Typography>
                </li>
                <li className={`mobile-link mobile-link-${theme}`}>
                    <CSVLink {...csvReport} className={`csv-button csv-button-${theme}`}>
                        <AiOutlineCloudDownload id="cloud" />
                        <Typography className={clsx(classes.text, classes.mobileText)} variant="caption">Download Data</Typography>
                    </CSVLink>
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
                    <Typography className={clsx(classes.text, classes.mobileText)} variant="caption">Switch Theme</Typography>
                </li>
                {location.pathname !== '/demo' &&
                    <li
                        onClick={onSignOut}
                        className={`mobile-link mobile-link-${theme}`}
                    >
                        <FiLogOut className="mobile-icon" />
                        <Typography className={clsx(classes.text, classes.mobileText)} variant="caption">Sign Out</Typography>
                    </li>
                }
            </ul>
        </div>
    )
}

export default Sidebar;