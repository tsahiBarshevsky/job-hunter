import { combineReducers } from "redux";
import jobsReducer from "./jobs";
import statsReducer from "./stats";
import weekReducer from './week';

const rootReducer = combineReducers({
    jobs: jobsReducer,
    stats: statsReducer,
    week: weekReducer
});

export default rootReducer;