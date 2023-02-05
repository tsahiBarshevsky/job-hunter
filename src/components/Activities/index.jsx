import React from "react";
import { Typography, Button } from '@mui/material';

const Activities = ({ job, setJob, setOpenJobDialog, setOpenActivityDialog }) => {
    const onOpenContactDialog = () => {
        setOpenJobDialog(false);
        setOpenActivityDialog(true);
    }

    return Object.keys(job).length > 0 && (
        <div className="activities-container">
            {job.activites.length === 0 ?
                <div>
                    <Typography>You have not added any activity to this job yet.</Typography>
                    <Button variant="contained" onClick={() => onOpenContactDialog()}>Create activity</Button>
                </div>
                :
                <div>
                    <Button variant="contained" onClick={() => onOpenContactDialog()}>Create activity</Button>
                    {job.activites.map((activity) => {
                        return (
                            <div key={activity.id}>
                                <h1>{activity.title}</h1>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Activities;