import React from "react";
import moment from "moment";
import update from 'immutability-helper';
import { Typography, Button, Checkbox } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { updateActivityCompleted } from "../../store/actions/jobs";

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

    const handleCompletedChange = async (activityIndex, isCompleted) => {
        const jobRef = doc(db, "jobs", job.id);
        try {
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            const updatedJob = update(job, {
                activites: {
                    [activityIndex]: {
                        $merge: {
                            completed: isCompleted
                        }
                    }
                }
            });
            await updateDoc(jobRef, { activites: updatedJob.activites });
            dispatch(updateActivityCompleted(job.status, index, activityIndex, isCompleted));
            setJob(updatedJob);
        }
        catch (error) {
            console.log(error.message);
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
                    {job.activites.map((activity, index) => {
                        return (
                            <div key={activity.id}>
                                <Checkbox
                                    checked={activity.completed}
                                    onClick={() => handleCompletedChange(index, !activity.completed)}
                                />
                                <Typography>{activity.completed ? 'yes' : 'no'}</Typography>
                                <Typography>{activity.title}</Typography>
                                <Typography>{activity.category}</Typography>
                                {Object.keys(activity.startDate).length === 0 ?
                                    <Typography variant="caption">
                                        {moment(activity.startDate).format('DD/MM/YYYY HH:mm')}
                                    </Typography>
                                    :
                                    <Typography variant="caption">
                                        {moment.unix(activity.startDate.seconds).format('DD/MM/YYYY HH:mm')}
                                    </Typography>
                                }
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Activities;