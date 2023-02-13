import React, { useContext, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../utils/themeContext';
import useStyles from './styles.js';
import './notFound.sass';

const NotFound = () => {
    const { theme } = useContext(ThemeContext);
    const classes = useStyles();

    useEffect(() => {
        document.title = `Job Hunter | Page not found`;
    }, []);

    return (
        <div className={`not-found-page-container not-found-page-container-${theme}`}>
            <Typography className={classes.title} variant="h1">Job Hunter</Typography>
            <Typography className={classes.text}>Oopsy... Page not found</Typography>
            <Typography className={classes.text}>We suggest you go to homepage while we fixing the problem.</Typography>
            <Button
                component={Link}
                variant="contained"
                className={classes.button}
                to="/"
            >
                Go to homepage
            </Button>
        </div>
    )
}

export default NotFound;