import Image from "next/image";

export function StartScan() {
  return (
    <div className="bg-white px-8 py-6 rounded-2xl border border-2 py-5">
      <p className="text-center">
        Click the button below to scan a patient folder & digitize records.
      </p>
      <div className="flex justify-center py-7">
        <div className="relative w-[50px] h-[50px]">
          <Image
            alt=""
            src={"/images/init-scan.png"}
            fill
            className="absolute"
          />
        </div>
      </div>
    </div>
  );
}
