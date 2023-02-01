import React from 'react';
import { IconButton, Typography } from '@mui/material';
import { MdEdit, MdDelete } from 'react-icons/md'
import parse from 'html-react-parser';
import './noteCard.sass';

const NoteCard = ({ note, onRemoveNote }) => {
    return (
        <div className="note-card-container">
            <div className="note-card-header">
                <Typography variant="h6">{note.title}</Typography>
                <div className="actions">
                    <IconButton size="small">
                        <MdEdit />
                    </IconButton>
                    <IconButton
                        onClick={() => onRemoveNote(note.id)}
                        size="small"
                    >
                        <MdDelete />
                    </IconButton>
                </div>
            </div>
            <Typography>{parse(note.text)}</Typography>
        </div>
    )
}

export default NoteCard;