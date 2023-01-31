import update from 'immutability-helper';

const INITIAL_STATE = {};

const jobsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_JOBS':
            return action.jobs;
        case 'ADD_NEW_JOB':
            return update(state, {
                [action.payload.status]: {
                    items: {
                        $push: [action.payload.job]
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
        case 'UPDATE_JOB':
            const job = action.payload.job;
            return update(state, {
                [action.payload.status]: {
                    items: {
                        [action.payload.index]: {
                            $merge: {
                                company: job.company,
                                contact: job.contact,
                                location: job.location,
                                salary: job.salary,
                                title: job.title,
                                url: job.url
                            }
                        }
                    }
                }
            });
        case 'REMOVE_JOB':
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