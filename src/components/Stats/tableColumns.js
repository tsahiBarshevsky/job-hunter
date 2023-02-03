const header = { color: 'black', letterSpacing: 1 };
const cell = { color: 'black', fontSize: 16, padding: '5px 0' };

const tableColumns = [
    {
        name: <h5 style={header}>Created</h5>,
        selector: row => row.created,
        sortable: false,
        width: '200px',
        cell: row => <div style={cell}>{row.created}</div>
    },
    {
        name: <h5 style={header}>Job Title</h5>,
        selector: row => row.title,
        sortable: false,
        width: '200px',
        cell: row => <div style={cell}>{row.title}</div>
    },
    {
        name: <h5 style={header}>Company</h5>,
        selector: row => row.company,
        sortable: false,
        width: '200px',
        cell: row => <div style={cell}>{row.company}</div>
    },
    {
        name: <h5 style={header}>Status</h5>,
        selector: row => row.status,
        sortable: false,
        width: '200px',
        cell: row => <div style={cell}>{row.status}</div>
    },
    {
        name: <h5 style={header}>Progress</h5>,
        selector: row => row.progress,
        sortable: false,
        width: '300px',
        cell: row => <div style={cell}>{row.progress}</div>
    },
    {
        name: <h5 style={header}>Link</h5>,
        selector: row => row.link,
        sortable: false,
        width: '350px',
        cell: row => <div style={cell}>{row.link}</div>
    }
];

export { tableColumns };