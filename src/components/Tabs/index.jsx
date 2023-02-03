import React from 'react';
import { Typography, Badge } from '@mui/material';
import { GoInfo, GoListUnordered } from 'react-icons/go';
import { SlNotebook } from 'react-icons/sl';
import { FiUsers } from 'react-icons/fi';
import './tabs.sass';

const Tabs = ({ activeTab, setActiveTab, job }) => {
    const notes = job.notes.length;
    const contacts = job.contacts.length;

    const onChangeTab = (tab) => {
        setActiveTab(tab);
    }

    return (
        <div className="tabs-container">
            <ul className="tabs-links">
                <li
                    onClick={() => onChangeTab('tab1')}
                    className={activeTab === 'tab1' ? "active" : undefined}
                >
                    <GoInfo size={22} />
                    <Typography variant="subtitle2">Job Info</Typography>
                </li>
                <li
                    onClick={() => onChangeTab('tab2')}
                    className={activeTab === 'tab2' ? "active" : undefined}
                >
                    <GoListUnordered size={20} />
                    <Typography variant="subtitle2">Activities</Typography>
                </li>
                <li
                    onClick={() => onChangeTab('tab3')}
                    className={activeTab === 'tab3' ? "active" : undefined}
                >
                    <Badge
                        badgeContent={notes}
                        color="primary"
                    >
                        <SlNotebook size={20} />
                        <Typography variant="subtitle2">Notes</Typography>
                    </Badge>
                </li>
                <li
                    onClick={() => onChangeTab('tab4')}
                    className={activeTab === 'tab4' ? "active" : undefined}
                >
                    <Badge
                        badgeContent={contacts}
                        color="primary"
                    >
                        <FiUsers size={20} />
                        <Typography variant="subtitle2">Contacts</Typography>
                    </Badge>
                </li>
            </ul>
        </div>
    )
}

export default Tabs;