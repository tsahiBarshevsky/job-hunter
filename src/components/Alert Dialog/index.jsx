import React, { useContext } from "react";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { Dialog, DialogTitle, DialogContent, Button, Typography } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { removeJob } from '../../store/actions/jobs';
import { removeStat } from '../../store/actions/stats';
import { ThemeContext } from "../../utils/themeContext";
import useStyles from './styles';

// Firebase
import { db } from '../../utils/firebase';
import { doc, deleteDoc } from 'firebase/firestore/lite';

const AlertDialog = ({ open, setOpen, job, setJob, setOpenJobDialog, origin }) => {
    const { theme } = useContext(ThemeContext);
    const jobs = useSelector(state => state.jobs);
    const stats = useSelector(state => state.stats);
    const location = useLocation();
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
        if (origin === 'dialog')
            setOpenJobDialog(true);
    }

    const onRemoveJob = async () => {
        try {
            const title = job.title;
            if (location.pathname !== '/demo')
                await deleteDoc(doc(db, "jobs", job.id));
            const index = jobs[job.status].items.findIndex((item) => item.id === job.id);
            const statIndex = stats.findIndex((item) => item.id === job.id);
            dispatch(removeJob(job.status, index)); // Update store
            dispatch(removeStat(statIndex)); // Update store
            setOpen(false);
            setJob({});
            toast.success(`${title} deleted successfully`);
        }
        catch (error) {
            console.log(error.message);
            toast.error('An unexpected error occurred');
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            classes={{ paper: classes.paper }}
            className={classes.dialog}
        >
            <DialogTitle className={classes.text}>Delete job?</DialogTitle>
            <DialogContent>
                <Typography className={classes.text}>
                    Are you sure you want to delete {job.title}? You can't undo this action.
                    All activities, notes and contacts you've added to this job will be deleted too.
                </Typography>
                <div className={classes.buttons}>
                    <Button
                        disableRipple
                        className={clsx(classes.cancel, theme === 'light' ? classes.cancelLight : classes.cancelDark)}
                        variant="contained"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        className={classes.delete}
                        variant="contained"
                        onClick={onRemoveJob}
                    >
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AlertDialog;