import { cn } from "@/lib/tailwind/cn";
import { ErrorProps } from "../types";

export function Error({ children, className }: ErrorProps) {
  return <p className={cn("text-sm text-[red]", className)}>{children}</p>;
}
