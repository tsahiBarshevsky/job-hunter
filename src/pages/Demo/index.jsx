import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment/moment';
import { useLocation } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../../utils/themeContext';
import './demo.sass';

// Components
import {
    ActivityDialog,
    AlertDialog,
    ContactDialog,
    InsertionDialog,
    JobDialog,
    Jobs,
    Sidebar,
    Stats
} from '../../components';

const DemoPage = () => {
    const { theme } = useContext(ThemeContext);
    const { state } = useLocation();
    const { displayName } = state || {};
    const [loaded, setLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('tab1');
    const [currentYear, setCurrentYear] = useState(moment().year());
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [job, setJob] = useState({});
    const [mode, setMode] = useState('');
    const [selectedContact, setSelectedContact] = useState({});
    const [openInsertionDialog, setOpenInsertionDialog] = useState(false);
    const [openJobDialog, setOpenJobDialog] = useState(false);
    const [openContactDialog, setOpenContactDialog] = useState(false);
    const [openActivityDialog, setOpenActivityDialog] = useState(false);
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [origin, setOrigin] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = `Job Hunter | Demo board`;
        fetch('array.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                const data = json
                    .sort((a, b) => { return a.created - b.created })
                    .reduce((r, a) => {
                        r[a.status] = r[a.status] || [];
                        r[a.status].push(a);
                        return r;
                    }, Object.create(null));
                const columns = {
                    "Wishlist": {
                        name: "Wishlist",
                        items: data['Wishlist'] || []
                    },
                    "Applied": {
                        name: "Applied",
                        items: data['Applied'] || []
                    },
                    "In Progress": {
                        name: "In Progress",
                        items: data['In Progress'] || []
                    },
                    "Offered": {
                        name: "Offered",
                        items: data['Offered'] || []
                    },
                    "Rejected": {
                        name: "Rejected",
                        items: data['Rejected'] || []
                    },
                    "Accepted": {
                        name: "Accepted",
                        items: data['Accepted'] || []
                    },
                    "Not Answered": {
                        name: "Not Answered",
                        items: data['Not Answered'] || []
                    }
                };
                dispatch({ type: 'SET_JOBS', jobs: columns });
                dispatch({ type: 'SET_STATS', stats: json });

                // Get current week
                const now = moment();
                const weekStart = now.clone().startOf('week');
                const weekEnd = now.clone().endOf('week');
                dispatch({ type: 'SET_WEEK', week: { start: weekStart, end: weekEnd } });
                setTimeout(() => {
                    setLoaded(true);
                }, 500);
            })
            .catch((error) => {
                console.log(error.message);
                toast.error('An unexpected error occurred');
            });
    }, [dispatch]);

    return loaded ? (
        <>
            <div className="demo-container">
                <Sidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    displayName={displayName ? displayName : "User demo"}
                />
                {activeTab === 'tab1' ?
                    <Jobs
                        setJob={setJob}
                        setOpenInsertionDialog={setOpenInsertionDialog}
                        setOpenJobDialog={setOpenJobDialog}
                        setOpenAlertDialog={setOpenAlertDialog}
                        setOrigin={setOrigin}
                        displayName={displayName ? displayName : "User demo"}
                    />
                    :
                    <Stats
                        currentYear={currentYear}
                        setCurrentYear={setCurrentYear}
                        entriesPerPage={entriesPerPage}
                        setEntriesPerPage={setEntriesPerPage}
                        displayName={displayName ? displayName : "User demo"}
                    />
                }
            </div>
            {/* Dialogs */}
            <InsertionDialog
                open={openInsertionDialog}
                setOpen={setOpenInsertionDialog}
            />
            <JobDialog
                job={job}
                setJob={setJob}
                setMode={setMode}
                setSelectedContact={setSelectedContact}
                open={openJobDialog}
                setOpen={setOpenJobDialog}
                setOpenActivityDialog={setOpenActivityDialog}
                setOpenContactDialog={setOpenContactDialog}
                setOpenAlertDialog={setOpenAlertDialog}
                setOrigin={setOrigin}
            />
            <ActivityDialog
                open={openActivityDialog}
                setOpen={setOpenActivityDialog}
                job={job}
                setJob={setJob}
                setOpenJobDialog={setOpenJobDialog}
            />
            <ContactDialog
                mode={mode}
                selectedContact={selectedContact}
                job={job}
                setJob={setJob}
                open={openContactDialog}
                setOpen={setOpenContactDialog}
                setOpenJobDialog={setOpenJobDialog}
            />
            <AlertDialog
                open={openAlertDialog}
                setOpen={setOpenAlertDialog}
                job={job}
                setJob={setJob}
                setOpenJobDialog={setOpenJobDialog}
                origin={origin}
            />
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme}
            />
        </>
    ) : (
        <>
            <div className={`loading-container loading-container-${theme}`}>
                <PropagateLoader color={theme === 'light' ? 'black' : 'white'} />
            </div>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme}
            />
        </>
    )
}

export default DemoPage;