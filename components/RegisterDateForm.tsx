import React, {useState} from 'react';
import { Button } from "@/components/ui/button"
import {useAppDispatch, useAppSelector} from "@/redux/reduxHooks";
import {setExistingUserStep, setNewUserStep} from "@/redux/slices/stepSlice";
import CustomDatePicker from "@/components/CustomDatePicker";
import {formatDateToYYYYMMDD} from "@/lib/utils";
import {useToast} from "@/hooks/use-toast";
import {RootState} from "@/redux/store";
import {registerWarranty, RegisterWarranty} from "@/services/actions/registerWarrantyActions";
import {Loader} from "lucide-react";

function RegisterDateForm({step, type}: {step: number, type: "new" | "existing"}) {
    const [purchaseDate, setPurchaseDate] = useState<Date>()
    const [warrantyStartDate, setWarrantyStartDate] = useState<Date>()
    const [warrantyEndDate, setWarrantyEndDate] = useState<Date>()
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {newCustomerId, existingCustomerId, deviceSku, appDeviceIds} = useAppSelector((state: RootState) => state.registerCustomer);
    const {toast} = useToast();
    const dispatch = useAppDispatch();

    const submitHandler = async () => {
        setIsLoading(true);
        if(!purchaseDate){
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Please provide Purchase Date",
            })
            return;
        }
        if(!warrantyStartDate){
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Please provide Warranty Start Date",
            })
            return;
        }
        if(!warrantyEndDate){
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Please provide Warranty End Date",
            })
            return;
        }

        const customerId = newCustomerId || existingCustomerId;
        if(!customerId || !deviceSku || !appDeviceIds || appDeviceIds.length === 0){
            return;
        }

        const registerData: RegisterWarranty = {
            customer_id: customerId,
            sku: deviceSku,
            mac_ids: appDeviceIds,
            purchase_date: formatDateToYYYYMMDD(purchaseDate),
            warranty_start: formatDateToYYYYMMDD(warrantyStartDate),
            warranty_end: formatDateToYYYYMMDD(warrantyEndDate)
        }

        try {
            const isRegistered = await registerWarranty(registerData);
            if(isRegistered){
                toast({
                    title: "Success!",
                    description: "Warranty registered successfully",
                })
            }else{
                toast({
                    variant: "destructive",
                    title: "Error!",
                    description: "Error occurred while registering warranty",
                })
            }
        } catch (error){
            console.log(error)
        }finally {
            setIsLoading(false);
            const newStep = step + 1;
            if(type === "existing") {
                dispatch(setExistingUserStep(newStep));
            }else{
                dispatch(setNewUserStep(newStep));
            }
        }
    }
    return (
        <form className="mt-3 space-y-3">
            <p className="mb-3 font-bold">Provide warranty date</p>

            <CustomDatePicker
                date={purchaseDate}
                setDate={setPurchaseDate}
                label="Purchase date"
            />

            <div className="w-full flex items-center gap-3">
                <CustomDatePicker
                    date={warrantyStartDate}
                    setDate={setWarrantyStartDate}
                    label="Warranty start"
                />
                <CustomDatePicker
                    date={warrantyEndDate}
                    setDate={setWarrantyEndDate}
                    label="Warranty end"
                />
            </div>

            <div className="flex justify-end pt-6">
                <Button disabled={isLoading} type="button" onClick={submitHandler}>
                    {
                        isLoading ? (
                            <div className="flex items-center gap-2">
                                <Loader className="animate-spin"></Loader>
                                Registering...
                            </div>
                        ) : "Register"
                    }
                </Button>
            </div>
        </form>
    );
}

export default RegisterDateForm;