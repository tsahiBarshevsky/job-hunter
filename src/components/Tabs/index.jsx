import { Typography } from '@mui/material';
import React from 'react';
import { GoInfo, GoListUnordered } from 'react-icons/go';
import { SlNotebook } from 'react-icons/sl';
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
                    className={activeTab === 'tab1' && "active"}
                >
                    <GoInfo size={22} />
                    <Typography variant="subtitle2">Job Info</Typography>
                </li>
                <li
                    onClick={() => onChangeTab('tab2')}
                    className={activeTab === 'tab2' && "active"}
                >
                    <GoListUnordered size={20} />
                    <Typography variant="subtitle2">Activity</Typography>
                </li>
                <li
                    onClick={() => onChangeTab('tab3')}
                    className={activeTab === 'tab3' && "active"}
                >
                    <SlNotebook size={20} />
                    <Typography variant="subtitle2">Notes</Typography>
                </li>
            </ul>
        </div>
    )
}

export default Tabs;