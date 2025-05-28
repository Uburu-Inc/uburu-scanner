import { Button } from "../shadcn-components/button";
import { Spinner } from "../spinner";
import { ButtonProps } from "./type";

export const ButtonComponent = ({
  className,
  children,
  loading,
  ...props
}: ButtonProps) => (
  <Button
    className={`bg-[#FB5806] flex ${loading ? "gap-3" : ""} ${className ?? ""}`}
    disabled={loading}
    {...props}
  >
    {loading && <Spinner />}
    {children}
  </Button>
);
