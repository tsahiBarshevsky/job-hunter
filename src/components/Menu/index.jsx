import React, { useContext } from 'react';
import moment from 'moment';
import { CSVLink } from "react-csv";
import { useSelector } from 'react-redux';
import { Menu as MuiMenu, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import NightlightRoundedIcon from '@mui/icons-material/NightlightRounded';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { ThemeContext } from '../../utils/themeContext';
import { useAuth } from '../../utils/context';
import { headers } from '../../utils/constants';
import './menu.sass';

const useStyles = makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`,
        }
    },
    item: {
        '&&': {
            backgroundColor: 'transparent'
        }
    }
}));

const Menu = ({ open, anchorEl, onSignOut, handleClose }) => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const stats = useSelector(state => state.stats);
    const classes = useStyles();

    const csvReport = {
        data: stats.map(row => ({ ...row, created: moment.unix(row.created.seconds).format("DD/MM/YYYY HH:mm") })),
        headers: headers,
        filename: `${user.email} jobs.csv`
    };

    return (
        <MuiMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            PaperProps={{
                style: {
                    width: 185,
                    borderRadius: 10,
                    transform: 'translateY(-35%)'
                }
            }}
        >
            <MenuItem onClick={onSignOut}>
                <ListItemText
                    primary={
                        <Typography
                            className={classes.text}
                            variant="body2"
                        >
                            Sign Out
                        </Typography>
                    }
                />
                <ListItemIcon sx={{ justifyContent: 'right' }}>
                    <LogoutRoundedIcon fontSize="small" />
                </ListItemIcon>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <CSVLink {...csvReport} className={`csv-button csv-button-${theme}`}>
                    <Typography
                        className={classes.text}
                        variant="body2"
                    >
                        Download Data
                    </Typography>
                    <CloudDownloadOutlinedIcon
                        fontSize="small"
                        className={`icon-${theme}`}
                    />
                </CSVLink>
            </MenuItem>
            <MenuItem onClick={toggleTheme} autoFocus={false}>
                <ListItemText
                    primary={
                        <Typography
                            className={classes.text}
                            variant="body2"
                        >
                            Switch Theme
                        </Typography>
                    }
                />
                <ListItemIcon sx={{ justifyContent: 'right' }}>
                    {theme === 'light' ?
                        <WbSunnyRoundedIcon fontSize="small" />
                        :
                        <NightlightRoundedIcon fontSize="small" />
                    }
                </ListItemIcon>
            </MenuItem>
        </MuiMenu>
    )
}

export default Menu;