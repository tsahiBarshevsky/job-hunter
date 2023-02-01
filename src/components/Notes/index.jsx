import React, { useState } from 'react';
import update from 'immutability-helper';
import { TextField, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor as TextEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toolbar } from '../../utils/constants';
import NoteCard from '../Note Card';
import { addNewNote, removeNote } from '../../store/actions/jobs';
import './notes.sass';

// Firebase
import { db } from '../../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore/lite';

const Notes = ({ job, setJob }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const jobs = useSelector(state => state.jobs);
    const dispatch = useDispatch();

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
            setTitle('');
            setText('');
        }
        catch (error) {
            console.log(error.message);
        }
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
            <Button variant="contained" onClick={onAddNewNote}>Add note</Button>
            <div className="notes">
                {Object.keys(job).length > 0 &&
                    job.notes.map((note) => {
                        return (
                            <NoteCard
                                key={note.id}
                                note={note}
                                onRemoveNote={onRemoveNote}
                            />
                        )
                    })}
            </div>
        </div>
    )
}

export default Notes;