import { ButtonComponent } from "@/components/reusable-components/button";
import Link from "next/link";

interface Props {
  id: string;
  date: string;
  name: string;
  description: string;
}

export function ListCard({ id, date, name, description }: Props) {
  return (
    <div className="bg-[#fafafa] px-3 rounded-xl py-4 px-4 mt-3 flex justify-between">
      <div>
        <p className="text-sm text-[#868686]">
          {new Date(date).toDateString()}
        </p>
        <p className="text-[#000000] text-base font-bold">{name}</p>
        <p className="text-sm text-[#868686] max-w-[22ch]">{description}</p>
      </div>
      <Link href={`/upload-list-history/${id}`}>
        <ButtonComponent className="bg-transparent border border-[#FB5806] text-[#FB5806] mt-3">
          View Details
        </ButtonComponent>
      </Link>
    </div>
  );
}
