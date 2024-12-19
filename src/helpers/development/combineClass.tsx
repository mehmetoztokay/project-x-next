import { twMerge } from "tailwind-merge"
import { clsx, ClassValue } from "clsx"

// This function is used to combine tailwind and clsx classes
// This function combines multiple CSS class names from Tailwind and clsx libraries into a single string, allowing for conditional and dynamic class application in React components.
export const combineClass = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}