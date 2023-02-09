import React from 'react';
import update from 'immutability-helper';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button, Typography } from '@mui/material';
import { FiUsers } from 'react-icons/fi';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact, addStepToTimeline } from '../../store/actions/jobs';
import ContactCard from '../Contact Card';
import './contacts.sass';

// Firebase
import { db } from '../../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore/lite';

const useStyles = makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`,
            textAlign: 'center'
        }
    },
    button: {
        '&&': {
            height: 40,
            borderRadius: 10,
            zIndex: 1,
            color: 'white',
            backgroundColor: '#1d5692',
            textTransform: 'capitalize',
            transition: '0.5s ease-out',
            fontFamily: `'Poppins', sans-serif`,
            margin: '10px 0',
            '&:hover': {
                backgroundColor: '#1d5692CC'
            }
        }
    }
}));

const Contacts = ({ job, setJob, setMode, setSelectedContact, setOpenJobDialog, setOpenContactDialog }) => {
    const jobs = useSelector(state => state.jobs);
    const dispatch = useDispatch();
    const classes = useStyles();

    const onOpenContactDialog = (mode, contact) => {
        setMode(mode);
        setSelectedContact(contact)
        setOpenJobDialog(false);
        setOpenContactDialog(true);
    }

    const onRemoveContact = async (id) => {
        const jobRef = doc(db, "jobs", job.id);
        try {
            const step = {
                action: 'Contact deleted',
                date: new Date()
            };
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            const contactIndex = job.contacts.findIndex((item) => item.id === id);
            const updatedJob = update(job, {
                contacts: { $splice: [[contactIndex, 1]] },
                timeline: { $push: [step] }
            });
            await updateDoc(jobRef, {
                contacts: updatedJob.contacts,
                timeline: updatedJob.timeline
            });
            dispatch(removeContact(job.status, index, contactIndex));
            dispatch(addStepToTimeline(job.status, index, step));
            setJob(updatedJob);
        }
        catch (error) {
            console.log(error.message)
        }
    }

    return Object.keys(job).length > 0 && (
        <div className="contacts-container">
            {job.contacts.length === 0 ?
                <div className="no-contacts">
                    <FiUsers className="icon" />
                    <Typography className={classes.text}>
                        You haven't added any contacts to this job yet.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => onOpenContactDialog('insertion', {})}
                        endIcon={<AddRoundedIcon />}
                        className={classes.button}
                    >
                        Add contact
                    </Button>
                </div>
                :
                <div>
                    <div className="button">
                        <Button
                            variant="contained"
                            onClick={() => onOpenContactDialog('insertion', {})}
                            endIcon={<AddRoundedIcon />}
                            className={classes.button}
                        >
                            Add contact
                        </Button>
                    </div>
                    <div className="contacts">
                        {job.contacts.map((contact) => {
                            return (
                                <ContactCard
                                    key={contact.id}
                                    contact={contact}
                                    company={job.company}
                                    onRemoveContact={onRemoveContact}
                                    onOpenContactDialog={onOpenContactDialog}
                                />
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default Contacts;