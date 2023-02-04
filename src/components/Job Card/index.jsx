import React from 'react';
import { Typography, Divider } from '@mui/material';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import './jobCard.sass';

const JobCard = ({ job, provided, onOpenJob, index }) => {
    const jobs = useSelector(state => state.jobs);
    const length = jobs[job.status].items.length;

    return (
        <div
            onClick={() => onOpenJob(job)}
            className={(length - 1) === index ? "job-card-container" : "job-card-container job-card-container-margin"}
            ref={provided.innerRef}
            style={{ ...provided.draggableProps.style }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <div className="header">
                <Typography variant="subtitle1">{job.title}</Typography>
                {Object.keys(job.created).length === 0 ?
                    <Typography variant="caption">
                        {moment(job.created).format('DD/MM/YYYY')}
                    </Typography>
                    :
                    <Typography variant="caption">
                        {moment.unix(job.created.seconds).format('DD/MM/YYYY')}
                    </Typography>
                }
            </div>
            <Divider className="divider" />
            <Typography variant="subtitle1">{job.company}</Typography>
        </div>
    )
};

export default JobCard;