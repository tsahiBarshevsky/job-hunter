import React from 'react';
import update from 'immutability-helper';
import { Button, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact, addStepToTimeline } from '../../store/actions/jobs';
import ContactCard from '../Contact Card';
import './contacts.sass';

// Firebase
import { db } from '../../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore/lite';

const Contacts = ({ job, setJob, setMode, setSelectedContact, setOpenJobDialog, setOpenContactDialog }) => {
    const jobs = useSelector(state => state.jobs);
    const dispatch = useDispatch();

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
                <div>
                    <Typography>You have not added any contacts to this job yet.</Typography>
                    <Button variant="contained" onClick={() => onOpenContactDialog('insertion', {})}>Create contact</Button>
                </div>
                :
                <div>
                    <Button variant="contained" onClick={() => onOpenContactDialog('insertion', {})}>Create contact</Button>
                    {job.contacts.map((contact) => {
                        return (
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                                onRemoveContact={onRemoveContact}
                                onOpenContactDialog={onOpenContactDialog}
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Contacts;