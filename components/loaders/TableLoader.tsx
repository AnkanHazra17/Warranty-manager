import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";

function TableLoader() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-9 w-[350px]"></Skeleton>
            <div className="space-y-3">
                <Skeleton className="h-10 w-full"></Skeleton>
                <Skeleton className="h-10 w-full"></Skeleton>
                <Skeleton className="h-10 w-full"></Skeleton>
                <Skeleton className="h-10 w-full"></Skeleton>
                <Skeleton className="h-10 w-full"></Skeleton>
                <Skeleton className="h-10 w-full"></Skeleton>
            </div>
        </div>
    );
}

export default TableLoader;