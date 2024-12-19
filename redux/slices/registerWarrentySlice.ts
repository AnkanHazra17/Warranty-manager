import {createSlice} from "@reduxjs/toolkit";

interface RegisterWarranty{
    existingCustomerId: number | null;
    newCustomerId: number | null;
    deviceSku: string | null;
    appDeviceIds: string[] | null;
}

const initialState: RegisterWarranty = {
    existingCustomerId: null,
    newCustomerId: null,
    deviceSku: null,
    appDeviceIds: null,
}

const registerCustomerSlice = createSlice({
    name: "registerCustomer",
    initialState,
    reducers: {
        setExistingCustomerId(state, action) {
            state.existingCustomerId = action.payload;
        },
        setNewCustomerId(state, action) {
            state.newCustomerId = action.payload;
        },
        setDeviceSku(state, action) {
            state.deviceSku = action.payload;
        },
        setAppDeviceIds(state, action) {
            state.appDeviceIds = action.payload;
        }
    }
})

export const {setExistingCustomerId, setNewCustomerId, setDeviceSku, setAppDeviceIds} = registerCustomerSlice.actions;
export default registerCustomerSlice.reducer