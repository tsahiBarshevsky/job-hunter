import React, { useEffect, useCallback, useState, } from 'react';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../utils/context';
import { ActivityDialog, AlertDialog, ContactDialog, InsertionDialog, JobDialog, Jobs, Sidebar, Stats } from '../../components';
import './dashboard.sass';

// Firebase
import { collection, query, where, getDocs } from 'firebase/firestore/lite';
import { db } from '../../utils/firebase';

const DashboardPage = () => {
    const { user } = useAuth();
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
    const jobs = useSelector(state => state.jobs);
    const week = useSelector(state => state.week);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchData = useCallback(async () => {
        const jobsRef = collection(db, "jobs");
        const q = query(jobsRef, where("owner", "==", user.uid));
        try {
            const querySnapshot = await getDocs(q);
            const data =
                querySnapshot.docs
                    .sort((a, b) => { return a.data().created - b.data().created })
                    .map((doc) => doc.data())
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

            // Build jobs array for data table and chart
            const arr = [];
            querySnapshot.docs
                .sort((a, b) => { return a.data().created - b.data().created })
                .forEach((doc) => {
                    const data = doc.data();
                    arr.push({
                        id: data.id,
                        created: data.created,
                        title: data.title,
                        company: data.company,
                        status: data.status,
                        link: data.url
                    });
                });
            dispatch({ type: 'SET_STATS', stats: arr });

            // Get current week
            const now = moment();
            const weekStart = now.clone().startOf('week');
            const weekEnd = now.clone().endOf('week');
            dispatch({ type: 'SET_WEEK', week: { start: weekStart, end: weekEnd } });
        }
        catch (error) {
            console.log(error.message);
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
        fetchData();
    }, [navigate, user, fetchData]);

    return user && Object.keys(jobs).length > 0 && Object.keys(week).length > 0 && (
        <>
            <div className="dashboard-container">
                <Sidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                {activeTab === 'tab1' ?
                    <Jobs
                        setJob={setJob}
                        setOpenInsertionDialog={setOpenInsertionDialog}
                        setOpenJobDialog={setOpenJobDialog}
                    />
                    :
                    <Stats
                        currentYear={currentYear}
                        setCurrentYear={setCurrentYear}
                        entriesPerPage={entriesPerPage}
                        setEntriesPerPage={setEntriesPerPage}
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
            />
        </>
    )
}

export default DashboardPage;