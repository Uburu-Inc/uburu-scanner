"use client";

import * as React from "react";

import { cn } from "@/lib/tailwind/cn";
import { EyeCloseIcon } from "../icons/eye-close";
import { EyeIcon } from "../icons/eye";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    // Conditionally set the type of the input to either text or password
    const isPassword = type !== "password" ? !type ? "text" : type : showPassword ? "text" : "password";

    // Toggle the visibility of the password
    const toggleVisibility = () => setShowPassword((prev) => !prev);

    return (
      <div className="relative w-full">
        <input
          type={isPassword}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background",
            "px-3 pr-10 py-2 text-sm ring-offset-background",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
