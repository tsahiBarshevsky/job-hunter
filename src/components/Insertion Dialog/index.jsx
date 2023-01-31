import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../utils/context';
import { addNewPosition } from '../../store/actions/jobs';
import useStyles from './styles.js';

// Material ui components
import {
    Button, Dialog, DialogContent, DialogTitle,
    TextField, Typography, FormControl,
    Select, MenuItem, InputLabel, IconButton
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// Firebase
import { db } from '../../utils/firebase';
import { doc, setDoc } from 'firebase/firestore/lite';

const InsertionDialog = ({ open, setOpen }) => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState('');
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
        setTitle('');
        setCompany('');
        setStatus('');
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    const onAddNewPosition = async (event) => {
        event.preventDefault();
        const position = {
            id: uuidv4(),
            owner: user.uid,
            title: title,
            company: company,
            status: status,
            location: null,
            salary: null,
            contact: null,
            url: null,
            notes: null,
            timeline: [{
                action: 'Job created',
                date: new Date()
            }]
        };
        try {
            await setDoc(doc(db, 'jobs', position.id), position); // Add new doc
            dispatch(addNewPosition(status, position)); // Update store
            handleClose();
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            classes={{ paper: classes.paper }}
            className={classes.dialog}
        >
            <DialogTitle className={classes.title}>
                <div className={classes.titleItems}>
                    <Typography variant="h6">Add New Position</Typography>
                    <IconButton
                        onClick={handleClose}
                        size="small"
                        disableRipple
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={onAddNewPosition}>
                    <TextField
                        required
                        autoFocus
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="outlined"
                        label="Position title"
                        className={classes.input}
                        autoComplete="off"
                    />
                    <TextField
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        variant="outlined"
                        label="Company"
                        className={classes.input}
                        autoComplete="off"
                    />
                    <FormControl
                        variant="outlined"
                        className={classes.input}
                    >
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            required
                            labelId="status-label"
                            label="Status"
                            value={status}
                            onChange={handleStatusChange}
                        >
                            <MenuItem value={'Wishlist'}>Wishlist</MenuItem>
                            <MenuItem value={'Applied'}>Applied</MenuItem>
                            <MenuItem value={'In Progress'}>In Progress</MenuItem>
                            <MenuItem value={'Rejected'}>Rejected</MenuItem>
                            <MenuItem value={'Accepted'}>Accepted</MenuItem>
                            <MenuItem value={'Not Answered'}>Not Answered</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        className={classes.button}
                    >
                        Add Position
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default InsertionDialog;