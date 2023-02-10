import React, { useContext } from 'react';
import parse from 'html-react-parser';
import moment from 'moment';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MdEdit } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';
import { ThemeContext } from '../../utils/themeContext';
import './noteCard.sass';

const useStyles = makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`
        }
    }
}));

const NoteCard = ({ note, setMode, setTitle, setText, setNoteID, onRemoveNote }) => {
    const { theme } = useContext(ThemeContext);
    const classes = useStyles();

    const onSwitchToEditMode = () => {
        setMode('editing');
        setNoteID(note.id);
        setTitle(note.title);
        setText(note.text);
    }

    return (
        <div className={`note-card-container note-card-container-${theme}`}>
            <div className="note-card-header">
                <Typography variant="h6" className={classes.text}>
                    {note.title}
                </Typography>
                <div className="actions">
                    <button
                        onClick={onSwitchToEditMode}
                        className={`icon-button icon-button-${theme}`}
                    >
                        <MdEdit />
                    </button>
                    <button
                        onClick={() => onRemoveNote(note.id)}
                        className={`icon-button icon-button-${theme} trash`}
                    >
                        <FiTrash />
                    </button>
                </div>
            </div>
            <div className="note-card-content">
                <Typography className={classes.text}>
                    {parse(note.text)}
                </Typography>
            </div>
            <div className="note-card-date">
                {Object.keys(note.date).length === 0 ?
                    <Typography
                        color="textSecondary"
                        className={classes.text}
                        variant="caption"
                    >
                        {moment(note.date).format('DD/MM/YY HH:mm:ss')}
                    </Typography>
                    :
                    <Typography
                        color="textSecondary"
                        className={classes.text}
                        variant="caption"
                    >
                        {moment.unix(note.date.seconds).format('DD/MM/YY HH:mm:ss')}
                    </Typography>
                }
            </div>
        </div>
    )
}

export default NoteCard;