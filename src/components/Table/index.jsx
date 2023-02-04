import React from 'react';
import { Typography } from '@mui/material';
import { Progress } from 'rsuite';
import { useSelector } from 'react-redux';
import './table.sass';

const Table = () => {
    const stats = useSelector(state => state.stats);

    const renderProgressLine = (status) => {
        switch (status) {
            case 'Wishlist':
                return <Progress.Line percent={0} status="active" />
            case 'Applied':
                return <Progress.Line percent={25} strokeColor="#0d47a1" status="active" />
            case 'In Progress':
                return <Progress.Line percent={50} strokeColor="#fbc02d" status="active" />
            case 'Offered':
                return <Progress.Line percent={75} strokeColor="#f57c00" status="active" />
            case 'Accepted':
                return <Progress.Line percent={100} status="success" />
            case 'Rejected':
                return <Progress.Line percent={100} status="fail" />
            default: return null;
        }
    }

    return (
        <table id="jobs">
            <thead>
                <tr>
                    <th>
                        <Typography variant='h6'>Created</Typography>
                    </th>
                    <th>
                        <Typography variant='h6'>Job Title</Typography>
                    </th>
                    <th>
                        <Typography variant='h6'>Company</Typography>
                    </th>
                    <th>
                        <Typography variant='h6'>Status</Typography>
                    </th>
                    <th>
                        <Typography variant='h6'>Progress</Typography>
                    </th>
                    <th>
                        <Typography variant='h6'>Link</Typography>
                    </th>
                </tr>
            </thead>
            <tbody>
                {stats.map((job) => {
                    return (
                        <tr key={job.id}>
                            <td>
                                <Typography variant='body1'>{job.created}</Typography>
                            </td>
                            <td>
                                <Typography variant='body1'>{job.title}</Typography>
                            </td>
                            <td>
                                <Typography variant='body1'>{job.company}</Typography>
                            </td>
                            <td>
                                <Typography variant='body1'>{job.status}</Typography>
                            </td>
                            <td>
                                {renderProgressLine(job.status)}
                            </td>
                            <td>
                                <a href={job.link} target="_blank" rel="noreferrer">{job.link}</a>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table;