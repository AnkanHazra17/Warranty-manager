"use client";

import React from "react";
import RegisterSteps from "@/components/RegisterSteps";
import DeviceDetailsForm from "@/components/DeviceDetailsForm";
import { useAppSelector } from "@/redux/reduxHooks";
import { RootState } from "@/redux/store";
import RegisterDateForm from "@/components/RegisterDateForm";
import FormSubmitted from "@/components/FormSubmitted";
import UserDetailsForm from "@/components/UserDetailsForm";
import SelectExistingCustomer from "@/components/SelectExistingCustomer";

type WarrantyUploadFormType = "new" | "existing";

function WarrantyUploadForm({ type }: { type: WarrantyUploadFormType }) {
  const { newUserStep, existingUserStep } = useAppSelector(
    (state: RootState) => state.step
  );
  const { existingCustomerId } = useAppSelector(
    (state: RootState) => state.registerCustomer
  );
  return (
    <div className="">
      <p className="h5">
        {type === "existing"
          ? "Register warranty details for existing customers"
          : "Register warranty details for new customers"}
      </p>
      <div className="flex justify-center">
        <div className="w-full lg:w-[500px] space-y-7 mt-10 mb-14">
          <RegisterSteps type={type}></RegisterSteps>
          {type === "existing" ? (
            <>
              {existingUserStep === 0 && (
                <SelectExistingCustomer
                  step={existingUserStep}
                ></SelectExistingCustomer>
              )}
              {existingCustomerId && (
                <>
                  {existingUserStep === 1 && (
                    <DeviceDetailsForm
                      step={existingUserStep}
                      type="existing"
                    ></DeviceDetailsForm>
                  )}
                </>
              )}

              {existingUserStep === 2 && (
                <RegisterDateForm
                  step={existingUserStep}
                  type="existing"
                ></RegisterDateForm>
              )}

              {existingUserStep === 3 && (
                <FormSubmitted type="existing"></FormSubmitted>
              )}
            </>
          ) : (
            <>
              {newUserStep === 0 && (
                <UserDetailsForm
                  step={newUserStep}
                  type="new"
                ></UserDetailsForm>
              )}
              {newUserStep === 1 && (
                <DeviceDetailsForm
                  step={newUserStep}
                  type="new"
                ></DeviceDetailsForm>
              )}
              {newUserStep === 2 && (
                <RegisterDateForm
                  step={newUserStep}
                  type="new"
                ></RegisterDateForm>
              )}
              {newUserStep === 3 && <FormSubmitted type="new"></FormSubmitted>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default WarrantyUploadForm;
