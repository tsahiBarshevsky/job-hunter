import React, { useContext } from "react";
import { Dialog, DialogTitle, DialogContent, Button, Typography } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { removeJob } from '../../store/actions/jobs';
import { removeStat } from '../../store/actions/stats';
import { ThemeContext } from "../../utils/themeContext";
import useStyles from './styles';

// Firebase
import { db } from '../../utils/firebase';
import { doc, deleteDoc } from 'firebase/firestore/lite';
import clsx from "clsx";

const AlertDialog = ({ open, setOpen, job, setJob, setOpenJobDialog, origin }) => {
    const { theme } = useContext(ThemeContext);
    const jobs = useSelector(state => state.jobs);
    const stats = useSelector(state => state.stats);
    const dispatch = useDispatch();
    const classes = useStyles();

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