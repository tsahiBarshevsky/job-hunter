import React, { useEffect, useState } from 'react';
import update from 'immutability-helper';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, Button, IconButton, TextField, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import { addNewContact, addStepToTimeline, updateContact } from '../../store/actions/jobs';
import useStyles from './styles';
import './contactDialog.sass';

// Firebase
import { db } from '../../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore/lite';

const ContactDialog = ({ mode, selectedContact, job, setJob, open, setOpen, setOpenJobDialog }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [facebook, setFacebook] = useState('');
    const jobs = useSelector(state => state.jobs);
    const classes = useStyles();
    const dispatch = useDispatch();

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
        setLinkedin('');
        setFacebook('');
    }

    const handleClose = () => {
        setOpen(false);
        setOpenJobDialog(true);
        resetForm();
    }

    const onAddNewContact = async (event) => {
        event.preventDefault();
        const jobRef = doc(db, "jobs", job.id);
        const contact = {
            id: uuidv4(),
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            linkedin: linkedin,
            facebook: facebook
        };
        try {
            const step = {
                action: `Contact added: ${firstName} ${lastName}`,
                date: new Date()
            };
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            const updatedJob = update(job, {
                contacts: { $push: [contact] },
                timeline: { $push: [step] }
            });
            await updateDoc(jobRef, {
                contacts: updatedJob.contacts,
                timeline: updatedJob.timeline
            });
            dispatch(addNewContact(job.status, index, contact));
            dispatch(addStepToTimeline(job.status, index, step));
            setJob(updatedJob);
            resetForm();
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const onEditContact = async (event) => {
        event.preventDefault();
        const jobRef = doc(db, "jobs", job.id);
        const contact = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            linkedin: linkedin,
            facebook: facebook
        };
        try {
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            const contactIndex = job.contacts.findIndex((item) => item.id === selectedContact.id);
            const updatedJob = update(job, {
                contacts: {
                    [contactIndex]: {
                        $merge: {
                            firstName: firstName,
                            lastName: lastName,
                            phone: phone,
                            email: email,
                            linkedin: linkedin,
                            facebook: facebook
                        }
                    }
                }
            });
            await updateDoc(jobRef, { contacts: updatedJob.contacts });
            dispatch(updateContact(job.status, index, contact, contactIndex));
            setJob(updatedJob);
            handleClose();
        }
        catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (mode === 'editing') {
            setFirstName(selectedContact.firstName);
            setLastName(selectedContact.lastName);
            setPhone(selectedContact.phone);
            setEmail(selectedContact.email);
            setLinkedin(selectedContact.linkedin);
            setFacebook(selectedContact.facebook);
        }
    }, [mode, selectedContact]);

    return Object.keys(job).length > 0 && (
        <Dialog
            open={open}
            onClose={handleClose}
            classes={{ paper: classes.paper }}
            className={classes.dialog}
        >
            <DialogTitle className={classes.title}>
                <div className="title-items">
                    {mode === 'insertion' ?
                        <Typography variant="h6">Add contact for {job.title}</Typography>
                        :
                        <Typography variant="h6">Edit contact for {job.title}</Typography>
                    }
                    <IconButton
                        onClick={handleClose}
                        size="small"
                        disableRipple
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={mode === 'insertion' ? onAddNewContact : onEditContact}>
                    <div className="input-title">
                        <Typography variant="subtitle1">First Name</Typography>
                        <Typography variant="caption">Required</Typography>
                    </div>
                    <TextField
                        required
                        autoFocus
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        variant="outlined"
                        className={classes.input}
                        autoComplete="off"
                        placeholder="First Name"
                    />
                    <div className="input-title">
                        <Typography variant="subtitle1">Last Name</Typography>
                        <Typography variant="caption">Required</Typography>
                    </div>
                    <TextField
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        variant="outlined"
                        className={classes.input}
                        autoComplete="off"
                        placeholder="Last Name"
                    />
                    <div className="input-title">
                        <Typography variant="subtitle1">Phone</Typography>
                    </div>
                    <TextField
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        variant="outlined"
                        className={classes.input}
                        autoComplete="off"
                        placeholder="Phone"
                        inputProps={{ maxLength: 10 }}
                    />
                    <div className="input-title">
                        <Typography variant="subtitle1">Email</Typography>
                    </div>
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        className={classes.input}
                        autoComplete="off"
                        placeholder="Email"
                    />
                    <Typography variant="subtitle1">Social Media</Typography>
                    <div className="social-media-container">
                        <TextField
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            variant="standard"
                            className={classes.input}
                            autoComplete="off"
                            placeholder="Linkedin"
                            InputProps={{ startAdornment: <FaLinkedinIn />, disableUnderline: true }}
                        />
                        <TextField
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                            variant="standard"
                            // className={classes.input}
                            autoComplete="off"
                            placeholder="Facebook"
                            InputProps={{ startAdornment: <FaFacebookF />, disableUnderline: true }}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        className={classes.button}
                    >
                        {mode === 'insertion' ?
                            'Add Contact'
                            :
                            'Save Changes'
                        }
                    </Button>
                </form>
            </DialogContent>
        </Dialog >
    )
}

export default ContactDialog;