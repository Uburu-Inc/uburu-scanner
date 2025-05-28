import { ReactNode } from "react";

export type ModalProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  closeButtonTitle?: string;
};
