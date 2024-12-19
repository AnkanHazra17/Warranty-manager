import React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useAppDispatch} from "@/redux/reduxHooks";
import {setExistingUserStep, setNewUserStep} from "@/redux/slices/stepSlice";
import {useForm} from "react-hook-form";
import {registerUserDetails, UserDetails} from "@/services/actions/registerWarrantyActions";
import {setNewCustomerId} from "@/redux/slices/registerWarrentySlice";
import {useToast} from "@/hooks/use-toast";
import {Loader} from "lucide-react";

function UserDetailsForm({step, type}: {step: number, type: "new" | "existing"}) {
    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useAppDispatch();
    const {register, handleSubmit} = useForm<UserDetails>();
    const {toast} = useToast();

    const submitHandler = async (data: UserDetails) => {
        setIsLoading(true);
        try {
            const result = await registerUserDetails(data);
            if(result){
                dispatch(setNewCustomerId(result.customer_id))
                toast({
                    title: "Success!",
                    description: "Customer registered successfully",
                })
                const newStep = step + 1;
                if(type === "existing") {
                    dispatch(setExistingUserStep(newStep));
                }else{
                    dispatch(setNewUserStep(newStep));
                }
            }else {
                toast({
                    variant: "destructive",
                    title: "Error!",
                    description: "Error registering customer",
                })
            }
        }catch (error){
            console.error(error);
        }finally {
            setIsLoading(false);
        }
    }

    return (
        <form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
            <p className="font-bold mb-3">Enter customer details</p>
            <div className="space-y-6">
                <div className="space-y-6">
                    <div>
                        <Label>Name</Label>
                        <Input
                            placeholder="Enter customer name"
                            {...register("name", {required: true})}
                        ></Input>
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input
                            placeholder="Enter customer email"
                            {...register("email", {required: true})}
                        ></Input>
                    </div>
                    <div>
                        <Label>Phone Number</Label>
                        <Input
                            placeholder="Enter customer phone number"
                            {...register("phone", {required: true})}
                        ></Input>
                    </div>
                    <div>
                        <Label>Address</Label>
                        <Textarea
                            placeholder="Enter customer address"
                            {...register("address", {required: true})}
                        ></Textarea>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button disabled={isLoading} type="submit">
                        {
                            isLoading ? (
                                <div className="flex items-center gap-2">
                                    <Loader className="animate-spin"></Loader>
                                    Saving...
                                </div>
                            ) : "Save"
                        }
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default UserDetailsForm;