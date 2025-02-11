import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface Image {
  url: string;
  alt: string;
}

export default function ImageGallery({ images }: { images: Image[] }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  // const [images, setImages] = useState<Image[]>([]);

  // Function to preload all images at once
  const preloadImages = () => {
    const imagePromises: Promise<void>[] = images.map((image) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = image.url;
        img.onload = () => resolve();
        img.onerror = () => {
          setFailedImages((prev) => new Set([...prev, image.url]));
          reject(`Failed to load image: ${image.url}`);
        };
        img.fetchPriority = "high";
      });
    });

    // Wait until all images are loaded
    Promise.all(imagePromises)
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  // Preload images on component mount
  useEffect(() => {
    if (images.length > 0) {
      preloadImages();
    }
  }, [images]);

  // Handle next image in gallery
  const handleNext = useCallback(() => {
    setSelectedImage((prev) =>
      prev === null ? 0 : prev === images.length - 1 ? 0 : prev + 1
    );
  }, [images.length]);

  // Handle previous image in gallery
  const handlePrevious = useCallback(() => {
    setSelectedImage((prev) =>
      prev === null
        ? images.length - 1
        : prev === 0
        ? images.length - 1
        : prev - 1
    );
  }, [images.length]);

  // Key event listeners for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;

      switch (e.key) {
        case "ArrowRight":
          handleNext();
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        case "Escape":
          setSelectedImage(null);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, handleNext, handlePrevious]);

  // Show loading spinner while images are loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: images.length }).map((_, index) => (
          <div
            key={index}
            className="aspect-square rounded-lg bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="group aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-100 transform-gpu"
            onClick={() => setSelectedImage(index)}
          >
            {failedImages.has(image.url) ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                <span className="text-sm">Failed to load image</span>
              </div>
            ) : (
              <img
                src={image.url}
                alt={image.alt}
                loading="eager" // Ensures image is loaded immediately
                className="w-full h-full object-cover transition-transform duration-300 will-change-transform
                  group-hover:scale-110 group-hover:brightness-90"
              />
            )}
          </div>
        ))}
      </div>

      {selectedImage !== null &&
        !failedImages.has(images[selectedImage].url) && (
          <div
            className="fixed inset-0 bg-black/95 z-50 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedImage(null);
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 z-10"
                aria-label="Close gallery"
              >
                <X className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              <button
                onClick={handlePrevious}
                className="absolute left-2 sm:left-4 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              <div className="relative max-w-[95vw] sm:max-w-[90vw] max-h-[90vh]">
                <img
                  src={images[selectedImage].url}
                  alt={images[selectedImage].alt}
                  className="object-contain w-full h-full max-h-[90vh] animate-fadeIn transform-gpu"
                />
                <p className="absolute bottom-0 left-0 right-0 text-center text-white/80 py-2 sm:py-4 bg-gradient-to-t from-black/50 to-transparent text-sm sm:text-base">
                  {images[selectedImage].alt}
                </p>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
