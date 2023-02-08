import React from "react";
import { Dialog, DialogTitle, DialogContent, Button, Typography } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { removeJob } from '../../store/actions/jobs';
import { removeStat } from '../../store/actions/stats';

// Firebase
import { db } from '../../utils/firebase';
import { doc, deleteDoc } from 'firebase/firestore/lite';

const AlertDialog = ({ open, setOpen, job, setJob, setOpenJobDialog, origin }) => {
    const jobs = useSelector(state => state.jobs);
    const stats = useSelector(state => state.stats);
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        if (origin === 'dialog')
            setOpenJobDialog(true);
    }

    const onRemoveJob = async () => {
        try {
            await deleteDoc(doc(db, "jobs", job.id));
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            const statIndex = stats.findIndex((item) => item.id === job.id);
            dispatch(removeJob(job.status, index)); // Update store
            dispatch(removeStat(statIndex)); // Update store
            setOpen(false);
            setJob({});
        }
        catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Are you sure you want to delete {job.title}?</DialogTitle>
            <DialogContent>
                <Typography>All the data will be deleted.</Typography>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={onRemoveJob}>Delete</Button>
            </DialogContent>
        </Dialog>
    )
}

export default AlertDialog;