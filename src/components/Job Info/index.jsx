import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { TextField, Typography, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useSelector, useDispatch } from 'react-redux';
import { CKEditor as TextEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { removeJob, updateJob } from '../../store/actions/jobs';
import { toolbar } from '../../utils/constants';
import useStyles from './styles';
import './jobInfo.sass';

// Firebase
import { db } from '../../utils/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore/lite';

const JobInfo = ({ job, handleClose }) => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(null);
    const jobs = useSelector(state => state.jobs);
    const dispatch = useDispatch();
    const classes = useStyles();

    const onEditJob = async (event) => {
        event.preventDefault();
        const jobRef = doc(db, "jobs", job.id);
        try {
            // Update document on Firestore
            await updateDoc(jobRef, {
                title: title,
                company: company,
                location: location,
                salary: salary,
                url: url,
                description: description,
                deadline: new Date(deadline)
            });
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            const editedJob = {
                title: title,
                company: company,
                location: location,
                salary: salary,
                url: url,
                description: description,
                deadline: new Date(deadline)
            };
            dispatch(updateJob(job.status, index, editedJob)); // Update store
            handleClose();
        }
        catch (error) {
            console.log(error.message)
        }
    }

    const onRemoveJob = async () => {
        try {
            await deleteDoc(doc(db, "jobs", job.id));
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            dispatch(removeJob(job.status, index));
            handleClose();
        }
        catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        setTitle(job.title);
        setCompany(job.company);
        setLocation(job.location);
        setSalary(job.salary);
        setDescription(job.description);
        setUrl(job.url);
        if (job.deadline) {
            if (Object.keys(job.deadline).length === 0)
                setDeadline(moment(job.deadline)); // From store
            else
                setDeadline(moment.unix(job.deadline.seconds)); // From firebase
        }
    }, [job]);

    return (
        <div className="job-info-container">
            <form
                className="job-info-form"
                onSubmit={onEditJob}
            >
                <div className="input-wrapper space-right">
                    <div className="input-title">
                        <Typography variant="subtitle1">Job Title</Typography>
                    </div>
                    <TextField
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="outlined"
                        autoComplete="off"
                        placeholder="Job Title"
                        className={classes.input}
                    />
                </div>
                <div className="input-wrapper space-left">
                    <div className="input-title">
                        <Typography variant="subtitle1">Company</Typography>
                    </div>
                    <TextField
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        variant="outlined"
                        autoComplete="off"
                        placeholder="Company"
                        className={classes.input}
                    />
                </div>
                <div className="input-wrapper space-right">
                    <div className="input-title">
                        <Typography variant="subtitle1">Location</Typography>
                    </div>
                    <TextField
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        variant="outlined"
                        autoComplete="off"
                        placeholder="Location"
                        className={classes.input}
                    />
                </div>
                <div className="input-wrapper space-left">
                    <div className="input-title">
                        <Typography variant="subtitle1">Salary</Typography>
                    </div>
                    <TextField
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        variant="outlined"
                        type="number"
                        inputProps={{ min: 1 }}
                        autoComplete="off"
                        placeholder="Salary"
                        className={classes.input}
                    />
                </div>
                <div className="input-wrapper space-right">
                    <div className="input-title">
                        <Typography variant="subtitle1">URL</Typography>
                    </div>
                    <TextField
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        variant="outlined"
                        autoComplete="off"
                        placeholder="URL"
                        className={classes.input}
                    />
                </div>
                <div className="input-wrapper space-left">
                    <div className="input-title">
                        <Typography variant="subtitle1">Deadline</Typography>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            value={deadline}
                            inputFormat="DD/MM/YYYY"
                            onChange={(value) => setDeadline(moment(value))}
                            renderInput={(params) => {
                                return (
                                    <TextField
                                        {...params}
                                        inputProps={{
                                            ...params.inputProps,
                                            placeholder: "DD/MM/YYYY"
                                        }}
                                    />
                                )
                            }}
                        />
                    </LocalizationProvider>
                </div>
                <div className="text-editor">
                    <Typography variant="subtitle1">Description</Typography>
                    <TextEditor
                        editor={ClassicEditor}
                        data={description ? description : ''}
                        config={{ toolbar: toolbar, placeholder: 'Description' }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setDescription(data);
                        }}
                    />
                </div>
                <div>
                    <Button variant="contained" onClick={onRemoveJob}>Delete job</Button>
                    <Button type="submit" variant="contained">Save changes</Button>
                </div>
            </form>
        </div>
    )
}

export default JobInfo;