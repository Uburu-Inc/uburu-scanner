import { cn } from "@/lib/tailwind/cn";

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-spin h-4 w-4 rounded-full border-2 border-l-white border-r-white border-b-white border-t-transparent border-solid",
        className
      )}
    ></div>
  );
}
