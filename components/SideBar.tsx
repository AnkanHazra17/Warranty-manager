"use client"

import React, {useState} from 'react';
import {sideNavLinks} from "@/constants/data";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Loader, LogOut} from "lucide-react";
import {logoutUser} from "@/services/actions/authActions";
import {useToast} from "@/hooks/use-toast";

function SideBar() {
    const pathName = usePathname();
    const [loading, setIsLoading] = useState(false);
    const router = useRouter();
    const {toast} = useToast();

    const logoutHandler = async () => {
        setIsLoading(true);
        try {
            const result = await logoutUser()
            if(result){
                router.push("/sign-in");
                toast({
                    title: "Sign out successful",
                })
            }else{
                toast({
                    variant: "destructive",
                    title: "Error signing out",
                })
            }
        }catch (error) {
            console.error(error);
        }finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="w-[65px] md:w-[300px] lg:w-[21vw] bg-secondary h-screen relative">
            <div className="flex items-center gap-4 px-2 md:px-6 mt-6">
                <div className="h-12 text-background w-12 flex items-center justify-center rounded-xl bg-blue-500 text-sm font-bold">GW</div>
                <p className="text-lg font-bold text-foreground hidden md:flex">G-Tech Warranty</p>
            </div>
            <div className="px-2 md:px-6 mt-12 flex gap-6 flex-col">
                {
                    sideNavLinks.map((item) => {
                        const isActive = item.route === pathName
                         return (
                             <Link key={item.label} href={item.route} className={cn("flex items-center gap-3 py-3 px-3 w-full rounded-xl text-foreground", {"bg-primary text-background": isActive})}>
                                 <item.icon size={25}></item.icon>
                                 <p className="font-bold hidden md:flex">{item.label}</p>
                             </Link>
                         )
                        }
                    )
                }
            </div>

            <div className="absolute bottom-2 w-full flex justify-center">
                <Button variant="outline" className="w-[20vw]" disabled={loading} onClick={logoutHandler}>
                    {
                        loading ? (
                            <>
                                <Loader className="animate-spin"></Loader>
                            </>
                        ) : (
                            <>
                                <LogOut></LogOut>
                                Log Out
                            </>
                        )
                    }
                </Button>
            </div>
        </div>
    );
}

export default SideBar;