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
        case 'ADD_STEP_TO_TIMELINE':
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
                                title: job.title,
                                company: job.company,
                                location: job.location,
                                salary: job.salary,
                                url: job.url,
                                description: job.description,
                                deadline: job.deadline
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
        case 'ADD_NEW_NOTE':
            return update(state, {
                [action.payload.status]: {
                    items: {
                        [action.payload.index]: {
                            notes: {
                                $push: [action.payload.note]
                            }
                        }
                    }
                }
            });
        case 'UPDATE_NOTE':
            const note = action.payload.note;
            return update(state, {
                [action.payload.status]: {
                    items: {
                        [action.payload.index]: {
                            notes: {
                                [action.payload.noteIndex]: {
                                    $merge: {
                                        title: note.title,
                                        text: note.text
                                    }
                                }
                            }
                        }
                    }
                }
            });
        case 'REMOVE_NOTE':
            return update(state, {
                [action.payload.status]: {
                    items: {
                        [action.payload.index]: {
                            notes: {
                                $splice: [[action.payload.noteIndex, 1]]
                            }
                        }
                    }
                }
            });
        case 'ADD_NEW_ACTIVITY':
            return update(state, {
                [action.payload.status]: {
                    items: {
                        [action.payload.index]: {
                            activites: {
                                $push: [action.payload.activity]
                            }
                        }
                    }
                }
            });
        case 'UPDATE_ACTIVITY_COMPLETED':
            return update(state, {
                [action.payload.status]: {
                    items: {
                        [action.payload.index]: {
                            activites: {
                                [action.payload.activityIndex]: {
                                    $merge: {
                                        completed: action.payload.completed
                                    }
                                }
                            }
                        }
                    }
                }
            });
        case 'REMOVE_ACTIVITY':
            return update(state, {
                [action.payload.status]: {
                    items: {
                        [action.payload.index]: {
                            activites: {
                                $splice: [[action.payload.activityIndex, 1]]
                            }
                        }
                    }
                }
            });
        case 'ADD_NEW_CONTACT':
            return update(state, {
                [action.payload.status]: {
                    items: {
                        [action.payload.index]: {
                            contacts: {
                                $push: [action.payload.contact]
                            }
                        }
                    }
                }
            });
        case 'UPDATE_CONTACT':
            const contact = action.payload.contact;
            return update(state, {
                [action.payload.status]: {
                    items: {
                        [action.payload.index]: {
                            contacts: {
                                [action.payload.contactIndex]: {
                                    $merge: {
                                        firstName: contact.firstName,
                                        lastName: contact.lastName,
                                        phone: contact.phone,
                                        email: contact.email,
                                        linkedin: contact.linkedin,
                                        facebook: contact.facebook
                                    }
                                }
                            }
                        }
                    }
                }
            });
        case 'REMOVE_CONTACT':
            return update(state, {
                [action.payload.status]: {
                    items: {
                        [action.payload.index]: {
                            contacts: {
                                $splice: [[action.payload.contactIndex, 1]]
                            }
                        }
                    }
                }
            });
        case 'RESET_JOBS':
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default jobsReducer;