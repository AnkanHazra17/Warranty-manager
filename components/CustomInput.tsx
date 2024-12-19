"use client";

import React from "react";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useState } from "react";
import { authFormSchema } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = authFormSchema("sign-up");

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeHolder: string;
  inputType?: string;
  fieldType?: string;
}

function CustomInput({
  control,
  name,
  label,
  placeHolder,
  inputType,
  fieldType,
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5 w-full">
          <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
            {label}
          </FormLabel>

          <div className="flex w-full flex-col relative">
            <FormControl>
              {fieldType === "textarea" ? (
                <Textarea
                  className="text-16 placeholder:text-16 focus-visible:ring-offset-0 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                  placeholder={placeHolder}
                  {...field}
                ></Textarea>
              ) : (
                <Input
                  className="text-16 placeholder:text-16 focus-visible:ring-offset-0 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                  placeholder={placeHolder}
                  type={
                    inputType === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : "text"
                  }
                  {...field}
                ></Input>
              )}
            </FormControl>
            <FormMessage className="text-12 text-red-500 mt-2"></FormMessage>
            {inputType === "password" && (
              <div
                className="absolute right-2 top-[0.7rem] cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4"></EyeOff>
                ) : (
                  <Eye className="h-4 w-4"></Eye>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    ></FormField>
  );
}

export default CustomInput;
