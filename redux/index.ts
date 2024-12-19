import {combineReducers} from "redux";
import stepsReducers from "./slices/stepSlice";
import registerWarrantyReducers from "./slices/registerWarrentySlice";

const rootReducer = combineReducers({
    step: stepsReducers,
    registerCustomer: registerWarrantyReducers
})

export default rootReducer