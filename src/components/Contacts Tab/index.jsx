import React, { useEffect, useState, useContext } from 'react';
import clsx from 'clsx';
import update from 'immutability-helper';
import { toast } from 'react-toastify';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeContext } from '../../utils/themeContext';
import { useAuth } from '../../utils/context';
import { removeContact, addStepToTimeline } from '../../store/actions/jobs';
import ContactCard from '../Contact Card';
import './contactsTab.sass';

// Firebase
import { db } from '../../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore/lite';

const useStlyes = makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`
        }
    },
    bold: {
        '&&': {
            fontWeight: 'bold'
        }
    },
}));

const ContactsTab = ({ displayName, setMode, setJob, setSelectedContact, setOpenContactDialog, setContactOrigin }) => {
    const { user } = useAuth();
    const { theme } = useContext(ThemeContext);
    const [contacts, setContacts] = useState([]);
    const jobs = useSelector(state => state.jobs);
    const location = useLocation();
    const dispatch = useDispatch();
    const classes = useStlyes();

    const onOpenContactDialog = (mode, contact, jobID, status) => {
        const job = jobs[status].items.find((item) => item.id === jobID);
        setJob(job);
        setMode(mode);
        setSelectedContact(contact);
        setContactOrigin('contacs');
        setTimeout(() => {
            setOpenContactDialog(true);
        }, 100);
    }

    const onRemoveContact = async (contact, jobID, status) => {
        const job = jobs[status].items.find((item) => item.id === jobID);
        const jobRef = doc(db, "jobs", job.id);
        try {
            const step = {
                action: 'Contact deleted',
                date: new Date()
            };
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            const contactIndex = job.contacts.findIndex((item) => item.id === contact.id);
            const updatedJob = update(job, {
                contacts: { $splice: [[contactIndex, 1]] },
                timeline: { $push: [step] }
            });
            if (location.pathname !== '/demo') {
                await updateDoc(jobRef, {
                    contacts: updatedJob.contacts,
                    timeline: updatedJob.timeline
                });
            }
            dispatch(removeContact(job.status, index, contactIndex));
            dispatch(addStepToTimeline(job.status, index, step));
            setJob(updatedJob);
        }
        catch (error) {
            console.log(error.message);
            toast.error('An unexpected error occurred');
        }
    }

    useEffect(() => {
        const arr = [];
        Object.keys(jobs).forEach((status) => {
            jobs[status].items.map((job) =>
                job.contacts.length > 0 &&
                arr.push({ jobID: job.id, status: job.status, company: job.company, contacts: job.contacts })
            );
        });
        setContacts(arr.flat());
    }, [jobs]);

    return (
        <div className={`contacts-tab-container contacts-tab-container-${theme}`}>
            <div className="contacts-tab-header">
                {!displayName ?
                    <Typography
                        variant="h6"
                        className={clsx(classes.text, classes.bold)}
                    >
                        {user.displayName ? user.displayName : user.email}'s contacts
                    </Typography>
                    :
                    <Typography
                        variant="h6"
                        className={clsx(classes.text, classes.bold)}
                    >
                        {displayName}'s contacts
                    </Typography>
                }
            </div>
            <div className="cards">
                {contacts.map((item, index) => {
                    return (
                        item.contacts.map((contact) => {
                            return (
                                <ContactCard
                                    key={contact.id}
                                    contact={contact}
                                    company={item.company}
                                    onOpenContactDialog={() => onOpenContactDialog('editing', contact, item.jobID, item.status)}
                                    onRemoveContact={() => onRemoveContact(contact, item.jobID, item.status)}
                                />
                            )
                        })
                    )
                })}
            </div>
        </div>
    )
}

export default ContactsTab;