import React, { useContext } from 'react';
import moment from 'moment';
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
    defaults
} from 'chart.js';
import { months } from '../../utils/constants';
import { ThemeContext } from '../../utils/themeContext';

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
    const { theme } = useContext(ThemeContext);
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

    // Chart variables
    defaults.font.family = 'Poppins';
    defaults.color = theme === 'light' ? 'black' : 'white';
    defaults.font.size = 12;

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
                borderColor: '#1d569268'
            }]
    };

    const options = {
        responsive: true,
        animation: {
            duration: 0
        },
        legend: {
            color: "blue",
        },
        scales: {
            y: {
                min: 0,
                grid: {
                    drawBorder: true,
                    color: theme === 'light' ? '#0000001A' : '#ffffff1A'
                },
                ticks: {
                    color: theme === 'light' ? 'black' : 'white'
                }
            },
            x: {
                grid: {
                    drawBorder: true,
                    color: theme === 'light' ? '#0000001A' : '#ffffff1A'
                },
                ticks: {
                    color: theme === 'light' ? 'black' : 'white'
                }
            }
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