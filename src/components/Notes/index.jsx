import React, { useState } from 'react';
import update from 'immutability-helper';
import { TextField, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor as TextEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toolbar } from '../../utils/constants';
import NoteCard from '../Note Card';
import { addNewNote, removeNote, updateNote } from '../../store/actions/jobs';
import './notes.sass';

// Firebase
import { db } from '../../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore/lite';

const Notes = ({ job, setJob }) => {
    const [mode, setMode] = useState('insertion');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [noteID, setNoteID] = useState('');
    const jobs = useSelector(state => state.jobs);
    const dispatch = useDispatch();

    const resetForm = () => {
        setTitle('');
        setText('');
    }

    const onCancelEditMode = () => {
        setMode('insertion');
        resetForm();
    }

    const onAddNewNote = async () => {
        const jobRef = doc(db, "jobs", job.id);
        const note = {
            id: uuidv4(),
            title: title,
            text: text
        };
        try {
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            const updatedJob = update(job, { notes: { $push: [note] } });
            await updateDoc(jobRef, { notes: updatedJob.notes });
            dispatch(addNewNote(job.status, index, note));
            setJob(updatedJob);
            resetForm();
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const onEditNote = () => {
        const note = {
            title: title,
            text: text
        };
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
        dispatch(updateNote(job.status, index, note, noteIndex));
        setJob(updatedJob);
        onCancelEditMode();
    }

    const onRemoveNote = async (id) => {
        const jobRef = doc(db, "jobs", job.id);
        try {
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            const noteIndex = job.notes.findIndex((item) => item.id === id);
            const updatedJob = update(job, { notes: { $splice: [[noteIndex, 1]] } });
            await updateDoc(jobRef, { notes: updatedJob.notes });
            dispatch(removeNote(job.status, index, noteIndex));
            setJob(updatedJob);
        }
        catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="notes-container">
            <TextField
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
                autoComplete="off"
                placeholder="Note Title"
            // className={classes.input}
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
            {mode === 'insertion' ?
                <Button variant="contained" onClick={onAddNewNote}>Add note</Button>
                :
                <div>
                    <Button variant="contained" onClick={onCancelEditMode}>Cancel</Button>
                    <Button variant="contained" onClick={onEditNote}>Save changes</Button>
                </div>
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