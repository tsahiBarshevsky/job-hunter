import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Typography, IconButton } from '@mui/material';
import { BiUser } from 'react-icons/bi';
import { HiOutlineMenu } from 'react-icons/hi';
import { useAuth } from '../../utils/context';
import { ThemeContext } from '../../utils/themeContext';
import './mobileHeader.sass';

const useStyles = makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`
        }
    }
}));

const MobileHeader = ({ tab, toggleDrawer }) => {
    const { user } = useAuth();
    const { theme } = useContext(ThemeContext);
    const location = useLocation();
    const classes = useStyles();

    return (
        <div className={`mobile-header-container mobile-header-container-${theme}`}>
            <IconButton size="small" onClick={() => toggleDrawer(true)}>
                <HiOutlineMenu />
            </IconButton>
            <Typography className={classes.text}>{tab}</Typography>
            {location.pathname === '/demo' ?
                <div className={`user-avatar user-avatar-${theme}`}>
                    <img
                        src={require('../../assets/demo-avatar.png')}
                        alt="demo avatar"
                        className="demo-image"
                    />
                </div>
                :
                user.photoURL ?
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
        </div>
    )
}

export default MobileHeader;