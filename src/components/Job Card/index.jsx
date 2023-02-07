import React from 'react';
import moment from 'moment/moment';
import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineLink, AiFillDelete } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
import { removeJob } from '../../store/actions/jobs';
import { removeStat } from '../../store/actions/stats';
import useStyles from './styles';
import './jobCard.sass';

import { IconButton } from 'rsuite';

const JobCard = ({ job, provided, onOpenJob, index }) => {
    const jobs = useSelector(state => state.jobs);
    const stats = useSelector(state => state.stats);
    const length = jobs[job.status].items.length;
    const classes = useStyles();
    const dispatch = useDispatch();

    const onRemoveJob = async (event) => {
        event.stopPropagation();
        try {
            // await deleteDoc(doc(db, "jobs", job.id));
            const statIndex = stats.findIndex((item) => item.id === job.id);
            dispatch(removeJob(job.status, index)); // Update store
            dispatch(removeStat(statIndex)); // Update store
        }
        catch (error) {
            console.log(error.message)
        }
    }

    const onOpenLink = (event) => {
        event.stopPropagation();
        window.open(job.url);
    }

    return (
        <div
            onClick={() => onOpenJob(job)}
            className={(length - 1) === index ? "job-card-container" : "job-card-container job-card-container-margin"}
            ref={provided.innerRef}
            style={{ ...provided.draggableProps.style }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <div className="wrapper">
                <div className="details">
                    <Typography
                        variant="subtitle1"
                        className={[classes.text, classes.bold]}
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
                    {/* <IconButton className="icon-button trash" size="xs" icon={<FiTrash size={15} />} /> */}
                    <button
                        onClick={onRemoveJob}
                        className="icon-button trash"
                    >
                        <FiTrash />
                    </button>
                    {job.url &&
                        <button
                            onClick={onOpenLink}
                            className="icon-button trash"
                        >
                            <AiOutlineLink />
                        </button>
                    }
                </div>
            </div>
            <div className="date">
                {Object.keys(job.created).length === 0 ?
                    <Typography variant="caption" className={classes.text}>
                        {moment(job.created).format('DD/MM/YYYY')}
                    </Typography>
                    :
                    <Typography variant="caption" className={classes.text}>
                        {moment.unix(job.created.seconds).format('DD/MM/YYYY')}
                    </Typography>
                }
            </div>
        </div>
    )
};

export default JobCard;