import { AlertColors } from "./type";

export const alertData: Partial<Record<AlertColors, string>> = {
  danger: "bg-[#f8d7da] border border-[#f5c2c7] text-[#842029]",
  warning: "bg-[#fff3cd] border border-[#ffecb5] text-[#664d03]",
  success: "bg-[#d1e7dd] border border-[#badbcc] text-[#0f5132]",
  info: "bg-[#cfe2ff] border border-[#b6d4fe] text-[#084298]",
};
