"use client"

import React, {useState} from 'react';
import {authFormSchema} from "@/lib/utils";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";
import {Button} from "@/components/ui/button";
import {Loader} from "lucide-react";
import {loginUser} from "@/services/actions/authActions";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
type AuthFormType = "sign-in" | "sign-up";


function AuthForm({type}: {type: AuthFormType}) {
    const [isLoading, setIsLoading] = useState(false);
    const formSchema = authFormSchema(type);
    const router = useRouter();
    const {toast} = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
            confirmPassword: "",
        }
    })

    const submitHandler = async (data: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            if(type === "sign-in"){
                const loginCredential = {
                    username: data.email,
                    password: data.password
                }

                const result = await loginUser(loginCredential);
                if(result){
                    router.push("/");
                    toast({
                        title: "Sign in Successful",
                    })
                }else {
                    toast({
                        variant: "destructive",
                        title: "Error signing in",
                    })
                }
            }
        }catch (error){
            console.log(error)
        }finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="flex w-full max-w-[500px] flex-col justify-center gap-5 py-10 md:gap-8 p-6 rounded-2xl shadow-lg bg-background">
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(submitHandler)}>
                    {type === "sign-up" && (
                        <>
                            <div className="flex gap-3 justify-between">
                                <CustomInput
                                    control={form.control}
                                    name="username"
                                    label="Username"
                                    placeHolder="Enter your username"
                                ></CustomInput>
                            </div>
                        </>
                    )}

                    <CustomInput
                        control={form.control}
                        name="email"
                        label="Email"
                        placeHolder="Enter your email"
                    ></CustomInput>

                    {type === "sign-up" ? (
                        <div className="flex gap-3 justify-between">
                            <CustomInput
                                control={form.control}
                                name="password"
                                label="Password"
                                placeHolder="Enter your password"
                                inputType="password"
                            ></CustomInput>
                            <CustomInput
                                control={form.control}
                                name="confirmPassword"
                                label="Confirm Passwod"
                                placeHolder="Confirm your password"
                                inputType="password"
                            ></CustomInput>
                        </div>
                    ) : (
                        <div>
                            <CustomInput
                                control={form.control}
                                name="password"
                                label="Password"
                                placeHolder="Enter your password"
                                inputType="password"
                            ></CustomInput>
                        </div>
                    )}
                    <div className="flex flex-col gap-4">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <Loader size={20} className="animate-spin"></Loader>
                                </div>
                            ) : type === "sign-in" ? (
                                "Sign In"
                            ) : (
                                "Sign Up"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default AuthForm;