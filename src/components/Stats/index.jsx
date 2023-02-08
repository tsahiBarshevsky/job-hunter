import React, { useContext } from 'react';
import moment from 'moment';
import { Typography, FormControl, Select, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAuth } from '../../utils/context';
import { ThemeContext } from '../../utils/themeContext';
import StatBox from '../Stat Box';
import useStyles from './styles';
import './stats.sass';

// Images
import Stat1 from '../../assets/job-search.png';
import Stat2 from '../../assets/interview.png';
import Stat3 from '../../assets/contract.png';
import Stat4 from '../../assets/weekly-calendar.png';
import Table from '../Table';
import Chart from '../Chart';

const Stats = ({ currentYear, setCurrentYear, entriesPerPage, setEntriesPerPage }) => {
    const { user } = useAuth();
    const { theme } = useContext(ThemeContext);
    const jobs = useSelector(state => state.jobs);
    const stats = useSelector(state => state.stats);
    const week = useSelector(state => state.week);
    const classes = useStyles();

    const calculateTotalJobs = () => {
        var counter = 0;
        Object.keys(jobs).forEach((status) => {
            counter += jobs[status].items.length;
        });
        return counter;
    }

    const calculateJobsAddedThisWeek = () => {
        const week = moment().week();
        var counter = 0;
        Object.keys(jobs).forEach((status) => {
            const items = jobs[status].items;
            counter += items.filter((job) => {
                if (Object.keys(job.timeline[0].date).length === 0)
                    return moment(job.timeline[0].date).week() === week;
                return moment.unix(job.timeline[0].date.seconds).week() === week;
            }).length;
        });
        return counter;
    }

    const calculateJobsInProgress = () => {
        const week = moment().week();
        var counter = 0;
        Object.keys(jobs).forEach((status) => {
            const items = jobs[status].items;
            items.forEach((job) => {
                counter += job.timeline.filter((step) => {
                    if (Object.keys(step.date).length === 0)
                        return step.action.includes('In Progress') && moment(step.date).week() === week;
                    return step.action.includes('In Progress') && moment.unix(step.date.seconds).week() === week
                }).length;
            });
        });
        return counter;
    }

    const calculateJobsOffered = () => {
        const week = moment().week();
        var counter = 0;
        Object.keys(jobs).forEach((status) => {
            const items = jobs[status].items;
            items.forEach((job) => {
                counter += job.timeline.filter((step) => {
                    if (Object.keys(step.date).length === 0)
                        return step.action.includes('offer') && moment(step.date).week() === week;
                    return step.action.includes('offer') && moment.unix(step.date.seconds).week() === week
                }).length;
            });
        });
        return counter;
    }

    const extractYears = (item) => {
        if (Object.keys(item.created).length === 0)
            return moment(item.created).year();
        return moment.unix(item.created.seconds).year();
    }

    return (
        <div className="stats-container">
            <div className="stats-header">
                <Typography className={[classes.text, classes.bold]} variant="h6">
                    {user.displayName ? user.displayName : user.email}'s stats
                </Typography>
            </div>
            <div className="statistics">
                <StatBox
                    title="Total Jobs"
                    subtitle="In all stages"
                    value={calculateTotalJobs()}
                    image={Stat1}
                    withSpace={false}
                />
                <StatBox
                    title="Added This Week"
                    subtitle={`${week.start.format('DD/MM/YY')} - ${week.end.format('DD/MM/YY')}`}
                    value={calculateJobsAddedThisWeek()}
                    image={Stat4}
                    withSpace
                />
                <StatBox
                    title="Jobs In Progress"
                    subtitle={`${calculateJobsInProgress()} added this week`}
                    value={jobs["In Progress"].items.length}
                    image={Stat3}
                    withSpace
                />
                <StatBox
                    title="Jobs Offered"
                    subtitle={`${calculateJobsOffered()} added this week`}
                    value={jobs["Offered"].items.length}
                    image={Stat2}
                    withSpace={false}
                />
            </div>
            <div className={`box box-${theme}`}>
                <Typography className={classes.text} variant="subtitle1">Jobs Overview</Typography>
                <Table
                    entriesPerPage={entriesPerPage}
                    setEntriesPerPage={setEntriesPerPage}
                />
            </div>
            <div className={`box box-${theme}`}>
                <div className="form-control">
                    <FormControl variant="outlined">
                        <Select
                            value={currentYear}
                            onChange={(event) => setCurrentYear(event.target.value)}
                            className={classes.select}
                            inputProps={{
                                className: classes.text
                            }}
                        >
                            {[...new Set(stats.map((item) => { return extractYears(item) }))].reverse().map((item) => {
                                return (
                                    <MenuItem
                                        key={item}
                                        value={item}
                                        className={classes.text}
                                    >
                                        {item}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <Typography className={classes.text} variant="subtitle1">Monthly Jobs Applications Activity</Typography>
                </div>
                <Chart
                    currentYear={currentYear}
                    setCurrentYear={setCurrentYear}
                />
            </div>
        </div>
    )
}

export default Stats;