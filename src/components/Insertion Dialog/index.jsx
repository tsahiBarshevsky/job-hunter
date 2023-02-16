import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../utils/context';
import { addNewJob } from '../../store/actions/jobs';
import { addNewStat } from '../../store/actions/stats';
import { statuses } from '../../utils/constants';
import useStyles from './styles.js';
import './insertionDialog.sass';

// Material ui components
import {
    Button, Dialog, DialogContent, DialogTitle,
    TextField, Typography, FormControl,
    Select, MenuItem, IconButton
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// Firebase
import { db } from '../../utils/firebase';
import { doc, setDoc } from 'firebase/firestore/lite';
import clsx from 'clsx';

const InsertionDialog = ({ open, setOpen }) => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setTitle('');
            setCompany('');
        }, 100);
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    const onAddNewJob = async (event) => {
        event.preventDefault();
        var action = '';
        if (status === 'In Progress')
            action = 'Job created at In Progress';
        else
            if (status === 'Offered')
                action = 'Job created with an offer';
            else
                action = 'Job created';
        const job = {
            activities: [],
            company: company,
            contacts: [],
            created: new Date(),
            deadline: null,
            description: '',
            id: uuidv4(),
            location: '',
            notes: [],
            owner: user.uid,
            salary: '',
            status: status,
            timeline: [{
                action: action,
                date: new Date()
            }],
            title: title,
            url: ''
        };
        try {
            if (location.pathname !== '/demo') {
                await setDoc(doc(db, 'jobs', job.id), job); // Add new doc
            }
            dispatch(addNewJob(status, job)); // Update store
            dispatch(addNewStat({
                id: job.id,
                created: new Date(),
                title: job.title,
                company: job.company,
                status: job.status,
                link: job.url,
                location: job.location,
                salary: job.salary
            }));
            handleClose();
        }
        catch (error) {
            console.log(error.message);
            toast.error('An unexpected error occurred');
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setStatus(statuses[0].name);
        }, 100);
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            classes={{ paper: classes.paper }}
            className={classes.dialog}
        >
            <DialogTitle className={classes.title}>
                <div className="title-items">
                    <Typography className={classes.text} variant="h6">Add New Job</Typography>
                    <IconButton
                        onClick={handleClose}
                        size="small"
                        disableRipple
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={onAddNewJob}>
                    <div className="input-title">
                        <Typography className={classes.text} variant="subtitle1">Job Title</Typography>
                        <Typography className={classes.text} variant="caption">Required</Typography>
                    </div>
                    <TextField
                        required
                        autoFocus
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="outlined"
                        className={classes.input}
                        autoComplete="off"
                        placeholder="Job Title"
                        InputProps={{
                            classes: {
                                input: classes.text
                            }
                        }}
                    />
                    <div className="input-title">
                        <Typography className={classes.text} variant="subtitle1">Company</Typography>
                        <Typography className={classes.text} variant="caption">Required</Typography>
                    </div>
                    <TextField
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        variant="outlined"
                        className={classes.input}
                        autoComplete="off"
                        placeholder="Company"
                        InputProps={{
                            classes: {
                                input: classes.text
                            }
                        }}
                    />
                    <div className="input-title">
                        <Typography className={classes.text} variant="subtitle1">Job Status</Typography>
                        <Typography className={classes.text} variant="caption">Required</Typography>
                    </div>
                    <FormControl
                        variant="outlined"
                        className={classes.input}
                    >
                        <Select
                            required
                            value={status}
                            onChange={handleStatusChange}
                            inputProps={{
                                className: classes.text
                            }}
                        >
                            {statuses.map((status) => {
                                return (
                                    <MenuItem
                                        key={status.id}
                                        value={status.name}
                                        className={classes.text}
                                    >
                                        {status.name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={title === '' || company === ''}
                        className={clsx(classes.button, title !== '' && company !== '' && classes.buttonColor)}
                    >
                        Save Job
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default InsertionDialog;