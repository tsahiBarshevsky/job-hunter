import React, { useState } from 'react';
import moment from 'moment';
import clsx from 'clsx';
import { Timeline } from 'rsuite';
import { Dialog, Typography, Divider, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useStyles from './styles';
import "rsuite/dist/rsuite.min.css";
import './jobDialog.sass';

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
                        setOrigin={setOrigin}
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
        >
            <div className="container">
                <div className="job-details">
                    <div className="header">
                        <div>
                            <Typography
                                className={classes.text}
                                variant="h5"
                            >
                                {job.title}
                            </Typography>
                            <Typography
                                className={classes.text}
                                variant="subtitle2"
                            >
                                At {job.company}
                            </Typography>
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
                <div className="timeline">
                    <Typography className={classes.text} variant="h6">Timeline</Typography>
                    <Divider className={classes.divider} />
                    <Timeline>
                        {Object.keys(job).length > 0 && job.timeline.map((step, index) => {
                            return (
                                <Timeline.Item key={index}>
                                    <Typography
                                        className={clsx(classes.text, classes.timelineTitle)}
                                        variant="subtitle2"
                                    >
                                        {step.action}
                                    </Typography>
                                    {Object.keys(step.date).length === 0 ?
                                        <Typography className={classes.date} variant="caption">
                                            {moment(step.date).format('DD/MM/YYYY HH:mm:ss')}
                                        </Typography>
                                        :
                                        <Typography className={classes.date} variant="caption">
                                            {moment.unix(step.date.seconds).format('DD/MM/YYYY HH:mm:ss')}
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