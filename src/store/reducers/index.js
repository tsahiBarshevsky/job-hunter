import { combineReducers } from "redux";
import jobsReducer from "./jobs";
import weekReducer from './week';

const rootReducer = combineReducers({
    jobs: jobsReducer,
    week: weekReducer
});

export default rootReducer;