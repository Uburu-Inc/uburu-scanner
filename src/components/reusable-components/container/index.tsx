import { cn } from "@/lib/tailwind/cn";
import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export function Container({ children, className }: Props) {
  return (
    <div className={cn("px-8", "md:px-20 2xl:px-[10rem]", className)}>
      {children}
    </div>
  );
}
