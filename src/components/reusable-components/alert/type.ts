export type AlertColors = "danger" | "warning" | "success" | "info";

export interface Props {
  type: AlertColors;
  text: string;
  display: boolean;
  onDisplay: () => void;
  className?: string;
}
