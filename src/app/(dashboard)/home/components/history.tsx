import { Container } from "@/components/reusable-components/container";
import { SearchIcon } from "./search-icon";
import { ListCard } from "@/components/list-card";
import Link from "next/link";

export const data = [
  {
    id: "1",
    date: "2025-06-05T11:05:58.882Z",
    name: "Williams Alex",
    description: "Usman Danfodiyo University Teaching Hospital Sokotos",
  },
  {
    id: "2",
    date: "2025-06-05T11:05:58.882Z",
    name: "Williams Alex",
    description: "Usman Danfodiyo University Teaching Hospital Sokotos",
  },
  {
    id: "3",
    date: "2025-06-05T11:05:58.882Z",
    name: "Williams Alex",
    description: "Usman Danfodiyo University Teaching Hospital Sokotos",
  },
  {
    id: "4",
    date: "2025-06-05T11:05:58.882Z",
    name: "Williams Alex",
    description: "Usman Danfodiyo University Teaching Hospital Sokotos",
  },
  {
    id: "5",
    date: "2025-06-05T11:05:58.882Z",
    name: "Williams Alex",
    description: "Usman Danfodiyo University Teaching Hospital Sokotos",
  },
];

export function History() {
  return (
    <div className="bg-white py-5">
      <Container>
        <div className="flex justify-between">
          <p className="font-bold">History</p>
          <Link href={"/upload-list-history"} className="text-[#FB5806] underline">
            View All
          </Link>
        </div>

        <div className="flex border border-2 rounded-2xl py-1 px-2 mt-3">
          <SearchIcon />
          <input type="text" className="outline-none w-full rounded-2xl" />
        </div>

        <div className="mt-5">
          {data.map((item, key) => (
            <ListCard
              id={item.id}
              date={item.date}
              name={item.name}
              description={item.description}
              key={key}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
