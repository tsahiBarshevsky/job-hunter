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
    // status: current status, index: location in the array
    return {
        type: 'REMOVE_JOB',
        payload: {
            index: index,
            status: status
        }
    }
};

const addNewNote = (status, index, note) => {
    // status: current status, index: location in the array
    return {
        type: 'ADD_NEW_NOTE',
        payload: {
            status: status,
            index: index,
            note: note
        }
    }
};

const updateNote = (status, index, note, noteIndex) => {
    return {
        type: 'UPDATE_NOTE',
        payload: {
            status: status,
            index: index,
            note: note,
            noteIndex: noteIndex
        }
    }
};

const removeNote = (status, index, noteIndex) => {
    // status: current status, index: location in the array, noteIndex: note's location in array
    return {
        type: 'REMOVE_NOTE',
        payload: {
            status: status,
            index: index,
            noteIndex: noteIndex
        }
    }
};

const addNewContact = (status, index, contact) => {
    return {
        type: 'ADD_NEW_CONTACT',
        payload: {
            status: status,
            index: index,
            contact: contact
        }
    }
};

export {
    addNewJob,
    changeStatus,
    updateJob,
    removeJob,
    addNewNote,
    updateNote,
    removeNote,
    addNewContact
};