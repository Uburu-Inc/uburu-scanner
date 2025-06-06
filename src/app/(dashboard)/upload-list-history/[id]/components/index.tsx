"use client";

import { Container } from "@/components/reusable-components/container";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { UploadSummarySection } from "./upload-summary-section";
import { EntriesSection } from "./entries-section";

export function UploadListSummaryComponent() {
  const [tab, setTab] = useState(0);
  return (
    <div>
      <Container>
        <div className="flex gap-5 border-b-2">
          <button
            className={twMerge(
              "font-bold border-b-4 pb-3",
              tab === 0 ? "border-[#FB5806]" : "border-white text-[#9D9DA6]"
            )}
            onClick={() => setTab(0)}
          >
            Upload Summary
          </button>
          <button
            className={twMerge(
              "font-bold border-b-4 pb-3",
              tab === 1 ? "border-[#FB5806]" : "border-white text-[#9D9DA6]"
            )}
            onClick={() => setTab(1)}
          >
            Entries
          </button>
        </div>

        <div className="py-4">
          {tab === 0 && <UploadSummarySection />}
          {tab === 1 && <EntriesSection />}
        </div>
      </Container>
    </div>
  );
}
