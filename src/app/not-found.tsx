import { AppIcon } from "@/components/reusable-components/icons/app-icon";
import { ButtonComponent } from "@/components/reusable-components/button";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="flex justify-center">
        <AppIcon className="mx-auto mb-3" />
        </div>
       
        <p className="text-xl font-bold text-center">Page not found</p>
        <Link href={"/"}>
          <ButtonComponent className="mx-auto mt-3">Go home</ButtonComponent>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
