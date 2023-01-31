import update from 'immutability-helper';

const INITIAL_STATE = {};

const jobsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_JOBS':
            return action.jobs;
        case 'ADD_NEW_POSITION':
            return update(state, {
                [action.payload.status]: {
                    items: {
                        $push: [action.payload.position]
                    }
                }
            });
        case 'CHANGE_STATUS':
            return update(state, {
                [action.payload.status]: {
                    items: {
                        [action.payload.index]: {
                            timeline: {
                                $push: [action.payload.step]
                            }
                        }
                    }
                }
            });
        case 'UPDATE_POSITION':
            const position = action.payload.position;
            return update(state, {
                [action.payload.status]: {
                    items: {
                        [action.payload.index]: {
                            $merge: {
                                company: position.company,
                                contact: position.contact,
                                location: position.location,
                                salary: position.salary,
                                title: position.title,
                                url: position.url
                            }
                        }
                    }
                }
            });
        case 'REMOVE_POSITION':
            return update(state, {
                [action.payload.status]: {
                    items: {
                        $splice: [[action.payload.index, 1]]
                    }
                }
            });
        default:
            return state;
    }
}

export default jobsReducer;