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
                    }
                }
            });
        case 'UPDATE_STAT':
            return update(state, {
                [action.payload.index]: {
                    $merge: {
                        title: action.payload.title,
                        company: action.payload.company,
                        link: action.payload.link
                    }
                }
            });
        case 'REMOVE_STAT':
            return update(state, {
                $splice: [[action.payload.index, 1]]
            });
        case 'RESET_STATS':
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default statsReducer;