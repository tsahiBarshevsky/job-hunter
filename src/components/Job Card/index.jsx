import React, { useContext } from 'react';
import moment from 'moment/moment';
import clsx from 'clsx';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { AiOutlineLink } from 'react-icons/ai';
import { FiTrash, FiClock } from 'react-icons/fi';
import { ThemeContext } from '../../utils/themeContext';
import useStyles from './styles';
import './jobCard.sass';

const JobCard = ({ job, setJob, provided, onOpenJob, index, setOpenAlertDialog, setOrigin }) => {
    const { theme } = useContext(ThemeContext);
    const jobs = useSelector(state => state.jobs);
    const length = jobs[job.status].items.length;
    const classes = useStyles();

    const onRemoveJob = async (event) => {
        event.stopPropagation();
        setJob(job);
        setOrigin('card');
        setOpenAlertDialog(true);
    }

    const onOpenLink = (event) => {
        event.stopPropagation();
        window.open(job.url);
    }

    const renderTimePassed = () => {
        var duration = null;
        if (Object.keys(job.created).length === 0)
            duration = moment.duration(moment().diff(moment(job.created)));
        else
            duration = moment.duration(moment().diff(moment.unix(job.created.seconds)));
        if (duration.asSeconds() === 0)
            return 'Now';
        if (duration.asSeconds() < 60)
            return `${Math.floor(duration.asSeconds())} sec`;
        if (duration.asMinutes() < 60)
            return `${Math.floor(duration.asMinutes())}m`;
        if (duration.asHours() < 24)
            return `${Math.floor(duration.asHours())}h`;
        if (duration.asDays() < 7)
            return `${Math.ceil(duration.asDays())}d`;
        if (duration.asWeeks() < 4)
            return `${Math.floor(duration.asWeeks())}w`;
        if (duration.asMonths() < 12)
            return `${Math.floor(duration.asMonths())} mon`;
        return `${Math.floor(duration.asYears())}y`;
    }

    return (
        <div
            onClick={() => onOpenJob(job)}
            ref={provided.innerRef}
            style={{ ...provided.draggableProps.style }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={
                (length - 1) === index ?
                    `job-card-container job-card-container-${theme} job-card-container-margin-small`
                    :
                    `job-card-container job-card-container-${theme} job-card-container-margin`
            }
        >
            <div className="wrapper">
                <div className="details">
                    <Typography
                        variant="subtitle1"
                        className={clsx(classes.text, classes.bold)}
                        gutterBottom
                    >
                        {job.title}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        className={classes.text}
                    >
                        {job.company}
                    </Typography>
                </div>
                <div className="buttons">
                    <button
                        onClick={onRemoveJob}
                        className={`icon-button icon-button-${theme} trash`}
                    >
                        <FiTrash />
                    </button>
                    {job.url &&
                        <button
                            onClick={onOpenLink}
                            className={`icon-button icon-button-${theme}`}
                        >
                            <AiOutlineLink />
                        </button>
                    }
                </div>
            </div>
            <div className={job.url ? "date space" : "date"}>
                <Typography variant="caption" className={classes.text}>
                    {renderTimePassed()}
                </Typography>
                <FiClock className="clock" />
            </div>
        </div>
    )
};

export default JobCard;