import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { ThemeContext } from '../../utils/themeContext';
import useStyles from './styles';
import './statBox.sass'

const StatBox = ({ title, subtitle, value, image, withSpace }) => {
    const { theme } = useContext(ThemeContext);
    const classes = useStyles();

    return (
        <div
            className={withSpace ?
                `stat-box-container stat-box-container-${theme} space`
                :
                `stat-box-container stat-box-container-${theme}`
            }
        >
            <div className="content">
                <Typography className={classes.text} variant="subtitle2">{title}</Typography>
                <div className="content-absolute">
                    <Typography className={classes.text} variant="h5">{value}</Typography>
                    <Typography className={classes.text} variant="caption">{subtitle}</Typography>
                </div>
            </div>
            <div className="image-container">
                <img src={image} alt="Stat1" title="Icons made by Freepik from Flaticon" />
            </div>
        </div>
    )
}

export default StatBox;