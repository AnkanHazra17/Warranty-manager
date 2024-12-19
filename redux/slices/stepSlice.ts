import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    newUserStep: 0,
    existingUserStep: 0,
}

const stepSlice = createSlice({
    name: "step",
    initialState,
    reducers: {
        setNewUserStep: (state, action) => {
            state.newUserStep = action.payload;
        },
        setExistingUserStep: (state, action) => {
            state.existingUserStep = action.payload;
        }
    }
})

export const { setNewUserStep, setExistingUserStep } = stepSlice.actions;
export default stepSlice.reducer