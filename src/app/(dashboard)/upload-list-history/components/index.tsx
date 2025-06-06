import { Container } from "@/components/reusable-components/container";
import { data } from "../../home/components/history";
import { ListCard } from "@/components/list-card";

export function UploadListHistoryComponent() {
  return (
    <div>
      <Container>
        {data.map((item, key) => (
          <ListCard
            id={item.id}
            date={item.date}
            name={item.name}
            description={item.description}
            key={key}
          />
        ))}
      </Container>
    </div>
  );
}
