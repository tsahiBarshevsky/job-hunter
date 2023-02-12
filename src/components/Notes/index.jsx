import React, { useState } from 'react';
import update from 'immutability-helper';
import { toast } from 'react-toastify';
import { TextField, Button, Divider } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor as TextEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toolbar } from '../../utils/constants';
import { addNewNote, removeNote, updateNote } from '../../store/actions/jobs';
import NoteCard from '../Note Card';
import useStyles from './styles';
import './notes.sass';

// Firebase
import { db } from '../../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore/lite';
import clsx from 'clsx';

const Notes = ({ job, setJob }) => {
    const [mode, setMode] = useState('insertion');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [noteID, setNoteID] = useState('');
    const jobs = useSelector(state => state.jobs);
    const dispatch = useDispatch();
    const classes = useStyles();

    const resetForm = () => {
        setTitle('');
        setText('');
    }

    const onCancelEditMode = () => {
        setMode('insertion');
        resetForm();
    }

    const onAddNewNote = async (event) => {
        event.preventDefault();
        const jobRef = doc(db, "jobs", job.id);
        const note = {
            id: uuidv4(),
            title: title,
            text: text,
            date: new Date()
        };
        try {
            const step = {
                action: `Note added: ${title}`,
                date: new Date()
            };
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            const updatedJob = update(job, {
                notes: { $push: [note] },
                timeline: { $push: [step] }
            });
            await updateDoc(jobRef, {
                notes: updatedJob.notes,
                timeline: updatedJob.timeline
            });
            dispatch(addNewNote(job.status, index, note));
            setJob(updatedJob);
            resetForm();
        }
        catch (error) {
            console.log(error.message);
            toast.error('An unexpected error occurred');
        }
    }

    const onEditNote = async (event) => {
        event.preventDefault();
        const jobRef = doc(db, "jobs", job.id);
        const note = {
            title: title,
            text: text
        };
        try {
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            const noteIndex = job.notes.findIndex((item) => item.id === noteID);
            const updatedJob = update(job, {
                notes: {
                    [noteIndex]: {
                        $merge: {
                            title: title,
                            text: text
                        }
                    }
                }
            });
            await updateDoc(jobRef, { notes: updatedJob.notes });
            dispatch(updateNote(job.status, index, note, noteIndex));
            setJob(updatedJob);
            onCancelEditMode();
        }
        catch (error) {
            console.log(error.message);
            toast.error('An unexpected error occurred');
        }
    }

    const onRemoveNote = async (id) => {
        const jobRef = doc(db, "jobs", job.id);
        try {
            const step = {
                action: `Note deleted`,
                date: new Date()
            };
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            const noteIndex = job.notes.findIndex((item) => item.id === id);
            const updatedJob = update(job, {
                notes: { $splice: [[noteIndex, 1]] },
                timeline: { $push: [step] }
            });
            await updateDoc(jobRef, {
                notes: updatedJob.notes,
                timeline: updatedJob.timeline
            });
            dispatch(removeNote(job.status, index, noteIndex));
            setJob(updatedJob);
        }
        catch (error) {
            console.log(error.message);
            toast.error('An unexpected error occurred');
        }
    }

    return (
        <div className="notes-container">
            <form onSubmit={mode === 'insertion' ? onAddNewNote : onEditNote}>
                <div className="text-editor">
                    <TextField
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoComplete="off"
                        placeholder="Note Title"
                        variant="standard"
                        className={classes.input}
                        sx={{
                            input: {
                                color: '#000000CC',
                            },
                        }}
                        InputProps={{
                            disableUnderline: true,
                            classes: {
                                input: classes.text
                            }
                        }}
                    />
                    <TextEditor
                        editor={ClassicEditor}
                        data={text ? text : ''}
                        config={{ toolbar: toolbar, placeholder: 'Take a note...' }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setText(data);
                        }}
                    />
                    <div className="buttons">
                        {mode === 'insertion' ?
                            <Button
                                variant="contained"
                                type="submit"
                                className={classes.button}
                            >
                                Save
                            </Button>
                            :
                            <div>
                                <Button
                                    variant="contained"
                                    onClick={onCancelEditMode}
                                    className={classes.button}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={onEditNote}
                                    className={clsx(classes.button, classes.cancel)}
                                >
                                    Save
                                </Button>
                            </div>
                        }
                    </div>
                </div>
            </form>
            {Object.keys(job.notes).length > 0 &&
                <Divider className={classes.divider} />
            }
            <div className="notes">
                {Object.keys(job).length > 0 &&
                    job.notes.map((note) => {
                        return (
                            <NoteCard
                                key={note.id}
                                note={note}
                                setMode={setMode}
                                setTitle={setTitle}
                                setText={setText}
                                setNoteID={setNoteID}
                                onRemoveNote={onRemoveNote}
                            />
                        )
                    })}
            </div>
        </div>
    )
}

export default Notes;