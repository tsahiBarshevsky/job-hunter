import { Typography } from '@mui/material';
import React from 'react';
import { GoInfo, GoListUnordered } from 'react-icons/go';
import { SlNotebook } from 'react-icons/sl';
import { FiUsers } from 'react-icons/fi';
import './tabs.sass';

const Tabs = ({ activeTab, setActiveTab }) => {
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
                    <Typography variant="subtitle2">Activity</Typography>
                </li>
                <li
                    onClick={() => onChangeTab('tab3')}
                    className={activeTab === 'tab3' ? "active" : undefined}
                >
                    <SlNotebook size={20} />
                    <Typography variant="subtitle2">Notes</Typography>
                </li>
                <li
                    onClick={() => onChangeTab('tab4')}
                    className={activeTab === 'tab4' ? "active" : undefined}
                >
                    <FiUsers size={20} />
                    <Typography variant="subtitle2">Contacts</Typography>
                </li>
            </ul>
        </div>
    )
}

export default Tabs;