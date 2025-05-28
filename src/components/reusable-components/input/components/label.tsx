
import { cn } from "@/lib/tailwind/cn";
import { LabelProps } from "../types";

export function Label({ htmlFor, children, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("text-sm leading-6 text-black", className)}
    >
      {children}
    </label>
  );
}
