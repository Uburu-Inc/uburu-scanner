import { ButtonComponent } from "@/components/reusable-components/button";

export function EntriesSection() {
  return (
    <div>
      <div className="flex justify-end">
        <ButtonComponent className="bg-black">
          +&nbsp;&nbsp;Scan Document
        </ButtonComponent>
      </div>
    </div>
  );
}
