import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";

function WarrantyFormLoader() {
    return (
        <div className="">
            <Skeleton className="h-9 w-[230px]"></Skeleton>
            <Skeleton className="h-4 w-[400px] mt-6"></Skeleton>
            <div className="flex justify-center">
                <div className="w-full lg:w-[500px] space-y-7 mt-10 mb-14">
                    <div className="flex gap-20 justify-center">
                        <Skeleton className="h-12 w-12 rounded-full"></Skeleton>
                        <Skeleton className="h-12 w-12 rounded-full"></Skeleton>
                        <Skeleton className="h-12 w-12 rounded-full"></Skeleton>
                    </div>
                    <Skeleton className="w-full h-[300px]"></Skeleton>
                </div>
            </div>
        </div>
    );
}

export default WarrantyFormLoader;