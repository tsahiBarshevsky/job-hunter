import React, { useContext, useState } from 'react';
import moment from 'moment';
import clsx from 'clsx';
import { Typography, Pagination, Stack, FormControl, Select, MenuItem, Divider } from '@mui/material';
import { Progress } from 'rsuite';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../utils/themeContext';
import usePagination from '../../utils/pagination';
import useStyles from './styles';
import './table.sass';

const Table = ({ entriesPerPage, setEntriesPerPage }) => {
    const { theme } = useContext(ThemeContext);
    const [page, setPage] = useState(1);
    const stats = useSelector(state => state.stats);
    const count = Math.ceil(stats.length / entriesPerPage);
    const data = usePagination(stats, entriesPerPage);
    const classes = useStyles();

    const handlePageChange = (e, p) => {
        setPage(p);
        data.jump(p);
    }

    const handleEntriesChange = (event) => {
        setEntriesPerPage(event.target.value);
        handlePageChange(null, 1);
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
        <div className={`table-container table-container-${theme}`}>
            <table id="jobs">
                <thead>
                    <tr>
                        <th>
                            <Typography className={clsx(classes.text, classes.title)} variant="subtitle2">Created At</Typography>
                        </th>
                        <th>
                            <Typography className={clsx(classes.text, classes.title)} variant="subtitle2">Job Title</Typography>
                        </th>
                        <th>
                            <Typography className={clsx(classes.text, classes.title)} variant="subtitle2">Company</Typography>
                        </th>
                        <th>
                            <Typography className={clsx(classes.text, classes.title)} variant="subtitle2">Status</Typography>
                        </th>
                        <th>
                            <Typography className={clsx(classes.text, classes.title)} variant="subtitle2">Progress</Typography>
                        </th>
                        <th>
                            <Typography className={clsx(classes.text, classes.title)} variant="subtitle2">Link</Typography>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.currentData().map((job) => {
                        return (
                            <tr key={job.id} className={`entry entry-${theme}`}>
                                <td className="created">
                                    {Object.keys(job.created).length === 0 ?
                                        <Typography className={classes.text} variant='body2'>
                                            {moment(job.created).format('DD/MM/YYYY HH:mm')}
                                        </Typography>
                                        :
                                        <Typography className={classes.text} variant='body2'>
                                            {moment.unix(job.created.seconds).format('DD/MM/YYYY HH:mm')}
                                        </Typography>
                                    }
                                </td>
                                <td className="title">
                                    <Typography className={classes.text} variant='body2'>{job.title}</Typography>
                                </td>
                                <td className="company">
                                    <Typography className={classes.text} variant='body2'>{job.company}</Typography>
                                </td>
                                <td className="status">
                                    <Typography className={classes.text} variant='body2'>{job.status}</Typography>
                                </td>
                                <td className="progress">
                                    {renderProgressLine(job.status)}
                                </td>
                                <td>
                                    <a
                                        href={job.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={`link link-${theme}`}
                                    >
                                        <Typography className={classes.text} variant='body2'>{job.link}</Typography>
                                    </a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Divider className={classes.divider} />
            <div className="actions">
                <div className="form-control">
                    <Typography className={classes.text}>Entries per page:</Typography>
                    <FormControl variant="outlined">
                        <Select
                            value={entriesPerPage}
                            onChange={handleEntriesChange}
                            className={classes.select}
                            inputProps={{
                                className: classes.text
                            }}
                        >
                            <MenuItem value={5} className={classes.text}>5</MenuItem>
                            <MenuItem value={10} className={classes.text}>10</MenuItem>
                            <MenuItem value={15} className={classes.text}>15</MenuItem>
                        </Select>
                    </FormControl>
                </div>
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
        </div>
    )
}

export default Table;