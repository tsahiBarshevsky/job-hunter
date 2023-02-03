import update from 'immutability-helper';

const INITIAL_STATE = [];

const statsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_STATS':
            return action.stats;
        case 'ADD_NEW_STAT':
            return update(state, {
                $push: [action.payload.job]
            });
        case 'UDATE_STATUS':
            return update(state, {
                [action.payload.index]: {
                    $merge: {
                        status: action.payload.status,
                        progress: action.payload.progress
                    }
                }
            });
        default:
            return state;
    }
}

export default statsReducer;