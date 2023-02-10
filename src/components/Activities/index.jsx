import React, { useContext } from "react";
import moment from "moment";
import update from 'immutability-helper';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Typography, Button, Checkbox, Chip, IconButton, Divider, FormControlLabel } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { GoListUnordered } from 'react-icons/go';
import { FiTrash } from 'react-icons/fi';
import { useSelector, useDispatch } from "react-redux";
import { removeActivity, updateActivityCompleted, addStepToTimeline } from "../../store/actions/jobs";
import { ThemeContext } from '../../utils/themeContext';
import './activities.sass';

// Firebase
import { db } from '../../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore/lite';

const useStyles = makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`,
            lineHeight: 1.2,
            textAlign: 'start'
        }
    },
    button: {
        '&&': {
            height: 40,
            borderRadius: 10,
            zIndex: 1,
            color: 'white',
            backgroundColor: '#1d5692',
            textTransform: 'capitalize',
            transition: '0.5s ease-out',
            fontFamily: `'Poppins', sans-serif`,
            margin: '10px 0',
            '&:hover': {
                backgroundColor: '#1d5692CC'
            }
        }
    },
    chip: {
        '&&': {
            color: 'white',
            textTransform: 'capitalize',
            fontFamily: `'Poppins', sans-serif`,
            backgroundColor: '#1d5692'
        }
    }
}));

const Activities = ({ job, setJob, setOpenJobDialog, setOpenActivityDialog }) => {
    const { theme } = useContext(ThemeContext);
    const jobs = useSelector(state => state.jobs);
    const dispatch = useDispatch();
    const classes = useStyles();

    const onOpenActivityDialog = () => {
        setOpenJobDialog(false);
        setOpenActivityDialog(true);
    }

    const handleCompletedChange = async (title, activityIndex, isCompleted) => {
        const jobRef = doc(db, "jobs", job.id);
        try {
            var updatedJob = {};
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            if (isCompleted) {
                const step = {
                    action: `${title} completed`,
                    date: new Date()
                };
                updatedJob = update(job, {
                    activites: {
                        [activityIndex]: {
                            $merge: {
                                completed: isCompleted
                            }
                        }
                    },
                    timeline: { $push: [step] }
                });
                await updateDoc(jobRef, {
                    activites: updatedJob.activites,
                    timeline: updatedJob.timeline
                });
                dispatch(addStepToTimeline(job.status, index, step));
            }
            else {
                updatedJob = update(job, {
                    activites: {
                        [activityIndex]: {
                            $merge: {
                                completed: isCompleted
                            }
                        }
                    }
                });
                await updateDoc(jobRef, { activites: updatedJob.activites });
            }
            dispatch(updateActivityCompleted(job.status, index, activityIndex, isCompleted));
            setJob(updatedJob);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const onRemoveActivity = async (activityIndex) => {
        const jobRef = doc(db, "jobs", job.id);
        try {
            const step = {
                action: 'Activity deleted',
                date: new Date()
            };
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            const updatedJob = update(job, {
                activites: { $splice: [[activityIndex, 1]] },
                timeline: { $push: [step] }
            });
            await updateDoc(jobRef, {
                activites: updatedJob.activites,
                timeline: updatedJob.timeline
            });
            dispatch(removeActivity(job.status, index, activityIndex));
            dispatch(addStepToTimeline(job.status, index, step));
            setJob(updatedJob);
        }
        catch (error) {
            console.log(error.message)
        }
    }

    return Object.keys(job).length > 0 && (
        <div className="activities-container">
            {job.activites.length === 0 ?
                <div className="no-activities">
                    <GoListUnordered className="icon" />
                    <Typography className={classes.text}>
                        There's no activity recored in this job yet.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => onOpenActivityDialog()}
                        endIcon={<AddRoundedIcon />}
                        className={classes.button}
                    >
                        Add activity
                    </Button>
                </div>
                :
                <div>
                    <div className="button">
                        <Button
                            variant="contained"
                            onClick={() => onOpenActivityDialog()}
                            endIcon={<AddRoundedIcon />}
                            className={classes.button}
                        >
                            Add activity
                        </Button>
                    </div>
                    <Divider className="divider" />
                    <div style={{ overflowX: 'auto', width: '100%' }}>
                        <table id="activites">
                            <tbody>
                                {job.activites.map((activity, index) => {
                                    return (
                                        <tr key={activity.id}>
                                            <td style={{ width: '45%' }}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={activity.completed}
                                                            onClick={() => handleCompletedChange(activity.title, index, !activity.completed)}
                                                            style={{ color: theme === 'light' ? "#1d5692" : "#ffffff" }}
                                                            disableRipple
                                                        />
                                                    }
                                                    label={
                                                        <Typography className={classes.text} variant="subtitle1">
                                                            {activity.title}
                                                        </Typography>
                                                    }
                                                />
                                            </td>
                                            <td style={{ width: '30%' }}>
                                                <Chip
                                                    label={activity.category}
                                                    variant="filled"
                                                    className={classes.chip}
                                                />
                                            </td>
                                            <td style={{ width: '20%' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    {Object.keys(activity.startDate).length === 0 ?
                                                        <Typography className={classes.text} color="textSecondary" variant="caption">
                                                            {moment(activity.startDate).format('DD/MM/YY HH:mm')}
                                                        </Typography>
                                                        :
                                                        <Typography className={classes.text} color="textSecondary" variant="caption">
                                                            {moment.unix(activity.startDate.seconds).format('DD/MM/YY HH:mm')}
                                                        </Typography>
                                                    }
                                                    {activity.endDate ?
                                                        Object.keys(activity.endDate).length === 0 ?
                                                            <Typography className={classes.text} color="textSecondary" variant="caption">
                                                                {moment(activity.endDate).format('DD/MM/YY HH:mm')}
                                                            </Typography>
                                                            :
                                                            <Typography className={classes.text} color="textSecondary" variant="caption">
                                                                {moment.unix(activity.endDate.seconds).format('DD/MM/YY HH:mm')}
                                                            </Typography>
                                                        :
                                                        null
                                                    }
                                                </div>
                                            </td>
                                            <td style={{ width: '5%' }}>
                                                <IconButton
                                                    onClick={() => onRemoveActivity(index)}
                                                    size="small"
                                                >
                                                    <FiTrash />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}

export default Activities;