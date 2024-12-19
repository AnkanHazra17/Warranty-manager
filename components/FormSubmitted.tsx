import React from 'react';
import {Button} from "@/components/ui/button";
import {useDispatch} from "react-redux";
import {setExistingUserStep, setNewUserStep} from "@/redux/slices/stepSlice";
import {
    setAppDeviceIds,
    setDeviceSku,
    setExistingCustomerId,
    setNewCustomerId
} from "@/redux/slices/registerWarrentySlice";

function FormSubmitted({type}: {type: "new" | "existing"}) {
    const dispatch = useDispatch();

    const newFormHandler = () => {
        if(type === "existing") {
            dispatch(setExistingUserStep(0))
            dispatch(setExistingCustomerId(null))
        }else{
            dispatch(setNewUserStep(0))
            dispatch(setNewCustomerId(null))
        }

        dispatch(setDeviceSku(null))
        dispatch(setAppDeviceIds(null))
    }
    return (
        <div className="w-full flex flex-col gap-3 justify-center items-center mt-7">
            <p className="h3">Device registered successfully</p>
            <Button type="button" variant="outline" onClick={newFormHandler}>New form</Button>
        </div>
    );
}

export default FormSubmitted;