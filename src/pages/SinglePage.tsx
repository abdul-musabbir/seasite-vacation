// SinglePage.tsx
import { MapPin } from "lucide-react";
import { lazy, memo, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingCalendar from "../components/BookingCalendar";
import Headers from "../components/Headers";
import Preloader from "../components/Preloader";
import { useData } from "../lib/dataContext";
import { Listing } from "../utils/types";

// Lazy-load components

const Footer = lazy(() => import("../components/Footer"));
const BookingForm = lazy(() => import("../components/BookingForm"));
const ImageSlider = lazy(() => import("../components/ImageSlider"));
const ImageGallery = lazy(() => import("../components/ImageGallery"));
const PropertyFeatures = lazy(() => import("../components/PropertyFeatures"));

function SinglePage() {
  const { id } = useParams();
  const [data, setData] = useState<Listing | null>(null);
  const { getSingleData } = useData();
  useEffect(() => {
    async function getData() {
      try {
        setData(getSingleData(id));
      } catch (error) {
        console.error("Error fetching listing data:", error);
      }
    }
    getData();
  }, [id, getSingleData]);

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <Headers />

      {/* Image Slider */}
      <Suspense fallback={<Preloader />}>
        <ImageSlider images={JSON.parse(data.gallery_images)} />
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content Area */}
          <div className="flex-1 space-y-10">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{data.title}</h1>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{data.location}</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{data.description}</p>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Features & Amenities
              </h2>
              <Suspense fallback={<div>Loading features...</div>}>
                <PropertyFeatures />
              </Suspense>
            </div>

            <BookingCalendar />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Photo Gallery
              </h2>
              <Suspense fallback={<div>Loading gallery...</div>}>
                <ImageGallery images={JSON.parse(data.gallery_images)} />
              </Suspense>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Location
              </h2>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={data?.map_url}
                  className="w-full"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right Booking Form */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="sticky top-28">
              <Suspense fallback={<div>Loading booking form...</div>}>
                <BookingForm data={data} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default memo(SinglePage);
