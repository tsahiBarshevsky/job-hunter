import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { TextField, Typography, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useSelector, useDispatch } from 'react-redux';
import { CKEditor as TextEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { updateJob } from '../../store/actions/jobs';
import { updateStat } from '../../store/actions/stats';
import { toolbar } from '../../utils/constants';
import { ThemeContext } from '../../utils/themeContext';
import useStyles from './styles';
import './jobInfo.sass';

// Firebase
import { db } from '../../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore/lite';

const JobInfo = ({ job, handleClose, setOpenAlertDialog, setOrigin }) => {
    const { theme } = useContext(ThemeContext);
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(null);
    const jobs = useSelector(state => state.jobs);
    const stats = useSelector(state => state.stats);
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
                deadline: deadline ? new Date(deadline) : null
            });
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            const statIndex = stats.findIndex((item) => item.id === job.id);
            const editedJob = {
                title: title,
                company: company,
                location: location,
                salary: salary,
                url: url,
                description: description,
                deadline: deadline ? new Date(deadline) : null
            };
            dispatch(updateJob(job.status, index, editedJob)); // Update store
            dispatch(updateStat(statIndex, title, company, url)); // Update store
            handleClose();
            toast.success(`${title} edited successfully`);
        }
        catch (error) {
            console.log(error.message);
            toast.error('An unexpected error occurred');
        }
    }

    const onRemoveJob = () => {
        setOpenAlertDialog(true);
        setOrigin('dialog');
        handleClose();
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
                        <Typography className={classes.text} variant="subtitle1">Job Title</Typography>
                    </div>
                    <TextField
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="outlined"
                        autoComplete="off"
                        placeholder="Job Title"
                        className={classes.input}
                        InputProps={{
                            classes: {
                                input: classes.text
                            }
                        }}
                    />
                </div>
                <div className="input-wrapper space-left">
                    <div className="input-title">
                        <Typography className={classes.text} variant="subtitle1">Company</Typography>
                    </div>
                    <TextField
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        variant="outlined"
                        autoComplete="off"
                        placeholder="Company"
                        className={classes.input}
                        InputProps={{
                            classes: {
                                input: classes.text
                            }
                        }}
                    />
                </div>
                <div className="input-wrapper space-right">
                    <div className="input-title">
                        <Typography className={classes.text} variant="subtitle1">Location</Typography>
                    </div>
                    <TextField
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        variant="outlined"
                        autoComplete="off"
                        placeholder="Location"
                        className={classes.input}
                        InputProps={{
                            classes: {
                                input: classes.text
                            }
                        }}
                    />
                </div>
                <div className="input-wrapper space-left">
                    <div className="input-title">
                        <Typography className={classes.text} variant="subtitle1">Salary</Typography>
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
                        InputProps={{
                            classes: {
                                input: classes.text
                            }
                        }}
                    />
                </div>
                <div className="input-wrapper space-right">
                    <div className="input-title">
                        <Typography className={classes.text} variant="subtitle1">URL</Typography>
                    </div>
                    <TextField
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        variant="outlined"
                        autoComplete="off"
                        placeholder="URL"
                        className={classes.input}
                        InputProps={{
                            classes: {
                                input: classes.text
                            }
                        }}
                    />
                </div>
                <div className="input-wrapper space-left">
                    <div className="input-title">
                        <Typography className={classes.text} variant="subtitle1">Deadline</Typography>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            value={deadline}
                            inputFormat="DD/MM/YYYY"
                            onChange={(value) => setDeadline(moment(value))}
                            InputProps={{
                                classes: {
                                    input: classes.text
                                }
                            }}
                            renderInput={(params) => {
                                return (
                                    <TextField
                                        {...params}
                                        inputProps={{
                                            ...params.inputProps,
                                            placeholder: "DD/MM/YYYY",
                                        }}
                                    />
                                )
                            }}
                        />
                    </LocalizationProvider>
                </div>
                <div style={{ cursor: 'default' }}>
                    <Typography className={classes.text} variant="subtitle1">Description</Typography>
                </div>
                <div className="text-editor">
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
                <div className="buttons">
                    <Button
                        disableRipple
                        className={clsx(classes.delete, theme === 'light' ? classes.deleteLight : classes.deleteDark)}
                        onClick={onRemoveJob}
                        variant="contained"
                    >
                        Delete job
                    </Button>
                    <Button
                        className={classes.saveChanges}
                        type="submit"
                        variant="contained"
                    >
                        Save changes
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default JobInfo;