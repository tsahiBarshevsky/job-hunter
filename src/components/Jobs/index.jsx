import React, { useContext } from 'react';
import clsx from 'clsx';
import update from 'immutability-helper';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useAuth } from '../../utils/context';
import { ThemeContext } from '../../utils/themeContext';
import { addStepToTimeline } from '../../store/actions/jobs';
import { updateStatus } from '../../store/actions/stats';
import JobCard from '../Job Card';
import MobileHeader from '../Mobile Header';
import InsertionButton from '../Insertion Button';
import useStyles from './styles';
import './jobs.sass';

// Icons
import { BsHeart } from 'react-icons/bs';
import { GiCheckMark } from 'react-icons/gi';
import { MdWorkOutline } from 'react-icons/md';
import { FiPhoneIncoming, FiPhoneOff } from 'react-icons/fi';
import { HiOutlineThumbDown, HiOutlineThumbUp } from 'react-icons/hi';

// Firebase
import { doc, updateDoc } from 'firebase/firestore/lite';
import { db } from '../../utils/firebase';

const Jobs = ({ setJob, setOpenInsertionDialog, setOpenJobDialog, setOpenAlertDialog, setOrigin, setContactOrigin, displayName, toggleDrawer }) => {
    const { user } = useAuth();
    const { theme } = useContext(ThemeContext);
    const jobs = useSelector(state => state.jobs);
    const stats = useSelector(state => state.stats);
    const matches = useMediaQuery('(max-width: 960px)');
    const location = useLocation();
    const dispatch = useDispatch();
    const classes = useStyles();

    const onOpenJob = (item) => {
        setJob(item);
        setOrigin('dialog');
        setContactOrigin('jobs');
        setOpenJobDialog(true);
    }

    const renderIcon = (columnName) => {
        switch (columnName) {
            case 'Wishlist':
                return <BsHeart size={20} />;
            case 'Applied':
                return <GiCheckMark size={18} />;
            case 'In Progress':
                return <FiPhoneIncoming size={18} />;
            case 'Offered':
                return <MdWorkOutline size={20} />;
            case 'Rejected':
                return <HiOutlineThumbDown size={21} />;
            case 'Accepted':
                return <HiOutlineThumbUp size={21} />;
            case 'Not Answered':
                return <FiPhoneOff size={18} />;
            default: return null;
        }
    }

    const timelineUpdate = (status) => {
        switch (status) {
            case 'Accepted':
                return "Accepted!";
            case 'Rejected':
                return "Rejected";
            case 'Offered':
                return "Got an offer";
            default: return `Moved to ${status}`;
        }
    }

    const onDragEnd = async (result, columns) => {
        if (!result.destination)
            return;
        const { source, destination, draggableId } = result; // draggableId is job id also
        if (source.droppableId !== destination.droppableId) { // Move to other list
            const dup = JSON.parse(JSON.stringify(jobs)); // Duplicate of jobs in case of firestore update failed
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            const newColumns = {
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            };
            var job = newColumns[destination.droppableId].items.find((item) => item.id === draggableId);
            const index = newColumns[destination.droppableId].items.findIndex((item) => item.id === draggableId);
            // Update job's status on new columns object
            const updatedColumns = update(newColumns, {
                [destination.droppableId]: {
                    items: {
                        [index]: {
                            status: {
                                $set: destination.droppableId
                            }
                        }
                    }
                }
            });
            // Update timeline
            const step = {
                action: timelineUpdate(destination.droppableId),
                date: new Date()
            };
            job = update(job, {
                status: { $set: destination.droppableId },
                timeline: { $push: [step] }
            });
            dispatch({ type: 'SET_JOBS', jobs: updatedColumns }); // Update store
            dispatch(addStepToTimeline(destination.droppableId, index, step));
            // Update stats
            const statIndex = stats.findIndex((stat) => stat.id === job.id);
            dispatch(updateStatus(statIndex, destination.droppableId));
            // Update firestore
            if (location.pathname !== '/demo') {
                const jobRef = doc(db, "jobs", job.id);
                try {
                    await updateDoc(jobRef, {
                        status: destination.droppableId,
                        timeline: job.timeline
                    });
                }
                catch (error) {
                    alert(error.message);
                    dispatch({ type: 'SET_JOBS', jobs: dup });
                }
            }
        }
        else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            const newColumns = {
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            };
            dispatch({ type: 'SET_JOBS', jobs: newColumns });
        }
    }

    return (
        <div className={`jobs-container jobs-container-${theme}`}>
            {matches && <InsertionButton onClick={() => setOpenInsertionDialog(true)} />}
            {!matches ?
                <div className="jobs-header">
                    {!displayName ?
                        <Typography
                            variant="h6"
                            className={clsx(classes.text, classes.bold)}
                        >
                            {user.displayName ? user.displayName : user.email}'s jobs
                        </Typography>
                        :
                        <Typography
                            variant="h6"
                            className={clsx(classes.text, classes.bold)}
                        >
                            {displayName}'s jobs
                        </Typography>
                    }
                    <Button
                        variant="contained"
                        className={classes.button}
                        endIcon={<AddRoundedIcon />}
                        disableRipple
                        onClick={() => setOpenInsertionDialog(true)}
                    >
                        Add job
                    </Button>
                </div>
                :
                <div className="jobs-header">
                    <MobileHeader
                        tab="Jobs"
                        toggleDrawer={toggleDrawer}
                    />
                </div>
            }
            <div className={`dnd-container dnd-container-${theme}`}>
                <DragDropContext onDragEnd={(result) => onDragEnd(result, jobs)}>
                    {Object.entries(jobs).map(([columnId, column], index) => {
                        return (
                            <div className="context" key={columnId} style={index !== 6 ? { marginRight: 20 } : {}}>
                                <div className={`column-header column-header-${theme}`}>
                                    <div className="column-header-top-line">
                                        <Typography
                                            variant="subtitle1"
                                            className={classes.text}
                                        >
                                            {column.name}
                                        </Typography>
                                        <div className="column-header-icon-wrapper">
                                            {renderIcon(column.name)}
                                        </div>
                                    </div>
                                    <Typography
                                        variant="subtitle2"
                                        className={classes.text}
                                    >
                                        {column.items.length === 0 ?
                                            'Empty list'
                                            :
                                            (column.items.length === 1 ?
                                                `${column.items.length} job`
                                                :
                                                `${column.items.length} jobs`
                                            )}
                                    </Typography>
                                </div>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                className={`droppable droppable-${theme}`}
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background:
                                                        theme === 'light' ? (
                                                            snapshot.isDraggingOver ? "#A9A9A9" : "lightgrey"
                                                        ) : (
                                                            snapshot.isDraggingOver ? "#494f52" : "#313537"
                                                        )
                                                }}
                                            >
                                                <div
                                                    className={
                                                        theme === 'light' ?
                                                            (snapshot.isDraggingOver ?
                                                                "scrollable scrollable-dragging-light scrollable-light"
                                                                :
                                                                "scrollable scrollable-light"
                                                            ) : (
                                                                snapshot.isDraggingOver ?
                                                                    "scrollable scrollable-dragging-dark scrollable-dark"
                                                                    :
                                                                    "scrollable scrollable-dark"

                                                            )
                                                    }
                                                >
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <JobCard
                                                                            job={item}
                                                                            setJob={setJob}
                                                                            provided={provided}
                                                                            onOpenJob={onOpenJob}
                                                                            index={index}
                                                                            setOpenAlertDialog={setOpenAlertDialog}
                                                                            setOrigin={setOrigin}
                                                                        />
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        );
                    })}
                </DragDropContext>
            </div>
        </div >
    )
}

export default Jobs;