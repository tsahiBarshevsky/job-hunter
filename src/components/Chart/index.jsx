import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { months } from '../../utils/constants';
import moment from 'moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({ currentYear }) => {
    const stats = useSelector(state => state.stats);
    const reduce = stats.reduce((r, a) => {
        var date = null;
        if (Object.keys(a.created).length === 0)
            date = moment(a.created);
        else
            date = moment.unix(a.created.seconds);
        if (date.year() === currentYear) {
            r[date.format('MMMM')] = r[date.format('MMMM')] || [];
            r[date.format('MMMM')].push(a);
        }
        return r;
    }, Object.create(null));

    const columns = {
        'January': reduce['January'] || [],
        'February': reduce['February'] || [],
        'March': reduce['March'] || [],
        'April': reduce['April'] || [],
        'May': reduce['May'] || [],
        'June': reduce['June'] || [],
        'July': reduce['July'] || [],
        'August': reduce['August'] || [],
        'September': reduce['September'] || [],
        'October': reduce['October'] || [],
        'November': reduce['November'] || [],
        'December': reduce['December'] || [],
    };

    const data = {
        labels: months,
        datasets:
            [{
                label: '# of applications',
                data: Object.keys(columns).map((month) => columns[month].length),
                fill: false,
                backgroundColor: '#1d5692',
                borderColor: '#1d569250'
            }]
    };

    const options = {
        responsive: true,
        animation: {
            duration: 0
        },
        scales: {
            y: { min: 0 }
        }
    };

    return (
        <Line
            data={data}
            options={options}
        />
    )
}

export default Chart;