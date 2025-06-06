"use client";

import { useRef } from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import { Close } from "./icons/close";
import { Check } from "./icons/check";

interface Props {
  open: boolean;
  onClose: () => void;
  image: string;
  onSave: (croppedImage: string) => void;
}

export function EditDocument({ open, onClose, image, onSave }: Props) {
  const cropperRef = useRef<CropperRef>(null);

  const handleSave = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      if (canvas) {
        const croppedImage = canvas.toDataURL();
        onSave?.(croppedImage);
      }
    }
  };

  return (
    <>
      {open && (
        <div
          className={"fixed bottom-0 right-0 bg-black/90 z-[110] w-full h-full"}
        >
          <Cropper ref={cropperRef} src={image} className={"w-full h-[90dvh]"} />
          <div className="flex justify-center">
            <div className={"flex gap-4 pt-6"}>
              <button
                onClick={onClose}
                className="rounded-full h-8 w-8 pl-[0.25rem] bg-[#fb5806]"
              >
                <Close />
              </button>
              <button
                onClick={handleSave}
                className="rounded-full h-8 w-8 pl-[0.25rem] bg-[greenyellow]"
              >
                <Check />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
