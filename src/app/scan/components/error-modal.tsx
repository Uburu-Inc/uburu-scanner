import { cn } from "@/lib/tailwind/cn";

interface Props {
  data?: {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
  };
  open: boolean;
  onClose: () => void;
}

export function ErrorModal({ data, open, onClose }: Props) {
  return (
    <>
      {open && (
        <div
          className={cn(
            "bg-[rgba(0,0,0,0.4)] h-full w-full fixed bottom-0",
            "right-0 z-[105] flex justify-center items-center"
          )}
        >
          <div className={"bg-white w-[20rem] p-3.5 rounded-lg"}>
            <div className={"flex justify-end"}>
              <button
                className={"text-xl font-bold"}
                onClick={onClose}
                type="button"
              >
                &times;
              </button>
            </div>
            <p className={"text-[#fb5806] font-bold"}>
              There is patient name mismatch, please look at the suggestion
              below:
            </p>
            <div style={{ marginTop: "1rem" }}>
              {data?.first_name && (
                <p>
                  <span style={{ fontWeight: "bold" }}>First Name: </span>
                  <span>{data?.first_name}</span>
                </p>
              )}
              {data?.middle_name && (
                <p>
                  <span style={{ fontWeight: "bold" }}>Middle Name: </span>
                  <span>{data?.middle_name}</span>
                </p>
              )}
              {data?.last_name && (
                <p>
                  <span style={{ fontWeight: "bold" }}>Last Name: </span>
                  <span>{data?.last_name}</span>
                </p>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className={
                  "bg-[#fb5806] text-white rounded-md px-3 py-2 font-bold mt-4"
                }
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
