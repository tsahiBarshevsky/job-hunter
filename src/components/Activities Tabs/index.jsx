import React, { useEffect, useState, useContext } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import update from 'immutability-helper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { toast } from 'react-toastify';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import { Typography, Checkbox, Chip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeContext } from '../../utils/themeContext';
import { useAuth } from '../../utils/context';
import { categories } from '../../utils/constants';
import { updateActivityCompleted, addStepToTimeline } from "../../store/actions/jobs";
import MobileHeader from '../Mobile Header';
import './activitiesTab.sass';

// Firebase
import { db } from '../../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore/lite';

const useStlyes = makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`
        }
    },
    bold: {
        '&&': {
            fontWeight: 'bold'
        }
    },
    chip: {
        '&&': {
            color: 'white',
            textTransform: 'capitalize',
            fontFamily: `'Poppins', sans-serif`
        }
    }
}));

const ActivitiesTab = ({ displayName, toggleDrawer }) => {
    const { user } = useAuth();
    const { theme } = useContext(ThemeContext);
    const [activities, setActivities] = useState([]);
    const jobs = useSelector(state => state.jobs);
    const matches = useMediaQuery('(max-width: 960px)');
    const location = useLocation();
    const dispatch = useDispatch();
    const classes = useStlyes();

    const handleCompletedChange = async (title, activityIndex, isCompleted, jobID, status) => {
        const job = jobs[status].items.find((item) => item.id === jobID);
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
                if (location.pathname !== '/demo') {
                    await updateDoc(jobRef, {
                        activites: updatedJob.activites,
                        timeline: updatedJob.timeline
                    });
                }
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
                if (location.pathname !== '/demo') {
                    await updateDoc(jobRef, { activites: updatedJob.activites });
                }
            }
            dispatch(updateActivityCompleted(job.status, index, activityIndex, isCompleted));
            // setJob(updatedJob);
        }
        catch (error) {
            console.log(error.message);
            toast.error('An unexpected error occurred');
        }
    }

    useEffect(() => {
        const arr = [];
        Object.keys(jobs).forEach((status) => {
            jobs[status].items.map((job) =>
                job.activites.length > 0 &&
                arr.push({
                    jobID: job.id,
                    title: job.title,
                    status: job.status,
                    company: job.company,
                    activites: job.activites
                })
            );
        });
        setActivities(arr.flat());
    }, [jobs]);

    return (
        <div className={`activities-tab-container activities-tab-container-${theme}`}>
            {!matches ?
                <div className="activities-tab-header">
                    {!displayName ?
                        <Typography
                            variant="h6"
                            className={clsx(classes.text, classes.bold)}
                        >
                            {user.displayName ? user.displayName : user.email}'s activities
                        </Typography>
                        :
                        <Typography
                            variant="h6"
                            className={clsx(classes.text, classes.bold)}
                        >
                            {displayName}'s activities
                        </Typography>
                    }
                </div>
                :
                <div className="activities-tab-header">
                    <MobileHeader
                        tab="Activities"
                        toggleDrawer={toggleDrawer}
                    />
                </div>
            }
            <div className={`activities-table-container activities-table-container-${theme}`}>
                <table id="activities">
                    <tbody>
                        {activities.map((item) => {
                            return (
                                item.activites.map((activity, index) => {
                                    return (
                                        <tr key={activity.id}>
                                            <td style={{ width: 50 }}>
                                                <Checkbox
                                                    disableRipple
                                                    checked={activity.completed}
                                                    style={{ color: theme === 'light' ? "#1d5692" : "#ffffff" }}
                                                    onClick={() => handleCompletedChange(activity.title, index, !activity.completed, item.jobID, item.status)}
                                                />
                                            </td>
                                            <td>
                                                <Typography className={classes.text}>{activity.title}</Typography>
                                            </td>
                                            <td style={{ width: 200 }}>
                                                <Chip
                                                    label={categories[activity.category].category}
                                                    variant="filled"
                                                    className={classes.chip}
                                                    style={{ backgroundColor: categories[activity.category].color }}
                                                />
                                            </td>
                                            <td>
                                                <Typography className={classes.text}>{item.company}</Typography>
                                            </td>
                                            <td>
                                                <Typography className={classes.text}>{item.title}</Typography>
                                            </td>
                                            <td>
                                                {Object.keys(activity.startDate).length === 0 ?
                                                    <Typography className={classes.text} color="textSecondary" variant="caption">
                                                        {moment(activity.startDate).format('DD/MM/YYYY HH:mm')}
                                                    </Typography>
                                                    :
                                                    <Typography className={classes.text} color="textSecondary" variant="caption">
                                                        {moment.unix(activity.startDate.seconds).format('DD/MM/YYYY HH:mm')}
                                                    </Typography>
                                                }
                                            </td>
                                            <td>
                                                {activity.endDate &&
                                                    (Object.keys(activity.endDate).length === 0 ?
                                                        <Typography className={classes.text} color="textSecondary" variant="caption">
                                                            {moment(activity.endDate).format('DD/MM/YYYY HH:mm')}
                                                        </Typography>
                                                        :
                                                        <Typography className={classes.text} color="textSecondary" variant="caption">
                                                            {moment.unix(activity.endDate.seconds).format('DD/MM/YYYY HH:mm')}
                                                        </Typography>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ActivitiesTab;