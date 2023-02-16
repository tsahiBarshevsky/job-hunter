// List of possible statues
const statuses = [
    { id: 0, name: 'Wishlist' },
    { id: 1, name: 'Applied' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Offered' },
    { id: 4, name: 'Rejected' },
    { id: 5, name: 'Accepted' },
    { id: 6, name: 'Not Answered' }
];

// List of categories for activities
const categories = [
    { id: 0, category: 'got a phone', color: '#0d47a1' },
    { id: 1, category: 'phone interview', color: '#0d47a1' },
    { id: 2, category: 'online interview', color: '#0d47a1' },
    { id: 3, category: 'frontal interview', color: '#0d47a1' },
    { id: 4, category: 'team leader interview', color: '#0d47a1' },
    { id: 5, category: 'CEO interview', color: '#0d47a1' },
    { id: 6, category: 'home test', color: '#1b5e20' },
    { id: 7, category: 'office test', color: '#1b5e20' },
    { id: 8, category: 'accept offer', color: '#e65100' },
    { id: 9, category: 'decline offer', color: '#e65100' },
    { id: 10, category: 'candidacy removal', color: '#e65100' },
    { id: 11, category: 'other', color: '#880e4f' }
];

// List of activities filters
const filters = ['all', 'interviews', 'offers', 'tests', 'completed'];

// CSV file headers
const headers = [
    { label: "ID", key: "id" },
    { label: "Created At", key: "created" },
    { label: "Job Title", key: "title" },
    { label: "Company", key: "company" },
    { label: "Status", key: "status" },
    { label: "Location", key: "location" },
    { label: "Salary", key: "salary" },
    { label: "Link", key: "link" }
];

// Text editor toolbar
const toolbar = ['bold', 'italic', '|', 'link', 'bulletedList', 'numberedList', '|', 'undo', 'redo'];

// List of months for chart
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export { statuses, categories, toolbar, months, headers, filters };