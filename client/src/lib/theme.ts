import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Chess application theme colors
export const theme = {
  colors: {
    // Primary teal color
    primary: "hsl(180, 100%, 25%)",
    primaryLight: "hsl(180, 85%, 35%)",
    primaryDark: "hsl(180, 100%, 15%)",
    
    // Dark grey colors
    darkGrey: "hsl(220, 17%, 17%)",
    darkGreyLight: "hsl(220, 16%, 22%)",
    darkGreyDark: "hsl(220, 18%, 12%)",
    
    // Chess colors
    lightSquare: "#E6EDF3",
    darkSquare: "#334155",
    highlight: "rgba(255, 213, 0, 0.4)",
    moveIndicator: "rgba(0, 200, 200, 0.5)",
    
    // Status colors
    success: "hsl(142, 76%, 36%)",
    warning: "hsl(45, 100%, 51%)",
    error: "hsl(346, 84%, 46%)",
  },
  
  transitions: {
    fast: "150ms cubic-bezier(0.16, 1, 0.3, 1)",
    normal: "250ms cubic-bezier(0.16, 1, 0.3, 1)",
    slow: "350ms cubic-bezier(0.16, 1, 0.3, 1)",
  }
};
