const INITIAL_STATE = {};

const weekReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_WEEK':
            return action.week;
        default:
            return state;
    }
}

export default weekReducer;