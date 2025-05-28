import { useState, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn-components/select";
import { Card } from "../shadcn-components/card";
import { Input } from "../shadcn-components/input";
import { cn } from "@/lib/tailwind/cn";
import { SelectProps } from "./types";
import { Label } from "./components/label";
import { Error } from "./components/error";
import { PrimaryKeyValuePair } from "@/app/types";
import { Spinner } from "../spinner";

export function SelectInput({
  placeholder,
  items,
  className,
  value,
  id,
  label,
  error,
  disabled,
  loading,
  selectWithSearch,
  onChange,
  onType,
}: SelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  // Function to hide and show drop down
  const handleToggleCardVisibility = useCallback(function (
    togglePayload: boolean
  ) {
    setOpen(togglePayload);
  },
  []);

  // Function to select a drop down
  const handleSelect = useCallback(
    function (item: PrimaryKeyValuePair) {
      if (onChange) onChange(item);
      handleToggleCardVisibility(false);
    },
    [handleToggleCardVisibility, onChange]
  );

  return (
    <>
      {label && (
        <Label htmlFor={id ?? ""} className="mb-5">
          {label}
        </Label>
      )}

      {selectWithSearch ? (
        <div className="relative">
          <Input
            disabled={disabled}
            className={cn(
              "w-full focus-visible:ring-0 focus-visible:ring-transparent",
              "focus-visible:border-2 border-2 focus:border-[#FB5806]",
              "py-5 px-5 rounded-lg mt-3"
            )}
            onFocus={() => handleToggleCardVisibility(true)}
            onBlur={() => handleToggleCardVisibility(false)}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              if (onType) onType(event.target.value);
            }}
            value={value ?? searchTerm}
            placeholder={placeholder ?? "Select an option"}
          />

          {open && (
            <div className="mt-3 absolute w-full max-h-[20rem] overflow-auto z-10 bg-white">
              <Card className="w-full h-full">
                <ul className="px-1 py-1">
                  {items
                    .filter((item) =>
                      item.text.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((item, index) => (
                      <li
                        key={index}
                        className={cn(
                          "border-b py-2 px-6 cursor-pointer hover:bg-[#f1f5f9] list-none text-sm rounded-sm gap-2",
                          item.hideSM
                            ? "hidden md:flex"
                            : item.hideMD
                            ? "flex md:hidden"
                            : item.hideLG
                            ? "flex md:flex lg:hidden"
                            : "flex"
                        )}
                        onMouseDown={() => handleSelect(item)}
                      >
                        {item.icon} {item.text}
                      </li>
                    ))}
                </ul>
                {loading && (
                  <Spinner className="border-r-white border-b-white border-t-black my-5 mx-auto" />
                )}
              </Card>
            </div>
          )}
        </div>
      ) : (
        <Select
          disabled={disabled}
          onValueChange={(payload) => {
            if (onChange) onChange(JSON.parse(payload));
          }}
        >
          <SelectTrigger className={cn("w-[180px] mt-3", className)}>
            <SelectValue placeholder={placeholder ?? "Select an option"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map(
                ({ value, text, icon, hideSM, hideMD, hideLG }, index) => (
                  <SelectItem
                    key={index}
                    value={JSON.stringify({ value, text })}
                    className={cn(
                      "border-b py-2",
                      hideSM
                        ? "hidden md:flex"
                        : hideMD
                        ? "flex md:hidden"
                        : hideLG
                        ? "flex md:flex lg:hidden"
                        : "flex"
                    )}
                  >
                    <div className="flex gap-2">
                      {icon} {text}
                    </div>
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>

          {loading && (
            <Spinner className="border-r-white border-b-white border-t-black mt-4" />
          )}
        </Select>
      )}
      {error && <Error className="mt-3">{error}</Error>}
    </>
  );
}
