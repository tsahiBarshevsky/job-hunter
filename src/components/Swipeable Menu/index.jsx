import React, { useContext } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Box, Typography, SwipeableDrawer, ListItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CSVLink } from "react-csv";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdDashboard } from 'react-icons/md';
import { IoStatsChart } from 'react-icons/io5';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import { resetJobs } from '../../store/actions/jobs';
import { resetStats } from '../../store/actions/stats';
import { headers } from '../../utils/constants';
import { useAuth } from '../../utils/context';
import { ThemeContext } from '../../utils/themeContext';
import './swipeableMenu.sass'

// Firebase
import { signOut } from 'firebase/auth';
import { authentication } from '../../utils/firebase';

const useStyles = makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`
        }
    },
    logo: {
        '&&': {
            fontFamily: `'Ephesis', sans-serif`,
            userSelect: 'none',
            lineHeight: 1,
            fontSize: 40,
            fontWeight: 'bold',
            letterSpacing: 1,
            textAlign: 'center'
        }
    },
    drawerLight: {
        '&&': {
            backgroundColor: '#d9dbe2'
        }
    },
    drawerDark: {
        '&&': {
            backgroundColor: '#0f0f0f'
        }
    }
}));

const SwipeableMenu = ({ open, toggleDrawer, activeTab, setActiveTab, displayName }) => {
    console.log('displayName', displayName)
    const { user } = useAuth();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const stats = useSelector(state => state.stats);

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

    const onSignOut = () => {
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
        <SwipeableDrawer
            anchor="left"
            open={open}
            onClose={() => toggleDrawer(false)}
            onOpen={() => toggleDrawer(true)}
            style={{ touchAction: 'none' }}
            classes={{
                paper: theme === "light" ? classes.drawerLight : classes.drawerDark
            }}
        >
            <Box
                sx={{ width: 240 }}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="space-between"
                paddingTop={3}
                minHeight="100vh"
                role="presentation"
            >
                <div className="main-wrapper">
                    {location.pathname !== '/demo' ?
                        <div className="logo">
                            <Typography className={classes.logo}>Job</Typography>
                            <Typography className={classes.logo}>Hunter</Typography>
                        </div>
                        :
                        <Link to="/" className="logo logo-link">
                            <Typography className={classes.logo}>Job</Typography>
                            <Typography className={classes.logo}>Hunter</Typography>
                        </Link>
                    }
                    <ListItem
                        onClick={() => {
                            setActiveTab('tab1');
                            toggleDrawer(false);
                        }}
                        className={activeTab === 'tab1' ? `link link-${theme} active active-${theme}` : `link link-${theme}`}
                    >
                        <MdDashboard className="icon" />
                        <Typography className={classes.text}>Jobs Board</Typography>
                    </ListItem>
                    <ListItem
                        onClick={() => {
                            setActiveTab('tab2');
                            toggleDrawer(false);
                        }}
                        className={activeTab === 'tab2' ? `link link-${theme} active active-${theme}` : `link link-${theme}`}
                    >
                        <IoStatsChart className="icon" />
                        <Typography className={classes.text}>Metrics</Typography>
                    </ListItem>
                    <ListItem className="link">
                        <CSVLink {...csvReport} className={`csv-button csv-button-${theme}`}>
                            <AiOutlineCloudDownload id="cloud" />
                            <Typography className={classes.text}>Download Data</Typography>
                        </CSVLink>
                    </ListItem>
                    <ListItem
                        onClick={toggleTheme}
                        className="link"
                    >
                        {theme === 'light' ?
                            <BsSunFill className="icon" />
                            :
                            <BsFillMoonFill className="icon" />
                        }
                        <Typography className={classes.text}>Switch Theme</Typography>
                    </ListItem>
                    {location.pathname !== '/demo' &&
                        <ListItem
                            onClick={() => {
                                onSignOut();
                                toggleDrawer(false);
                            }}
                            className="link"
                        >
                            <FiLogOut className="icon" />
                            <Typography className={classes.text}>Sign Out</Typography>
                        </ListItem>
                    }
                </div>
                {location.pathname === '/demo' ?
                    <div
                        className={
                            location.pathname !== '/demo' ?
                                `user-wrapper user-wrapper-${theme} ${user.displayName || displayName ? `display-name` : `email`}`
                                :
                                `user-wrapper user-wrapper-${theme} display-name`
                        }
                    >
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
                    </div>
                    :
                    <div
                        className={
                            location.pathname !== '/demo' ?
                                `user-wrapper user-wrapper-${theme} ${user.displayName || displayName ? `display-name` : `email`}`
                                :
                                `user-wrapper user-wrapper-${theme} display-name`
                        }
                    >
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
                    </div>
                }
            </Box>
        </SwipeableDrawer>
    )
}

export default SwipeableMenu;