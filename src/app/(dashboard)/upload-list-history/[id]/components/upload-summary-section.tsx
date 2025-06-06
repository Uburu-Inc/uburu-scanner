import { CalenderIcon } from "./calender-icon";

export function UploadSummarySection() {
  return (
    <div>
      <p>Patient’s Bio Data</p>

      <div className="mt-6">
        <p>First name</p>
        <div className="w-full border border-[#D9D9D9] mt-2 px-3 py-3 rounded-lg">
          Alex
        </div>
      </div>

      <div className="mt-6">
        <p>Middle Name</p>
        <div className="w-full border border-[#D9D9D9] mt-2 px-3 py-3 rounded-lg"></div>
      </div>

      <div className="mt-6">
        <p>Last name</p>
        <div className="w-full border border-[#D9D9D9] mt-2 px-3 py-3 rounded-lg">
          Williams
        </div>
      </div>

      <div className="mt-6">
        <p>Date of Birth</p>
        <div className="w-full border border-[#D9D9D9] mt-2 px-3 py-3 rounded-lg flex justify-between">
          <p>01/01/1993</p>
          <CalenderIcon />
        </div>
      </div>

      <div className="mt-6">
        <p>State of Origin</p>
        <div className="w-full border border-[#D9D9D9] mt-2 px-3 py-3 rounded-lg">
          Imo
        </div>
      </div>
    </div>
  );
}
