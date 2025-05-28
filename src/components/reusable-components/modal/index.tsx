import React, { forwardRef, useCallback } from "react";
import { Button } from "../shadcn-components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn-components/dialog";
import { CloseModalIcon } from "../icons/close-modal-icon";
import { ModalProps } from "./type";

const Modal = forwardRef<HTMLButtonElement, ModalProps>(function (
  { title, description, children, closeButtonTitle },
  ref
) {
  const handleReturnToHomeScreen = useCallback(function () {
    location.reload();
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" ref={ref} className="hidden"></Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogClose asChild className="flex justify-end">
          <button>
            <CloseModalIcon />
          </button>
        </DialogClose>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
        {closeButtonTitle && (
          <div className="flex justify-center">
            <Button
              type="button"
              variant="secondary"
              onClick={handleReturnToHomeScreen}
            >
              {closeButtonTitle}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
});

Modal.displayName = "Modal";
export default Modal;
