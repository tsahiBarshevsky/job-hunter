import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import update from 'immutability-helper';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { categories } from '../../utils/constants';
import { addNewActivity, addStepToTimeline } from '../../store/actions/jobs';
import { ThemeContext } from '../../utils/themeContext';
import useStyles from './styles';
import './activityDialog.sass';

// Mui components
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Chip,
    Button,
    IconButton,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Stack } from '@mui/system';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// Firebase
import { db } from '../../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore/lite';

const ActivityDialog = ({ open, setOpen, job, setJob, setOpenJobDialog }) => {
    const { theme } = useContext(ThemeContext);
    const jobs = useSelector(state => state.jobs);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(0);
    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();

    const resetForm = () => {
        setTitle('');
        setCategory(0);
        setIsCompleted(false);
        setTimeout(() => {
            setEndDate(null);
        }, 100);
    }

    const handleClose = () => {
        setOpen(false);
        setOpenJobDialog(true);
        resetForm();
    }

    const onAddNewActivity = async (event) => {
        event.preventDefault();
        if (moment(endDate).isBefore(moment(startDate)))
            alert('end before start');
        else {
            const jobRef = doc(db, "jobs", job.id);
            const activity = {
                id: uuidv4(),
                title: title,
                category: category,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
                completed: isCompleted
            };
            try {
                const step = {
                    action: 'Activity added',
                    date: new Date()
                };
                const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
                const updatedJob = update(job, {
                    activites: { $push: [activity] },
                    timeline: { $push: [step] }
                });
                await updateDoc(jobRef, {
                    activites: updatedJob.activites,
                    timeline: updatedJob.timeline
                });
                dispatch(addNewActivity(job.status, index, activity));
                dispatch(addStepToTimeline(job.status, index, step));
                setJob(updatedJob);
                handleClose();
            }
            catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setStartDate(moment());
        }, 100);
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            classes={{ paper: classes.paper }}
            className={classes.dialog}
        >
            <DialogTitle>
                <div className="title-items">
                    <Typography className={classes.text} variant="h6">New log activity</Typography>
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
                <form onSubmit={onAddNewActivity}>
                    <div className="input-title">
                        <Typography className={classes.text} variant="subtitle1">Title</Typography>
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
                        placeholder="Activity title"
                        InputProps={{
                            classes: {
                                input: classes.text
                            }
                        }}
                    />
                    <div className="input-title">
                        <Typography className={classes.text} variant="subtitle1">Category</Typography>
                        <Typography className={classes.text} variant="caption">Required</Typography>
                    </div>
                    <Stack sx={{ flexWrap: 'wrap', gap: 1 }} direction="row" alignItems="start">
                        {categories.map((item, index) => {
                            return (
                                <Chip
                                    key={item.id}
                                    label={item.category}
                                    variant="filled"
                                    onClick={() => setCategory(index)}
                                    className={clsx(classes.chip, index === category ? classes.selected : classes.unselected)}
                                />
                            )
                        })}
                    </Stack>
                    <div className="dates">
                        <div className="wrapper left">
                            <div className="input-title">
                                <Typography className={classes.text} variant="subtitle1">Start date</Typography>
                            </div>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DateTimePicker
                                    value={startDate}
                                    inputFormat="DD/MM/YYYY HH:mm"
                                    ampm={false}
                                    onChange={(value) => setStartDate(moment(value))}
                                    InputProps={{
                                        classes: {
                                            input: classes.text
                                        }
                                    }}
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                inputProps={{
                                                    ...params.inputProps,
                                                    placeholder: "DD/MM/YYYY HH:mm"
                                                }}
                                            />
                                        )
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="wrapper right">
                            <div className="input-title">
                                <Typography className={classes.text} variant="subtitle1">End date</Typography>
                            </div>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DateTimePicker
                                    value={endDate}
                                    inputFormat="DD/MM/YYYY HH:mm"
                                    minDate={startDate}
                                    ampm={false}
                                    onChange={(value) => setEndDate(moment(value))}
                                    InputProps={{
                                        classes: {
                                            input: classes.text
                                        }
                                    }}
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                inputProps={{
                                                    ...params.inputProps,
                                                    placeholder: "End date"
                                                }}
                                            />
                                        )
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isCompleted}
                                    onClick={() => setIsCompleted(!isCompleted)}
                                    style={{ color: theme === 'light' ? "#1d5692" : "#ffffff" }}
                                    disableRipple
                                />
                            }
                            label={
                                <Typography
                                    variant="subtitle1"
                                    className={classes.text}
                                >
                                    Mark as completed
                                </Typography>
                            }
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        className={classes.button}
                    >
                        Add Activity
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ActivityDialog;