import React, {ReactNode} from 'react';
import {ScrollArea} from "@/components/ui/scroll-area";

function DataSection({children}: {children: ReactNode}) {
    return (
        <ScrollArea className="h-screen w-[calc(100vw-65px)] md:w-[calc(100vw-300px)] lg:w-[calc(100vw-21vw)] px-6 md:px-16">
            {children}
        </ScrollArea>
    );
}

export default DataSection;