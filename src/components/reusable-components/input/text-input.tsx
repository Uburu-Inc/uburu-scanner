import { twMerge } from "tailwind-merge";
import { InputProps } from "./types";
import { Label } from "./components/label";
import { Error } from "./components/error";
import { Input } from "../shadcn-components/input";

export function TextInput({
  label,
  className,
  error,
  id,
  ...props
}: InputProps) {
  return (
    <>
      {label && <Label htmlFor={id ?? ""}>{label}</Label>}
      <Input
        {...props}
        className={twMerge(
          "w-full focus-visible:ring-0",
          "focus-visible:border-2 border-2 focus-visible:ring-transparent",
          "focus:border-[#FB5806] py-5 px-5 rounded-lg mt-3"
        )}
      />
      {error && <Error className="mt-2">{error}</Error>}
    </>
  );
}
