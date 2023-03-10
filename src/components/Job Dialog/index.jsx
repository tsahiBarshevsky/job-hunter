import React, { useState, useContext } from 'react';
import moment from 'moment';
import clsx from 'clsx';
import { Timeline } from 'rsuite';
import { Dialog, Typography, Divider, IconButton } from '@mui/material';
import { ThemeContext } from '../../utils/themeContext';
import useStyles from './styles';
import "rsuite/dist/rsuite.min.css";
import './jobDialog.sass';

// Icons
import { HiOutlineThumbDown, HiOutlineThumbUp } from "react-icons/hi";
import { IoMdCreate } from "react-icons/io";
import { MdWorkOutline } from 'react-icons/md';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// Components
import Tabs from '../Tabs';
import JobInfo from '../Job Info';
import Notes from '../Notes';
import Contacts from '../Contacts';
import Activities from '../Activities';

const JobDialog = ({
    job,
    setJob,
    setMode,
    setSelectedContact,
    open,
    setOpen,
    setOpenActivityDialog,
    setOpenContactDialog,
    setOpenAlertDialog,
    setOrigin
}) => {
    const { theme } = useContext(ThemeContext);
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

    const renderTimelineIcon = (step) => {
        switch (step) {
            case 'Job created':
                return (<IoMdCreate className="icon" />);
            case 'Got an offer':
                return (<MdWorkOutline className="icon" />);
            case 'Accepted!':
                return (<HiOutlineThumbUp className="icon thumb-up" />);
            case 'Rejected':
                return (<HiOutlineThumbDown className="icon thumb-down" />);
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
                <div className={`job-details job-details-${theme}`}>
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
                    {Object.keys(job).length > 0 &&
                        <Timeline>
                            {[...job.timeline].reverse().map((step, index) => {
                                return (
                                    <Timeline.Item
                                        key={index}
                                        dot={renderTimelineIcon(step.action)}
                                    >
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
                    }
                </div>
            </div>
        </Dialog>
    )
}

export default JobDialog; 