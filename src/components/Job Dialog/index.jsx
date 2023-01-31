import React, { useState, useEffect } from 'react';
import { Dialog, TextField, Typography, Divider, Button, IconButton } from '@mui/material';
import { Timeline } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import CheckIcon from '@rsuite/icons/Check';
// import CloseIcon from '@rsuite/icons/Close';
import moment from 'moment';
import { removeJob, updateJob } from '../../store/actions/jobs';
import useStyles from './styles';
import "rsuite/dist/rsuite.min.css";

// Firebase
import { db } from '../../utils/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore/lite';

const JobDialog = ({ job, setJob, open, setOpen }) => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [contact, setContact] = useState('');
    const [notes, setNotes] = useState('');
    const [url, setUrl] = useState('');
    const jobs = useSelector(state => state.jobs);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setJob({});
        }, 100);
    }

    const onEditJob = async (event) => {
        event.preventDefault();
        const jobRef = doc(db, "jobs", job.id);
        try {
            // Update document on Firestore
            await updateDoc(jobRef, {
                company: company,
                contact: contact,
                location: location,
                salary: salary,
                title: title,
                url: url
            });
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            const editedJob = {
                company: company,
                contact: contact,
                location: location,
                salary: salary,
                title: title,
                url: url
            };
            dispatch(updateJob(job.status, index, editedJob)); // Update store
            handleClose();
        }
        catch (error) {
            console.log(error.message)
        }
    }

    const onRemoveJob = async () => {
        try {
            await deleteDoc(doc(db, "jobs", job.id));
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            dispatch(removeJob(job.status, index));
            handleClose();
        }
        catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        setTitle(job.title);
        setCompany(job.company);
        setLocation(job.location);
        setSalary(job.salary);
        setContact(job.contact);
        setNotes(job.notes);
        setUrl(job.url);
    }, [job]);

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
                    <form className={classes.inputs} onSubmit={onEditJob}>
                        <TextField
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            variant="outlined"
                            label="Job title"
                            autoComplete="off"
                            className={classes.input}
                        />
                        <TextField
                            required
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            variant="outlined"
                            label="Company"
                            autoComplete="off"
                            className={classes.input}
                        />
                        <TextField
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            variant="outlined"
                            label="Location"
                            autoComplete="off"
                            className={classes.input}
                        />
                        <TextField
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            variant="outlined"
                            label="Salary"
                            type="number"
                            inputProps={{ min: 1 }}
                            autoComplete="off"
                            className={classes.input}
                        />
                        <TextField
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            variant="outlined"
                            label="Contact"
                            autoComplete="off"
                            className={classes.input}
                        />
                        <TextField
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            variant="outlined"
                            label="URL"
                            autoComplete="off"
                            className={classes.input}
                        />
                        <TextField
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            variant="outlined"
                            label="Notes"
                            autoComplete="off"
                            className={classes.input}
                        />
                        <div className={classes.actions}>
                            <Button variant="contained" onClick={onRemoveJob}>Delete job</Button>
                            <Button type="submit" variant="contained">Save changes</Button>
                        </div>
                    </form>
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