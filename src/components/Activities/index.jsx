import React from "react";
import moment from "moment";
import update from 'immutability-helper';
import { Typography, Button, Checkbox, Chip, IconButton, Divider, FormControlLabel } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { useSelector, useDispatch } from "react-redux";
import { removeActivity, updateActivityCompleted, addStepToTimeline } from "../../store/actions/jobs";
import './activities.sass';

// Firebase
import { db } from '../../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore/lite';

const Activities = ({ job, setJob, setOpenJobDialog, setOpenActivityDialog }) => {
    const jobs = useSelector(state => state.jobs);
    const dispatch = useDispatch();

    const onOpenContactDialog = () => {
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
                <div>
                    <Typography>You have not added any activity to this job yet.</Typography>
                    <Button variant="contained" onClick={() => onOpenContactDialog()}>Create activity</Button>
                </div>
                :
                <div>
                    <Button variant="contained" onClick={() => onOpenContactDialog()}>Create activity</Button>
                    <Divider className="divider" />
                    <table style={{ backgroundColor: 'purple', width: '100%' }}>
                        <tbody>
                            {job.activites.map((activity, index) => {
                                return (
                                    <tr key={activity.id}>
                                        <td style={{ backgroundColor: 'green', width: '40%' }}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={activity.completed}
                                                        onClick={() => handleCompletedChange(activity.title, index, !activity.completed)}
                                                    />
                                                }
                                                label={activity.title}
                                            />
                                        </td>
                                        <td style={{ backgroundColor: 'blue', width: '30%' }}>
                                            <Chip
                                                label={activity.category}
                                                color="primary"
                                                variant="filled"
                                            />
                                        </td>
                                        <td style={{ backgroundColor: 'brown', width: '20%' }}>
                                            {Object.keys(activity.startDate).length === 0 ?
                                                <Typography variant="caption">
                                                    {moment(activity.startDate).format('DD/MM/YY HH:mm')}
                                                </Typography>
                                                :
                                                <Typography variant="caption">
                                                    {moment.unix(activity.startDate.seconds).format('DD/MM/YY HH:mm')}
                                                </Typography>
                                            }
                                        </td>
                                        <td style={{ backgroundColor: 'red', width: '10%' }}>
                                            <IconButton onClick={() => onRemoveActivity(index)}>
                                                <MdDelete />
                                            </IconButton>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {/* {job.activites.map((activity, index) => {
                        return (
                            <div
                                key={activity.id}
                                className="activity-item"
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={activity.completed}
                                            onClick={() => handleCompletedChange(activity.title, index, !activity.completed)}
                                        />
                                    }
                                    label={activity.title}
                                />
                                <Chip
                                    label={activity.category}
                                    color="primary"
                                    variant="filled"
                                />
                                {Object.keys(activity.startDate).length === 0 ?
                                    <Typography variant="caption">
                                        {moment(activity.startDate).format('DD/MM/YY HH:mm')}
                                    </Typography>
                                    :
                                    <Typography variant="caption">
                                        {moment.unix(activity.startDate.seconds).format('DD/MM/YY HH:mm')}
                                    </Typography>
                                }
                                <IconButton onClick={() => onRemoveActivity(index)}>
                                    <MdDelete />
                                </IconButton>
                            </div>
                        )
                    })} */}
                </div>
            }
        </div>
    )
}

export default Activities;