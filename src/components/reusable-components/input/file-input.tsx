import { FileInputProps } from "./types";
import { Error } from "./components/error";
import { useCallback } from "react";
import { FileUpload } from "./components/file-upload";

export function FileInput({ error, children, onChange }: FileInputProps) {
  const handleChange = useCallback(
    function (file: FileList | null) {
      if (file) return onChange(file[0]);
    },
    [onChange]
  );
  return (
    <>
      <label className="cursor-pointer">
        <input
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={(event) => handleChange(event.target.files)}
        />
        {children ?? (
          <div className="flex gap-1">
            <FileUpload />
            <p className="text-sm">Upload a file</p>
          </div>
        )}
      </label>
      {error && <Error className="mt-2">{error}</Error>}
    </>
  );
}
