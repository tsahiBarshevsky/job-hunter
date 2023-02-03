const addNewStat = (job) => {
    return {
        type: 'ADD_NEW_STAT',
        payload: {
            job: job
        }
    }
};

const updateStatus = (index, status, progress) => {
    return {
        type: 'UDATE_STATUS',
        payload: {
            index: index,
            status: status,
            progress: progress
        }
    }
}

export { addNewStat, updateStatus };