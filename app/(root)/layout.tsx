import React from 'react';
import SideBar from "@/components/SideBar";

function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex">
            <SideBar></SideBar>
            {children}
        </div>
    );
}

export default Layout;