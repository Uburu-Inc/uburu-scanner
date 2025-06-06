import { ReactNode } from "react";
import { Navigation } from "@/components/navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Navigation />
      <div className="py-3">{children}</div>
    </main>
  );
}
