const addNewJob = (status, job) => {
    return {
        type: 'ADD_NEW_JOB',
        payload: {
            status: status,
            job: job
        }
    }
};

const changeStatus = (status, index, step) => {
    // status: the new status, index: location in the array, step: the new step
    return {
        type: 'CHANGE_STATUS',
        payload: {
            status: status,
            index: index,
            step: step
        }
    }
};

const updateJob = (status, index, job) => {
    // status: current status, index: location in the array, job: new job's values
    return {
        type: 'UPDATE_JOB',
        payload: {
            status: status,
            index: index,
            job: job
        }
    }
};

const removeJob = (status, index) => {
    return {
        type: 'REMOVE_JOB',
        payload: {
            index: index,
            status: status
        }
    }
};

export {
    addNewJob,
    changeStatus,
    updateJob,
    removeJob
};