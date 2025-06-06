"use client";

import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Pictures } from "./icons/pictures";
import { cn } from "@/lib/tailwind/cn";
import Image from "next/image";
import { Loader } from "@/components/reusable-components/loader";
import { TextInput } from "@/components/reusable-components/input/text-input";
import { ButtonComponent } from "@/components/reusable-components/button";
import { scanSchema } from "./schema";
import { InfoData } from "./types";
import { useUburuPdfScanner } from "@/hooks/scanner";
import toast from "react-hot-toast";
import { EditDocument } from "./edit";
import { Maximize } from "./icons/maximize";
import { Edit } from "./icons/edit";
import { ErrorModal } from "./error-modal";
import { useRouter } from "next/navigation";

export function ScanDocumentAndUpload() {
  const {
    videoRef,
    canvasRef,
    open,
    setOpen,
    preview,
    setPreview,
    selectedImage,
    setSelectedImage,
    capturedImages,
    isLoading,
    error,
    cameraReady,
    currentImage,
    totalFileSize,
    updateImageFile,
    initCamera,
    stopCamera,
    captureImage,
    deleteImage,
    deleteAllImages,
    retryCamera,
    handleKeepScanning,
    getLatestImageAsFile,
  } = useUburuPdfScanner();

  const modalRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [section, setSection] = useState(0);
  const [maxImage, setMaxImage] = useState(false);

  const [name, setName] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
  });

  function onCloseCamModal() {
    setSection(0);
    setOpen(false);
    setSelectedImage({ id: 0, data: "" });
    stopCamera();
    deleteAllImages();
    toast.success("Redirecting...");
    setTimeout(() => router.push("/home"), 500);
  }

  function onUploadFileOutput() {
    setPreview(true);
  }

  function onCloseCamMainModal() {
    setSection(0);
    setOpen(false);
    setSelectedImage({ id: 0, data: "" });
    deleteAllImages();
    setOpen(false);
    initCamera(false, false);
  }

  const formik = useFormik({
    initialValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
    },
    validationSchema: scanSchema,
    onSubmit: function (payload: InfoData) {
      // Check to see if first name props matches first name payload
      onProceedWithScannedFileUpload(payload);
    },
  });

  function onProceedWithScannedFileUpload(payload: InfoData) {
    if (capturedImages.length === 0) return;

    const file = getLatestImageAsFile();
    if (file) {
      formik.resetForm();
      onCloseCamModal();
    }
  }

  // Start camera on mount with a delay (but only for initial mounting)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Pass true to use a delay, true to show loader for first initialization
      initCamera(true, true);
    }, 800);

    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      stopCamera();
    };
  }, []);

  return (
    <>
      <div className="bg-[#000] z-20 fixed bottom-0 right-0 w-full h-[100dvh] overflow-hidden">
        <div className="flex justify-end px-3 md:px-10">
          <button
            onClick={onCloseCamModal}
            className={cn(
              "absolute top-5 right-5 w-10 h-10 bg-black/50 text-white",
              "border-none rounded-full text-2xl flex justify-center",
              "items-center z-10 cursor-pointer transition duration-200 pb-1"
            )}
          >
            &times;
          </button>
        </div>

        {/* Only render camera view if gallery is not open */}
        {!open && (
          <>
            <div className="h-full">
              {/* Loading State */}
              {isLoading && (
                <div className="w-full aspect-[4/5] flex items-center justify-center rounded-2xl h-full w-full">
                  <Loader />
                </div>
              )}

              {/* Error State */}
              {!isLoading && error && (
                <div className="w-full aspect-[4/5] flex flex-col items-center justify-center bg-gray-200 mt-4 p-4">
                  <p className="text-red-500 mb-4">{error}</p>
                  <ButtonComponent onClick={retryCamera} className="px-4 py-2">
                    Retry Camera Access
                  </ButtonComponent>
                </div>
              )}

              {/* Camera container */}
              <div
                className="absolute border border-gray-200 overflow-hidden h-full"
                style={{ display: !isLoading && !error ? "block" : "none" }}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full top-0 left-0 object-cover"
                  autoPlay
                  playsInline
                  muted
                />
              </div>
              {/* Hidden canvas for capturing */}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Controls */}
            {cameraReady && (
              <div className={"flex justify-center"}>
                <div
                  className={cn(
                    "absolute bottom-7 left-0 w-full flex",
                    "justify-center items-center gap-5 z-20"
                  )}
                >
                  <button
                    className={cn(
                      "w-18 h-18 rounded-full bg-white/20 border-4 border-white/30 flex",
                      "justify-center items-center cursor-pointer transition-transform duration-200"
                    )}
                    onClick={captureImage}
                  >
                    <div className="w-[2.7rem] h-[2.7rem] rounded-full bg-[#fb5806] border-3 border-white/50" />
                  </button>

                  <button
                    className={cn(
                      "w-12 h-12 rounded-lg bg-black/40 border-2 border-white/30 flex",
                      "justify-center items-center cursor-pointer relative"
                    )}
                    disabled={capturedImages.length === 0}
                    onClick={() => {
                      setOpen(true);
                      setSection(1);
                    }}
                  >
                    <Pictures />
                    {capturedImages.length > 0 && (
                      <span
                        className={cn(
                          "absolute -top-2 -right-2 bg-[#fb5806] text-white",
                          "rounded-full w-5 h-5 flex justify-center items-center text-xs font-bold"
                        )}
                      >
                        {capturedImages.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Images Gallery and Edit modal - Only visible when open state is true */}
        {open && (
          <div className="px-3 md:px-10 fixed bottom-0 h-full bg-transparent w-full z-20 flex justify-between pt-4">
            {section === 0 && (
              <EditDocument
                open={open}
                onClose={() => setSection(1)}
                image={currentImage?.imageData ?? ""}
                onSave={(imageFile) => {
                  updateImageFile(currentImage?.imageId ?? "", imageFile);
                  setSection(1);
                }}
              />
            )}

            {section === 1 && (
              <div
                className={cn(
                  "w-full h-fit rounded-xl px-5",
                  "bg-white flex flex-col gap-5 overflow-auto"
                )}
              >
                <div
                  className="flex justify-end mt-3 text-[2rem] font-bold"
                  onClick={onCloseCamMainModal}
                >
                  <button>&times;</button>
                </div>

                <div className="max-h-[40dvh] overflow-auto w-full">
                  {currentImage?.imageData && (
                    <div className="max-h-[350px] w-full overflow-auto relative">
                      <div className="w-fit fixed p-3 z-[104] bg-[rgba(0,0,0,0.4)] flex gap-6">
                        <button onClick={() => setMaxImage(true)}>
                          <Maximize />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedImage({
                              id: selectedImage.id,
                              data: selectedImage.data,
                            });
                            setSection(0);
                          }}
                        >
                          <Edit />
                        </button>
                      </div>
                      <img
                        src={currentImage.imageData}
                        className="w-full h-fit object-contain bg-[#222] mb-5"
                        alt=""
                      />
                    </div>
                  )}

                  {maxImage && (
                    <div
                      className={
                        "w-full h-full z-[111] fixed bottom-0 right-0 bg-[rgba(0,0,0,0.9)]"
                      }
                    >
                      <button
                        className={cn(
                          "absolute top-5 right-5 w-10 h-10 bg-[rgba(0,0,0,0.5)] text-white border-0 rounded-full",
                          "text-2xl flex justify-center items-center z-30 cursor-pointer transition-all duration-200 pb-1"
                        )}
                        onClick={() => setMaxImage(false)}
                      >
                        &times;
                      </button>

                      <div className="w-full h-[100dvh] overflow-auto">
                        <img
                          src={currentImage?.imageData ?? ""}
                          className={
                            "w-full h-fit object-contain bg-[#222] rounded-lg mb-5"
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex gap-4 mt-1 overflow-auto">
                    {capturedImages.map(({ id, data }, index) => (
                      <div
                        key={`${id}-${index}`}
                        onClick={() => {
                          setSelectedImage({ id, data });
                          modalRef.current?.click();
                        }}
                      >
                        <div className="flex justify-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteImage(id);
                            }}
                            className="bg-black text-white h-6 w-6 rounded-full"
                          >
                            &times;
                          </button>
                        </div>
                        <div
                          className={cn(
                            "w-[95px] h-[100px] rounded-2xl relative",
                            selectedImage.id === id
                              ? "border-2 border-[green]"
                              : "border-2 border-[#fb5806]"
                          )}
                        >
                          <Image
                            src={data}
                            className="absolute rounded-2xl"
                            alt={""}
                            fill
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 mt-8">
                    <button
                      className={cn(
                        "w-full p-3 font-bold rounded-xl",
                        "bg-[#fb5806] text-white"
                      )}
                      disabled={capturedImages.length === 0}
                      onClick={onUploadFileOutput}
                    >
                      Upload Document
                    </button>
                    <button
                      className={cn(
                        "w-full p-3 font-bold rounded-xl",
                        "border border-[#fb5806] color-[#fb5806]"
                      )}
                      onClick={() => {
                        handleKeepScanning();
                        setSection(0);
                        setSelectedImage({ id: 0, data: "" });
                      }}
                    >
                      Keep Scanning
                    </button>
                  </div>
                  <p className="text-center mt-[.5rem] text-[.8rem] font-bold mt-8 mb-2">
                    {totalFileSize}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Preview Form */}
      {preview && (
        <div
          className={cn(
            "w-full h-full z-20 bg-[rgba(0,0,0,0.5)]",
            "fixed right-0 bottom-0",
            "flex items-center justify-center"
          )}
        >
          <div className="bg-white rounded-lg w-[22rem] px-4 py-4">
            <div className="w-full flex justify-end pb-3">
              <button
                className="text-[1.3rem] font-bold"
                onClick={() => setPreview(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <TextInput
                label="First Name (Required)"
                placeholder="John"
                name="first_name"
                value={formik?.values?.first_name}
                error={formik?.errors?.first_name as string}
                onChange={formik.handleChange}
              />
              <TextInput
                label="Middle Name (Required)"
                placeholder="Jones"
                name="middle_name"
                value={formik?.values?.middle_name}
                error={formik?.errors?.middle_name as string}
                onChange={formik.handleChange}
              />
              <TextInput
                label="Last Name (Required)"
                placeholder="Doe"
                name="last_name"
                value={formik?.values?.last_name}
                error={formik?.errors?.last_name as string}
                onChange={formik.handleChange}
              />
              <ButtonComponent className="w-full mt-5" type="submit">
                Proceed
              </ButtonComponent>
            </form>
          </div>
          <ErrorModal
            open={openErrorModal}
            data={name}
            onClose={() => setOpenErrorModal(false)}
          />
        </div>
      )}
    </>
  );
}
