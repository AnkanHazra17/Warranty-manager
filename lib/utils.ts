import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const authFormSchema = (type?: string) =>
    z.object({
        username: type === "sign-in" ? z.string().optional() : z.string().min(2),
        confirmPassword:
            type === "sign-in" ? z.string().optional() : z.string().min(3),

        email: z.string().min(3),
        password: z.string().min(3),
    });



