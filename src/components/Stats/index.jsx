import React, { useEffect } from 'react';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAuth } from '../../utils/context';
import { tableColumns } from './tableColumns';
import { renderProgressLine } from '../../utils/constants';
import StatBox from '../Stat Box';
import './stats.sass';

// Images
import Stat1 from '../../assets/job-search.png';
import Stat2 from '../../assets/interview.png';
import Stat3 from '../../assets/contract.png';
import Stat4 from '../../assets/weekly-calendar.png';

const Stats = ({ jobsArray, setJobsArray }) => {
    const { user } = useAuth();
    const jobs = useSelector(state => state.jobs);
    const week = useSelector(state => state.week);

    const calculateTotalJobs = () => {
        var counter = 0;
        Object.keys(jobs).forEach((status) => {
            counter += jobs[status].items.length;
        });
        return counter;
    }

    const calculateJobsAddedThisWeek = () => {
        const week = moment().isoWeek();
        var counter = 0;
        Object.keys(jobs).forEach((status) => {
            const items = jobs[status].items;
            counter += items.filter((job) => {
                if (Object.keys(job.timeline[0].date).length === 0)
                    return moment(job.timeline[0].date).isoWeek() === week;
                return moment.unix(job.timeline[0].date.seconds).isoWeek() === week;
            }).length;
        });
        return counter;
    }

    const calculateJobsInProgress = () => {
        const week = moment().isoWeek();
        var counter = 0;
        Object.keys(jobs).forEach((status) => {
            const items = jobs[status].items;
            items.forEach((job) => {
                counter += job.timeline.filter((step) => {
                    if (Object.keys(step.date).length === 0)
                        return step.action.includes('In Progress') && moment(step.date).isoWeek() === week;
                    return step.action.includes('In Progress') && moment.unix(step.date.seconds).isoWeek() === week
                }).length;
            });
        });
        return counter;
    }

    const calculateJobsOffered = () => {
        const week = moment().isoWeek();
        var counter = 0;
        Object.keys(jobs).forEach((status) => {
            const items = jobs[status].items;
            items.forEach((job) => {
                counter += job.timeline.filter((step) => {
                    if (Object.keys(step.date).length === 0)
                        return step.action.includes('offer') && moment(step.date).isoWeek() === week;
                    return step.action.includes('offer') && moment.unix(step.date.seconds).isoWeek() === week
                }).length;
            });
        });
        return counter;
    }

    useEffect(() => {
        const arr = [];
        Object.keys(jobs).forEach((status) => {
            jobs[status].items.forEach((job) => arr.push({
                title: job.title,
                company: job.company,
                status: job.status,
                progress: <div style={{ width: 250 }}>{renderProgressLine(job.status)}</div>,
                link: job.url && <a href={job.url} target="_blank" rel="noreferrer">{job.url}</a>
            }));
        });
        setJobsArray(arr);
    }, [jobs, setJobsArray]);

    return (
        <div className="stats-container">
            <div className="stats-header">
                <Typography variant="h6">{user.displayName ? user.displayName : user.email}'s stats</Typography>
            </div>
            <div className="statistics">
                <StatBox
                    title="Total Jobs"
                    subtitle="In all stages"
                    value={calculateTotalJobs()}
                    image={Stat1}
                />
                <StatBox
                    title="Added This Week"
                    subtitle={`${week.start.format('DD/MM/YY')} - ${week.end.format('DD/MM/YY')}`}
                    value={calculateJobsAddedThisWeek()}
                    image={Stat4}
                />
                <StatBox
                    title="Jobs In Progress"
                    subtitle={`${calculateJobsInProgress()} added this week`}
                    value={jobs["In Progress"].items.length}
                    image={Stat3}
                />
                <StatBox
                    title="Jobs Offered"
                    subtitle={`${calculateJobsOffered()} added this week`}
                    value={jobs["Offered"].items.length}
                    image={Stat2}
                />
            </div>
            <div className="box">
                <Typography variant="subtitle1">Jobs Overview</Typography>
                <DataTable
                    columns={tableColumns}
                    data={jobsArray}
                    pagination
                    pointerOnHover
                    theme="solarized"
                />
            </div>
        </div>
    )
}

export default Stats;