import React, { useState } from 'react';
import moment from 'moment';
import { Timeline } from 'rsuite';
import { Dialog, Typography, Divider, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useStyles from './styles';
import "rsuite/dist/rsuite.min.css";

// Components
import Tabs from '../Tabs';
import JobInfo from '../Job Info';
import Notes from '../Notes';
import Contacts from '../Contacts';
import Activities from '../Activities';

const JobDialog = ({ job, setJob, setMode, setSelectedContact, open, setOpen, setOpenActivityDialog, setOpenContactDialog, setOpenAlertDialog, setOrigin }) => {
    const [activeTab, setActiveTab] = useState('tab1');
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setOrigin('');
            setActiveTab("tab1");
        }, 100);
    }

    const renderTab = () => {
        switch (activeTab) {
            case 'tab1':
                return (
                    <JobInfo
                        job={job}
                        handleClose={handleClose}
                        setOpenAlertDialog={setOpenAlertDialog}
                    />
                );
            case 'tab2':
                return (
                    <Activities
                        job={job}
                        setJob={setJob}
                        setOpenJobDialog={setOpen}
                        setOpenActivityDialog={setOpenActivityDialog}
                    />
                );
            case 'tab3':
                return (
                    <Notes
                        job={job}
                        setJob={setJob}
                    />
                );
            case 'tab4':
                return (
                    <Contacts
                        job={job}
                        setJob={setJob}
                        setMode={setMode}
                        setSelectedContact={setSelectedContact}
                        setOpenJobDialog={setOpen}
                        setOpenContactDialog={setOpenContactDialog}
                    />
                );
            default:
                return null;
        }
    }

    return Object.keys(job).length > 0 && (
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
                            <Typography variant="subtitle2" color="textSecondary">Status: {job.status}</Typography>
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
                        job={job}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <div>{renderTab()}</div>
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
        </Dialog>
    )
}

export default JobDialog; 