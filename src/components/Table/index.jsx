import React, { useState } from 'react';
import moment from 'moment';
import { Typography, Pagination, Stack } from '@mui/material';
import { Progress } from 'rsuite';
import { useSelector } from 'react-redux';
import usePagination from '../../utils/pagination';
import './table.sass';

const ENTRIES_PER_PAGE = 10;

const Table = () => {
    const stats = useSelector(state => state.stats);
    const [page, setPage] = useState(1);
    const count = Math.ceil(stats.length / ENTRIES_PER_PAGE);
    const data = usePagination(stats, ENTRIES_PER_PAGE);

    const handlePageChange = (e, p) => {
        setPage(p);
        data.jump(p);
    }

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
        <div className="table-container">
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
                    {data.currentData().map((job) => {
                        return (
                            <tr key={job.id}>
                                <td>
                                    {Object.keys(job.created).length === 0 ?
                                        <Typography variant='body1'>
                                            {moment(job.created).format('DD/MM/YYYY')}
                                        </Typography>
                                        :
                                        <Typography variant='body1'>
                                            {moment.unix(job.created.seconds).format('DD/MM/YYYY')}
                                        </Typography>
                                    }
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
            <Stack spacing={2}>
                <Pagination
                    count={count}
                    page={page}
                    onChange={handlePageChange}
                    showLastButton
                    showFirstButton

                />
            </Stack>
        </div>
    )
}

export default Table;