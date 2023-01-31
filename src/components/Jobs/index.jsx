import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useAuth } from '../../utils/context';
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

const Jobs = ({ setOpenInsertionDialog }) => {
    const { user } = useAuth();
    const jobs = useSelector(state => state.jobs);

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

    const onDragEnd = async (result, columns) => { }

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
                                                                    <h1>{item.title}</h1>
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