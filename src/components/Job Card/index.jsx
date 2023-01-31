import React from 'react';
import { Typography, Divider } from '@mui/material';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import './jobCard.sass';

const JobCard = ({ position, provided, onOpenPosition, index }) => {
    const jobs = useSelector(state => state.jobs);
    const length = jobs[position.status].items.length;

    return (
        <div
            // onClick={() => onOpenPosition(position)}
            className={(length - 1) === index ? "job-card-container" : "position-box-container position-box-container-margin"}
            ref={provided.innerRef}
            style={{ ...provided.draggableProps.style }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <div className="header">
                <Typography variant="subtitle1">{position.title}</Typography>
                {Object.keys(position.timeline[0].date).length === 0 ?
                    <Typography variant="caption">
                        {moment(position.timeline[0].date).format('DD/MM/YYYY')}
                    </Typography>
                    :
                    <Typography variant="caption">
                        {moment.unix(position.timeline[0].date.seconds).format('DD/MM/YYYY')}
                    </Typography>
                }
            </div>
            <Divider className="divider" />
            <Typography variant="subtitle1">{position.company}</Typography>
        </div>
    )
};

export default JobCard;