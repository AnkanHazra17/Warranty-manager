import React from 'react';
import {CustomerDetails} from "@/constants/data";
import {Loader} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {cn} from "@/lib/utils";
import {useAppDispatch} from "@/redux/reduxHooks";
import {setExistingCustomerId} from "@/redux/slices/registerWarrentySlice";
import {setExistingUserStep} from "@/redux/slices/stepSlice";

function CustomerSearchResult({customers, searchValue, isLoading, step}: {customers: CustomerDetails[], searchValue: string, isLoading: boolean, step: number}) {
    const dispatch = useAppDispatch();
    const handleSelectCustomer = (customerId: number) => {
        const newStep = step + 1;
        dispatch(setExistingCustomerId(customerId))
        dispatch(setExistingUserStep(newStep));
    }
    return (
        <>
            {
                searchValue !== "" && (
                    <div className="rounded-xl border shadow-md md:min-w-[450px] p-4">
                        <ScrollArea className={cn("h-[400px]", {"h-10": isLoading || customers.length === 0})}>
                            {
                                isLoading ? (
                                    <div className="w-full flex justify-center">
                                        <Loader size={20} className="animate-spin"></Loader>
                                    </div>
                                ) : (
                                    <div className="w-full flex justify-center">
                                        {
                                            customers.length > 0 ? (
                                                <div className="w-full space-y-1">
                                                    {
                                                        customers.map(customer => (
                                                            <div
                                                                key={customer.email}
                                                                className="p-2 rounded-xl border hover:bg-secondary hover:cursor-pointer"
                                                                onClick={() => handleSelectCustomer(customer.ID)}
                                                            >
                                                                <p className="h5">{customer.name}</p>
                                                                <p className="text-gray-500 text-sm">{customer.email}</p>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ) : (
                                                <div>
                                                    Customer not found...
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </ScrollArea>
                    </div>
                )
            }
        </>
    );
}

export default CustomerSearchResult;