import React from 'react';
import update from 'immutability-helper';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useAuth } from '../../utils/context';
import JobCard from '../Job Card';
import { addStepToTimeline } from '../../store/actions/jobs';
import './jobs.sass';

// Icons
import { BsHeart } from 'react-icons/bs';
import { GiCheckMark } from 'react-icons/gi';
import { FiPhoneIncoming, FiPhoneOff } from 'react-icons/fi';
import { HiOutlineThumbDown, HiOutlineThumbUp } from 'react-icons/hi';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';

// Firebase
import { doc, updateDoc } from 'firebase/firestore/lite';
import { db } from '../../utils/firebase';

const Jobs = ({ setJob, setOpenInsertionDialog, setOpenJobDialog }) => {
    const { user } = useAuth();
    const jobs = useSelector(state => state.jobs);
    const dispatch = useDispatch();

    const onOpenJob = (item) => {
        setJob(item);
        setOpenJobDialog(true);
    }

    const renderIcon = (columnName) => {
        switch (columnName) {
            case 'Wishlist':
                return <BsHeart className="column-header-icon" />;
            case 'Applied':
                return <GiCheckMark className="column-header-icon" />;
            case 'In Progress':
                return <FiPhoneIncoming className="column-header-icon" />;
            case 'Offered':
                return <WorkOutlineOutlinedIcon className="column-header-icon" />;
            case 'Rejected':
                return <HiOutlineThumbDown className="column-header-icon" />;
            case 'Accepted':
                return <HiOutlineThumbUp className="column-header-icon" />;
            case 'Not Answered':
                return <FiPhoneOff className="column-header-icon" />;
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
            // Update firestore
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
        <div className="jobs-container">
            <div className="jobs-header">
                <Typography variant="h6">Hey, {user.displayName ? user.displayName : user.email}!</Typography>
                <Button
                    variant="contained"
                    onClick={() => setOpenInsertionDialog(true)}
                >
                    Add job
                </Button>
            </div>
            <div className="dnd-container">
                <DragDropContext onDragEnd={(result) => onDragEnd(result, jobs)}>
                    {Object.entries(jobs).map(([columnId, column], index) => {
                        return (
                            <div className="context" key={columnId} style={index !== 6 ? { marginRight: 20 } : {}}>
                                <div className="column-header">
                                    <div className="column-header-top-line">
                                        <Typography variant="subtitle1">{column.name}</Typography>
                                        {renderIcon(column.name)}
                                    </div>
                                    <Typography variant="subtitle2">
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
                                                className="droppable"
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver ? "#A9A9A9" : "lightgray"
                                                }}
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
                                                                        provided={provided}
                                                                        onOpenJob={onOpenJob}
                                                                        index={index}
                                                                    />
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        );
                    })}
                </DragDropContext>
            </div>
        </div>
    )
}

export default Jobs;