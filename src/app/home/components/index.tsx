import { Container } from "@/components/reusable-components/container";
import { StartScan } from "./start-scan";
import { History } from "./history";

export function Home() {
  return (
    <>
      <Container className="bg-[#f5f5f5] py-7">
        <StartScan />
      </Container>
      <History />
    </>
  );
}
