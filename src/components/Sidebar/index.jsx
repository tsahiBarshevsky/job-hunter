import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, Button } from '@mui/material';
import { MdDashboard } from 'react-icons/md';
import { IoStatsChart } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';
import { BiUser } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { GoListUnordered } from 'react-icons/go';
import { useAuth } from '../../utils/context';
import { ThemeContext } from '../../utils/themeContext';
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
    const { theme } = useContext(ThemeContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();
    const dispatch = useDispatch();

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
                    <li
                        onClick={() => setActiveTab('tab3')}
                        className={activeTab === 'tab3' ? `link link-${theme} active active-${theme}` : `link link-${theme}`}
                    >
                        <FiUsers className="icon" />
                        <Typography className={classes.text}>Contacts</Typography>
                    </li>
                    <li
                        onClick={() => setActiveTab('tab4')}
                        className={activeTab === 'tab4' ? `link link-${theme} active active-${theme}` : `link link-${theme}`}
                    >
                        <GoListUnordered className="icon" />
                        <Typography className={classes.text}>Activities</Typography>
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
        </div>
    )
}

export default Sidebar;