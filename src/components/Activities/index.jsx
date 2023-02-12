import React from "react";
import update from 'immutability-helper';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { toast } from 'react-toastify';
import { Typography, Button, Divider } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { GoListUnordered } from 'react-icons/go';
import { useSelector, useDispatch } from "react-redux";
import { removeActivity, updateActivityCompleted, addStepToTimeline } from "../../store/actions/jobs";
import ActivityCard from "../Activity Card";
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
    }
}));

const Activities = ({ job, setJob, setOpenJobDialog, setOpenActivityDialog }) => {
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
            toast.error('An unexpected error occurred');
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
            console.log(error.message);
            toast.error('An unexpected error occurred');
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
                    <div className="activites">
                        {job.activites.map((activity, index) => {
                            return (
                                <ActivityCard
                                    key={activity.id}
                                    index={index}
                                    activity={activity}
                                    handleCompletedChange={handleCompletedChange}
                                    onRemoveActivity={onRemoveActivity}
                                />
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default Activities;