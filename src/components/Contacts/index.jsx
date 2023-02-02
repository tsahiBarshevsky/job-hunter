import React from 'react';
import { Button, Typography } from '@mui/material';
import './contacts.sass';
import ContactCard from '../Contact Card';

const Contacts = ({ job, setOpenJobDialog, setOpenContactDialog }) => {
    const onOpenContactDialog = () => {
        setOpenJobDialog(false);
        setOpenContactDialog(true);
    }

    return Object.keys(job).length > 0 && (
        <div className="contacts-container">
            {job.contacts.length === 0 ?
                <div>
                    <Typography>You have not added any contacts to this job yet.</Typography>
                    <Button variant="contained" onClick={onOpenContactDialog}>Create contact</Button>
                </div>
                :
                <div>
                    <Button variant="contained" onClick={onOpenContactDialog}>Create contact</Button>
                    {job.contacts.map((contact) => {
                        return (
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Contacts;