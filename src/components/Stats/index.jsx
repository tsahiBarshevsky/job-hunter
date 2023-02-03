import React from 'react';
import moment from 'moment';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAuth } from '../../utils/context';
import StatBox from '../Stat Box';
import './stats.sass';

// Images
import Stat1 from '../../assets/job-search.png';
import Stat2 from '../../assets/interview.png';
import Stat3 from '../../assets/contract.png';
import Stat4 from '../../assets/weekly-calendar.png';

const Stats = () => {
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

    const calculate = () => {
        const now = moment();
        var counter = 0;
        Object.keys(jobs).forEach((status) => {
            counter += jobs[status].items.filter((job) => moment.unix(job.timeline[0].date.seconds).isoWeek() === now.isoWeek()).length;
        });
        return counter;
    }

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
                    value={calculate()}
                    image={Stat4}
                />
                <StatBox
                    title="Jobs In Progress"
                    subtitle={`added this week`}
                    value={jobs["In Progress"].items.length}
                    image={Stat3}
                />
                <StatBox
                    title="Jobs Offered"
                    subtitle={`added this week`}
                    value={jobs["Offered"].items.length}
                    image={Stat2}
                />
            </div>
        </div>
    )
}

export default Stats;