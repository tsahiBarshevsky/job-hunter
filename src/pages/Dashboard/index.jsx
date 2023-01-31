import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../utils/context';
import { InsertionDialog, JobDialog, Jobs, Sidebar } from '../../components';
import './dashboard.sass';

// Firebase
import { collection, query, where, getDocs } from 'firebase/firestore/lite';
import { db } from '../../utils/firebase';

const DashbaordPage = () => {
    const { user } = useAuth();
    const [job, setJob] = useState({});
    const [openInsertionDialog, setOpenInsertionDialog] = useState(false);
    const [openJobDialog, setOpenJobDialog] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchData = useCallback(async () => {
        const jobsRef = collection(db, "jobs");
        const q = query(jobsRef, where("owner", "==", user.uid));
        try {
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => doc.data()).reduce((r, a) => {
                r[a.status] = r[a.status] || [];
                r[a.status].push(a);
                return r;
            }, Object.create(null));
            const columns = {
                "Wishlist": {
                    name: "Wishlist",
                    items: data['Wishlist'] ? data['Wishlist'] : []
                },
                "Applied": {
                    name: "Applied",
                    items: data['Applied'] ? data['Applied'] : []
                },
                "In Progress": {
                    name: "In Progress",
                    items: data['In Progress'] ? data['In Progress'] : []
                },
                "Offered": {
                    name: "Offered",
                    items: data['Offered'] ? data['Offered'] : []
                },
                "Rejected": {
                    name: "Rejected",
                    items: data['Rejected'] ? data['Rejected'] : []
                },
                "Accepted": {
                    name: "Accepted",
                    items: data['Accepted'] ? data['Accepted'] : []
                },
                "Not Answered": {
                    name: "Not Answered",
                    items: data['Not Answered'] ? data['Wishlist'] : []
                }
            };
            dispatch({ type: 'SET_JOBS', jobs: columns });
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

    return user && (
        <>
            <div className="dashboard-container">
                <Sidebar />
                <Jobs
                    setJob={setJob}
                    setOpenInsertionDialog={setOpenInsertionDialog}
                    setOpenJobDialog={setOpenJobDialog}
                />
            </div>
            <InsertionDialog
                open={openInsertionDialog}
                setOpen={setOpenInsertionDialog}
            />
            <JobDialog
                job={job}
                setJob={setJob}
                open={openJobDialog}
                setOpen={setOpenJobDialog}
            />
        </>
    )
}

export default DashbaordPage;