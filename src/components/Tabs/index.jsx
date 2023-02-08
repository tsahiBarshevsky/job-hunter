import React from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { Typography, Badge, Divider } from '@mui/material';
import { GoInfo, GoListUnordered } from 'react-icons/go';
import { SlNotebook } from 'react-icons/sl';
import { FiUsers } from 'react-icons/fi';
import './tabs.sass';

const useStyles = makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`,
            marginLeft: 7
        }
    }
}));

const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        right: -5,
        fontFamily: `'Poppins', sans-serif`,
        fontSize: 12,
        color: 'white',
        backgroundColor: '#1d5692'
    },
}));

const Tabs = ({ activeTab, setActiveTab, job }) => {
    const activites = job.activites.length;
    const notes = job.notes.length;
    const contacts = job.contacts.length;
    const classes = useStyles();

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
                    <Typography className={classes.text} variant="subtitle2">Job Info</Typography>
                </li>
                <li
                    onClick={() => onChangeTab('tab2')}
                    className={activeTab === 'tab2' ? "active" : undefined}
                >
                    <StyledBadge badgeContent={activites} max={9}>
                        <GoListUnordered size={20} />
                        <Typography className={classes.text} variant="subtitle2">Activities</Typography>
                    </StyledBadge>
                </li>
                <li
                    onClick={() => onChangeTab('tab3')}
                    className={activeTab === 'tab3' ? "active" : undefined}
                >
                    <StyledBadge badgeContent={notes} max={9}>
                        <SlNotebook size={20} />
                        <Typography className={classes.text} variant="subtitle2">Notes</Typography>
                    </StyledBadge>
                </li>
                <li
                    onClick={() => onChangeTab('tab4')}
                    className={activeTab === 'tab4' ? "active" : undefined}
                >
                    <StyledBadge badgeContent={contacts} max={9}>
                        <FiUsers size={20} />
                        <Typography className={classes.text} variant="subtitle2">Contacts</Typography>
                    </StyledBadge>
                </li>
            </ul>
            <Divider />
        </div>
    )
}

export default Tabs;