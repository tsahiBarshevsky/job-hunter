import React, { useContext } from 'react';
import moment from 'moment';
import { Typography, Checkbox, Chip, FormControlLabel } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { FiTrash } from 'react-icons/fi';
import { ThemeContext } from '../../utils/themeContext';
import './activityCard.sass';
import clsx from 'clsx';
import { categories } from '../../utils/constants';

const useStyles = makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`,
            lineHeight: 1.2,
            textAlign: 'start'
        }
    },
    title: {
        '&&': {
            marginRight: 10
        }
    },
    chip: {
        '&&': {
            color: 'white',
            textTransform: 'capitalize',
            fontFamily: `'Poppins', sans-serif`
        }
    }
}));

const ActivityCard = ({ index, activity, handleCompletedChange, onRemoveActivity }) => {
    const { theme } = useContext(ThemeContext);
    const classes = useStyles();

    return (
        <div className={`activity-card-container activity-card-container-${theme}`}>
            <div className="activity-card-header">
                <div className="type">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={activity.completed}
                                onClick={() => handleCompletedChange(activity.title, index, !activity.completed)}
                                style={{ color: theme === 'light' ? "#1d5692" : "#ffffff" }}
                                disableRipple
                                sx={{ marginRight: -2 }}
                            />
                        }
                    />
                    <Chip
                        label={categories[activity.category].category}
                        variant="filled"
                        className={classes.chip}
                        style={{ backgroundColor: categories[activity.category].color }}
                    />
                </div>
                <button
                    onClick={() => onRemoveActivity(index)}
                    className={`icon-button icon-button-${theme}`}
                >
                    <FiTrash />
                </button>
            </div>
            <div className="activity-card-content">
                <Typography
                    className={classes.text}
                    variant="subtitle1"
                    gutterBottom
                >
                    {activity.title}
                </Typography>
                <div className="date">
                    <Typography className={clsx(classes.text, classes.title)} variant="body2">
                        Start date:
                    </Typography>
                    {Object.keys(activity.startDate).length === 0 ?
                        <Typography className={classes.text} color="textSecondary" variant="caption">
                            {moment(activity.startDate).format('DD/MM/YYYY HH:mm')}
                        </Typography>
                        :
                        <Typography className={classes.text} color="textSecondary" variant="caption">
                            {moment.unix(activity.startDate.seconds).format('DD/MM/YYYY HH:mm')}
                        </Typography>
                    }
                </div>
                {activity.endDate &&
                    <div className="date">
                        <Typography className={clsx(classes.text, classes.title)} variant="body2">
                            End date:
                        </Typography>
                        {Object.keys(activity.endDate).length === 0 ?
                            <Typography className={classes.text} color="textSecondary" variant="caption">
                                {moment(activity.endDate).format('DD/MM/YYYY HH:mm')}
                            </Typography>
                            :
                            <Typography className={classes.text} color="textSecondary" variant="caption">
                                {moment.unix(activity.endDate.seconds).format('DD/MM/YYYY HH:mm')}
                            </Typography>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default ActivityCard;