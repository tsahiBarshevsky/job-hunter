import React, { useContext } from 'react';
import { Menu as MuiMenu, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import NightlightRoundedIcon from '@mui/icons-material/NightlightRounded';
import { ThemeContext } from '../../utils/themeContext';

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
    const { theme, toggleTheme } = useContext(ThemeContext);
    const classes = useStyles();

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
                    transform: 'translateY(-50%)'
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