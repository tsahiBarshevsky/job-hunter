import { combineReducers } from "redux";
import jobsReducer from "./jobs";

const rootReducer = combineReducers({
    jobs: jobsReducer
});

export default rootReducer;