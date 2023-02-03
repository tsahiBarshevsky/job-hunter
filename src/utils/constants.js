import { Progress } from "rsuite";

const statuses = [
    { id: 0, name: 'Wishlist' },
    { id: 1, name: 'Applied' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Offered' },
    { id: 4, name: 'Rejected' },
    { id: 5, name: 'Accepted' },
    { id: 6, name: 'Not Answered' }
];

const toolbar = ['bold', 'italic', '|', 'link', 'bulletedList', 'numberedList', '|', 'undo', 'redo'];

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

export { statuses, toolbar, renderProgressLine };