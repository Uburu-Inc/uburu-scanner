import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import jsPDF from "jspdf";
import toast from "react-hot-toast";

type CapturedImage = {
  id: number;
  data: string;
};
interface UploadFileProps {
  one_record_id: string;
  fileName: string;
}

export function useUburuPdfScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ id: 0, data: "" });
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Flag to track initialization in progress to prevent duplicate calls
  const initInProgressRef = useRef(false);

  // Track if camera was previously initialized (important for remounting)
  const cameraInitializedRef = useRef(false);

  // Derived state values (Serving as condition)
  const cameraReady = !isLoading && stream && !error;

  const totalFileSize = capturedImages.length
    ? `${capturedImages.length} images captured`
    : "";

  const currentImage = useMemo(() => {
    if (selectedImage.data && selectedImage.id) {
      return {
        imageData: selectedImage.data,
        imageId: selectedImage.id,
      };
    }

    if (open) {
      return {
        imageData: capturedImages[capturedImages.length - 1]?.data ?? "",
        imageId: capturedImages[capturedImages.length - 1]?.id ?? "",
      };
    }
  }, [selectedImage.data, selectedImage.id, open, capturedImages]);

  const getBackCameraConstraints = useCallback(async () => {
    const defaultConstraints = {
      video: {
        facingMode: "environment",
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
    };

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        // If we have multiple cameras -> (might be an external camera), try to find the back camera.
        if (videoDevices.length > 1) {
          const backCameras = videoDevices.filter(
            (device) =>
              device.label.toLowerCase().includes("back") ||
              device.label.toLowerCase().includes("rear") ||
              device.label.toLowerCase().includes("environment")
          );

          if (backCameras.length > 0) {
            return {
              video: {
                deviceId: { exact: backCameras[0].deviceId },
                width: { ideal: 1920 },
                height: { ideal: 1080 },
              },
            };
          }

          if (videoDevices.length >= 2) {
            return {
              video: {
                deviceId: {
                  exact: videoDevices[videoDevices.length - 1].deviceId,
                },
                width: { ideal: 1920 },
                height: { ideal: 1080 },
              },
            };
          }
        }
      }
    } catch (error) {
      console.warn("Error enumerating devices:", error);
    }

    return defaultConstraints;
  }, []);

  const initCamera = useCallback(
    async (forceDelay = false, showLoader = true) => {
      // Ensure we're in a browser
      if (typeof window === "undefined") return;

      // Prevent duplicate initialization
      if (initInProgressRef.current) {
        return;
      }

      initInProgressRef.current = true;

      // Only show loading indicator for initial camera setup, not for quick transitions
      if (showLoader) {
        setIsLoading(true);
      }
      setError(null);

      try {
        // Clean up existing stream first
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
          setStream(null);

          if (videoRef.current) {
            videoRef.current.srcObject = null;
            // Make sure any pending play() requests are properly canceled
            videoRef.current.pause();
            videoRef.current.load();
          }
          // Added a small delay when stopping an existing stream to ensure full cleanup
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        // Get the appropriate camera constraints
        const constraints = await getBackCameraConstraints();

        // Request camera access with the determined constraints (to ensure we use back camera when available)
        const mediaStream = await navigator.mediaDevices.getUserMedia(
          constraints
        );

        setStream(mediaStream);
        cameraInitializedRef.current = true;

        const setupVideo = () => {
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;

            videoRef.current
              .play()
              .then(() => {
                setIsLoading(false);
                // Clear initialization flag
                initInProgressRef.current = false;
              })
              .catch((err) => {
                console.error("Play error:", err);
                setIsLoading(false);
                initInProgressRef.current = false;
              });
          } else {
            setError("Video element not available. Please try again.");
            setIsLoading(false);
            // Clear initialization flag
            initInProgressRef.current = false;
          }
        };

        if (!cameraInitializedRef.current || forceDelay) {
          setTimeout(setupVideo, 500);
        } else {
          // Immediate setup for recurring scans
          setupVideo();
        }
      } catch (err) {
        console.error("Camera initialization error:", err);
        setError(
          `Failed to initialize camera: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
        setIsLoading(false);
        initInProgressRef.current = false;
      }
    },
    [stream, getBackCameraConstraints]
  );

  const stopCamera = useCallback(() => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      setStream(null);

      if (videoRef.current) {
        videoRef.current.srcObject = null;
        // Ensure any pending play requests are canceled
        videoRef.current.pause();
        videoRef.current.load();
      }
    }
  }, [stream]);

  const captureImage = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !stream) {
      setError("Camera not ready. Please try again.");
      return;
    }

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;

      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Could not get canvas context");
      }

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL("image/jpeg", 0.8);

      const newImage: CapturedImage = {
        id: Date.now(),
        data: imageData,
      };

      setCapturedImages((prev) => [...prev, newImage]);
      setOpen(true);
    } catch (error) {
      console.error("Error capturing image:", error);
      setError(
        `Failed to capture image: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }, [stream]);

  const updateImageFile = useCallback((imageId: number | string, imageFile: string) => {
    const updatedImage = capturedImages.map((imageFiles) => {
      if (imageFiles.id.toString() === imageId.toString()) {
        return {
          ...imageFiles,
          data: imageFile,
        };
      }
      return imageFiles;
    });
    setCapturedImages(updatedImage);
  }, [capturedImages]);

  const getLatestImageAsFile = useCallback(() => {
    if (capturedImages.length === 0) return null;

    const imageData = capturedImages[capturedImages.length - 1].data;
    const byteString = atob(imageData.split(",")[1]);
    const mimeString = imageData.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    return new File([blob], "captured_document.jpg", { type: "image/jpeg" });
  }, [capturedImages]);

  const deleteImage = useCallback((id: number) => {
    setCapturedImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  const deleteAllImages = useCallback(() => {
    setCapturedImages([]);
  }, []);

  const downloadPDF = useCallback(
    // This is a simplified version - you can modify or re-integrate your existing ones
    (fileName: string = "scanned-document") => {
      if (capturedImages.length === 0) {
        console.error("No images captured");
        return null;
      }

      const pdf = new jsPDF();
      capturedImages.forEach((img, index) => {
        if (index > 0) pdf.addPage();
        pdf.addImage(img.data, "JPEG", 0, 0, 210, 297);
      });

      pdf.save(`${fileName}.pdf`);
      return true;
    },
    [capturedImages]
  );

  const fetchUburuScannedFile = useCallback(() => {
    if (capturedImages.length === 0) {
      toast.error("Capture at least one image first!");
      return;
    }

    const pdf = new jsPDF();
    const canvas = canvasRef.current;

    capturedImages.forEach((img, index) => {
      if (index > 0) pdf.addPage();
      if (canvas) {
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(img.data, "JPEG", 0, 0, pdfWidth, pdfHeight);
      }
    });

    const pdfBlob = new Blob([pdf.output("arraybuffer")], {
      type: "application/pdf",
    });

    return pdfBlob;
  }, [capturedImages]);


  const determineFileWeightType = useCallback((size: number) => {
    switch (true) {
      case size < 1024:
        return `${size} byte${size === 1 ? "" : "s"}`;
      case size < 1024 * 1024:
        return `${(size / 1024).toFixed(2)} KB`;
      case size < 1024 * 1024 * 1024:
        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
      default:
        return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  }, []);

  const getTotalFileSize = useMemo(() => {
    const imageFiles = capturedImages.map((i) => i.data);

    const totalSize = imageFiles.reduce((acc, imageFile) => {
      const byteString = atob(imageFile.split(",")[1]);
      const byteArray = new Uint8Array(byteString.length);

      for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([byteArray], { type: "image/jpeg" });
      return acc + blob.size;
    }, 0);

    return determineFileWeightType(totalSize);
  }, [capturedImages, determineFileWeightType]);

  const retryCamera = useCallback(() => {
    initCamera(false, true);
  }, [initCamera]);

  const handleKeepScanning = useCallback(() => {
    setOpen(false);
    initCamera(false, false);
  }, [initCamera]);

  useEffect(() => {
    if (
      !open &&
      cameraInitializedRef.current &&
      !stream &&
      !initInProgressRef.current
    ) {
      // Initialize directly without showing the loader - our flag system will prevent duplicate initializations
      // For automatic reinitializations, don't show the loading indicator
      initCamera(false, false);
    }
  }, [open, stream, initCamera]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [stream]);

  return {
    // Refs
    videoRef,
    canvasRef,

    // State
    open,
    setOpen,
    preview,
    setPreview,
    selectedImage,
    setSelectedImage,
    capturedImages,
    stream,
    isLoading,
    error,
    cameraReady,
    currentImage,
    totalFileSize,
    getTotalFileSize,

    // Actions
    updateImageFile,
    initCamera,
    stopCamera,
    captureImage,
    deleteImage,
    deleteAllImages,
    retryCamera,
    handleKeepScanning,
    downloadPDF,

    fetchUburuScannedFile,
    getLatestImageAsFile
  };
}
