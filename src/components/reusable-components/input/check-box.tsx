"use client";

import { Checkbox } from "../shadcn-components/checkbox";
import { cn } from "@/lib/tailwind/cn";
import { CheckboxProps } from "./types";

export function CheckBox({ children, labelClassName, onCheck }: CheckboxProps) {
  return (
    <div className="flex space-x-2">
      <div>
        <Checkbox id="terms" onClick={() => onCheck(children as string)} />
      </div>
      <div>
        <label
          htmlFor="terms"
          className={cn(
            "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            labelClassName
          )}
        >
          {children}
        </label>
      </div>
    </div>
  );
}
