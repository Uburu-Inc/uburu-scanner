"use client";

import Image from "next/image";
import { AppIcon } from "@/components/reusable-components/icons/app-icon";
import { Container } from "@/components/reusable-components/container";
import { MenuIcon } from "@/components/menu-icon";
import { DownIcon } from "@/components/down-icon";

export function Navigation() {
  return (
    <nav className="bg-white py-5">
      <Container className="flex justify-between">
        <AppIcon />
        <div className="flex gap-2">
          <div className="flex gap-3">
            <div className="relative w-[35px] h-[35px] rounded-full">
              <Image
                alt=""
                src={"/images/profile.png"}
                className="absolute"
                fill
              />
            </div>
            <DownIcon />
          </div>
          <button>
            <MenuIcon />
          </button>
        </div>
      </Container>
    </nav>
  );
}
