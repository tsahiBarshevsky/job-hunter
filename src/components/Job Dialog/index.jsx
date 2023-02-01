import React, { useState } from 'react';
import { Dialog, Typography, Divider, IconButton } from '@mui/material';
import { Timeline } from 'rsuite';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import CheckIcon from '@rsuite/icons/Check';
// import CloseIcon from '@rsuite/icons/Close';
import moment from 'moment';
import Tabs from '../Tabs';
import JobInfo from '../Job Info';
import useStyles from './styles';
import "rsuite/dist/rsuite.min.css";

const JobDialog = ({ job, setJob, open, setOpen }) => {
    const [activeTab, setActiveTab] = useState('tab1');
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setJob({});
            setActiveTab("tab1");
        }, 100);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            classes={{ paper: classes.paper }}
            className={classes.dialog}
        >
            <div className={classes.container}>
                <div className={classes.details}>
                    <div className={classes.header}>
                        <div>
                            <Typography variant="h5">{job.title}</Typography>
                            <Typography variant="subtitle2" color="textSecondary">At {job.company}</Typography>
                        </div>
                        <IconButton
                            onClick={handleClose}
                            size="small"
                            disableRipple
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </div>
                    <Tabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <JobInfo
                        job={job}
                        handleClose={handleClose}
                    />
                </div>
                <div className={classes.timelineContainer}>
                    <Typography className={classes.text} variant="h6">Timeline</Typography>
                    <Divider className={classes.divider} />
                    <Timeline>
                        {Object.keys(job).length > 0 && job.timeline.map((step, index) => {
                            return (
                                <Timeline.Item key={index}>
                                    <Typography className={classes.text} variant="subtitle1">{step.action}</Typography>
                                    {Object.keys(step.date).length === 0 ?
                                        <Typography variant="caption" color="textSecondary">
                                            {moment(step.date).format('DD/MM/YYYY HH:mm')}
                                        </Typography>
                                        :
                                        <Typography variant="caption" color="textSecondary">
                                            {moment.unix(step.date.seconds).format('DD/MM/YYYY HH:mm')}
                                        </Typography>
                                    }
                                </Timeline.Item>
                            )
                        })}
                    </Timeline>
                </div>
            </div>
        </Dialog >
    )
}

export default JobDialog; 