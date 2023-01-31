const addNewPosition = (status, position) => {
    return {
        type: 'ADD_NEW_POSITION',
        payload: {
            status: status,
            position: position
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

const updatePosition = (status, index, position) => {
    // status: current status, index: location in the array, position: new position's values
    return {
        type: 'UPDATE_POSITION',
        payload: {
            status: status,
            index: index,
            position: position
        }
    }
};

const removePosition = (status, index) => {
    return {
        type: 'REMOVE_POSITION',
        payload: {
            index: index,
            status: status
        }
    }
};

export {
    addNewPosition,
    changeStatus,
    updatePosition,
    removePosition
};