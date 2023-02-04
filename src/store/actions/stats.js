const addNewStat = (job) => {
    return {
        type: 'ADD_NEW_STAT',
        payload: {
            job: job
        }
    }
};

const updateStatus = (index, status) => {
    return {
        type: 'UDATE_STATUS',
        payload: {
            index: index,
            status: status
        }
    }
};

const updateStat = (index, title, company, link) => {
    return {
        type: 'UPDATE_STAT',
        payload: {
            index: index,
            title: title,
            company: company,
            link: link
        }
    }
};

const removeStat = (index) => {
    return {
        type: 'REMOVE_STAT',
        payload: {
            index: index
        }
    }
};

export {
    addNewStat,
    updateStatus,
    updateStat,
    removeStat
};