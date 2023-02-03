import React from 'react';
import { Typography } from '@mui/material';
import './statBox.sass'

const StatBox = ({ title, subtitle, value, image }) => {
    return (
        <div className="stat-box-container">
            <div className="content">
                <Typography variant="subtitle2">{title}</Typography>
                <div className="content-absolute">
                    <Typography variant="h5">{value}</Typography>
                    <Typography variant="caption">{subtitle}</Typography>
                </div>
            </div>
            <div className="image-container">
                <img src={image} alt="Stat1" title="Icons made by Freepik from Flaticon" />
            </div>
        </div>
    )
}

export default StatBox;