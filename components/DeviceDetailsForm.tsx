"use client"

import React, {useState} from 'react';
import {Label} from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button";
import {useAppDispatch} from "@/redux/reduxHooks";
import {setExistingUserStep, setNewUserStep} from "@/redux/slices/stepSlice";
import {uploadDeviceIdMethod} from "@/constants/data";
import useProductTypes from "@/hooks/useProductTypes";
import {Loader} from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import useSKUs from "@/hooks/useSKUs";
import UploadDeviceIds from "@/components/UploadDeviceIds";
import {useToast} from "@/hooks/use-toast";
import {setAppDeviceIds, setDeviceSku} from "@/redux/slices/registerWarrentySlice";

function DeviceDetailsForm({step, type}: {step: number, type: "new" | "existing"}) {
    const dispatch = useAppDispatch();
    const [method, setMethod] = useState<"xlsx" | "manual" | null>(null);
    const [productType, setProductType] = useState<string | null>(null);
    const [sku, setSku] = useState<string | null>(null);
    const [deviceIds, setDeviceIds] = useState<string[]>([]);

    const {productTypes, productTypesLoading} = useProductTypes();
    const {skus, skuLoading} = useSKUs(productType);

    const {toast} = useToast();

    const submitHandler = () => {
        if(!productType){
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Please provide device type",
            })
            return
        }

        if(!sku){
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Please provide device model",
            })
            return;
        }

        if(deviceIds.length === 0){
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Please provide device Ids",
            })
            return;
        }
        const newStep = step + 1;

        dispatch(setDeviceSku(sku))
        dispatch(setAppDeviceIds(deviceIds));

        if(type === "existing") {
            dispatch(setExistingUserStep(newStep));
        }else{
            dispatch(setNewUserStep(newStep));
        }
    }
    return (
            <form className="space-y-3">
                <p className="mb-3 font-bold">Enter device details</p>
                {
                    productTypesLoading ? (
                        <div className="flex justify-center">
                            <Loader className="animate-spin"></Loader>
                        </div>
                    ) : (
                        <>
                            {
                                productTypes && (
                                    <CustomSelect
                                        setValue={setProductType}
                                        values={productTypes}
                                        label="Select Device type"
                                        placeholder="Select devide type"
                                    />
                                )
                            }
                        </>
                    )
                }

                {
                    productType && (
                        <>
                            {
                                skuLoading ? (
                                    <div className="flex justify-center">
                                        <Loader className="animate-spin"></Loader>
                                    </div>
                                ) : (
                                    <>
                                        {
                                            skus && (
                                                <CustomSelect
                                                    setValue={setSku}
                                                    values={skus}
                                                    label="Select model"
                                                    placeholder="Select model"
                                                />
                                            )
                                        }
                                    </>
                                )
                            }
                        </>
                    )
                }

                {
                    sku && (
                        <div className="space-y-1">
                            <Label className="leading-normal">Select Method</Label>
                            <Select onValueChange={(value: "xlsx" | "manual") => setMethod(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select method"></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        uploadDeviceIdMethod.map((item) => (
                                            <SelectItem key={item.method} value={item.method}>{item.label}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    )
                }

                {
                    method === "xlsx" && (
                        <UploadDeviceIds
                            type={method}
                            deviceIds={deviceIds}
                            setDeviceIds={setDeviceIds}
                        />
                    )
                }

                {
                    method === "manual" && (
                        <UploadDeviceIds
                            type={method}
                            deviceIds={deviceIds}
                            setDeviceIds={setDeviceIds}
                        />
                    )
                }

                <div className="flex justify-end pt-6">
                    <Button type="button" onClick={submitHandler}>Save</Button>
                </div>

            </form>

    );
}

export default DeviceDetailsForm;