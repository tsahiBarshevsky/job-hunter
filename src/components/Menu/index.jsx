import React, { useContext } from 'react';
import { Menu as MuiMenu } from '@mui/material';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import NightlightRoundedIcon from '@mui/icons-material/NightlightRounded';
import { ThemeContext } from '../../utils/themeContext';

const Menu = ({ open, anchorEl, onSignOut, handleClose }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <MuiMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        >
            <MenuList>
                <MenuItem onClick={onSignOut}>
                    <ListItemText>Sign Out</ListItemText>
                    <ListItemIcon>
                        <LogoutRoundedIcon fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
                <MenuItem onClick={toggleTheme}>
                    <ListItemText>Switch Theme</ListItemText>
                    <ListItemIcon>
                        {theme === 'light' ?
                            <WbSunnyRoundedIcon fontSize="small" />
                            :
                            <NightlightRoundedIcon fontSize="small" />
                        }
                    </ListItemIcon>
                </MenuItem>
            </MenuList>
        </MuiMenu>
    )
}

export default Menu;