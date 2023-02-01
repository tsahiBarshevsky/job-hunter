import React from 'react';
import { IconButton, Typography } from '@mui/material';
import { MdEdit, MdDelete } from 'react-icons/md'
import parse from 'html-react-parser';
import './noteCard.sass';

const NoteCard = ({ note, setMode, setTitle, setText, setNoteID, onRemoveNote }) => {
    const onSwitchToEditMode = () => {
        setMode('editing');
        setNoteID(note.id);
        setTitle(note.title);
        setText(note.text);
    }

    return (
        <div className="note-card-container">
            <div className="note-card-header">
                <Typography variant="h6">{note.title}</Typography>
                <div className="actions">
                    <IconButton
                        onClick={onSwitchToEditMode}
                        size="small"
                    >
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