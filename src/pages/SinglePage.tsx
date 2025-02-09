// SinglePage.tsx
import { MapPin } from "lucide-react";
import { lazy, memo, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { GetData } from "../lib/getSinglePageContent";
import { Listing } from "../utils/types";

// Lazy-load components

const Footer = lazy(() => import("../components/Footer"));
const BookingForm = lazy(() => import("../components/BookingForm"));
const ImageSlider = lazy(() => import("../components/ImageSlider"));
const ImageGallery = lazy(() => import("../components/ImageGallery"));
const PropertyFeatures = lazy(() => import("../components/PropertyFeatures"));

// You can also consider using optimized image formats (like WebP)
// in these arrays or within the lazy-loaded image components.
const propertyImages = [
  {
    url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    alt: "Luxury beach house exterior",
  },
  {
    url: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
    alt: "Modern living room with ocean view",
  },
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    alt: "Stunning beachfront property",
  },
];

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    alt: "Kitchen",
  },
  {
    url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
    alt: "Master bedroom",
  },
  {
    url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd",
    alt: "Bathroom",
  },
  {
    url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
    alt: "Backyard",
  },
  {
    url: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    alt: "Dining area",
  },
  {
    url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
    alt: "Second bedroom",
  },
];

function SinglePage() {
  const { id } = useParams();
  const [data, setData] = useState<Listing | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const datas = await GetData();
        const found = datas.find((item: { slug: string }) => item.slug === id);
        setData(found);
      } catch (error) {
        console.error("Error fetching listing data:", error);
      }
    }
    getData();
  }, [id]);

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) {
    return <div>Loading listing data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <Header />

      {/* Image Slider */}
      <Suspense fallback={<div>Loading ...</div>}>
        <ImageSlider images={propertyImages} />
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content Area */}
          <div className="flex-1 space-y-8">
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

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Photo Gallery
              </h2>
              <Suspense fallback={<div>Loading gallery...</div>}>
                <ImageGallery images={galleryImages} />
              </Suspense>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Location
              </h2>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52871.863047091186!2d-118.84147151889642!3d34.03527055168927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e81da9f908d63f%3A0x93b72d71b2ea8c5a!2sMalibu%2C%20CA!5e0!3m2!1sen!2sus!4v1709669125061!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Booking Form */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="sticky top-20">
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
