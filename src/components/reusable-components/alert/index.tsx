import { twMerge } from "tailwind-merge";
import { alertData } from "./constant";
import { Props } from "./type";

export function Alert({ type, text, display, onDisplay, className }: Props) {
  return (
    <section>
      {display && (
        <div
          className={twMerge(
            "rounded-lg px-4 py-4 justify-between",
            alertData[type],
            className
          )}
        >
          <div className="flex justify-between">
            <p className="text-base mt-1">{text}</p>
            <button onClick={onDisplay} className="text-2xl font-bold">
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
