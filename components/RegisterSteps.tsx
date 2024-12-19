"use client"

import React from 'react';
import {registerFormExistingUserSteps, registerFormNewUserSteps, RegisterFormSteps} from "@/constants/data";
import {cn} from "@/lib/utils";
import {useAppSelector} from "@/redux/reduxHooks";
import {RootState} from "@/redux/store";


function RegisterSteps({type}: {type: "new" | "existing"}) {
    const {newUserStep, existingUserStep} = useAppSelector((state: RootState) => state.step)
    const stepList: RegisterFormSteps[] = type === "new" ? registerFormNewUserSteps : registerFormExistingUserSteps
    const step = type === "existing" ? existingUserStep : newUserStep;

    return (
        <div className="flex justify-center">
            <ul className="steps gap-3">
                {
                    stepList.map((item) => {
                        const isStepDone = step >= item.id
                        return (
                            <li key={item.id} data-content={isStepDone ? "✓" : `${item.id}`} className={cn("step text-sm leading-[24px]", {"step-primary text-blue-500": isStepDone})}>{item.label}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default RegisterSteps;