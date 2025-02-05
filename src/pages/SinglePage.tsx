import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import Footer from "../components/Footer";
import ImageGallery from "../components/ImageGallery";
import ImageSlider from "../components/ImageSlider";
import PropertyFeatures from "../components/PropertyFeatures";
import { GetData } from "../lib/getSinglePageContent";
import { Listing } from "../utils/types";

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
  const [showDropDown, setShowDropDown] = useState(false);
  const [data, setData] = useState<Listing | null>();

  useEffect(() => {
    async function getData() {
      const datas = await GetData();
      const data = datas.data.find(
        (item: { slug: string }) => item.slug === id
      );
      setData(data);
    }

    getData();
  }, [setData]);

  useEffect(() => {
    // This will run when the component mounts
    window.scrollTo(0, 0);
  }, []);
  if (data === null) {
    // Fallback rendering during hydration or loading
    return <div>Loading...</div>; // You can replace this with a spinner or custom loading component
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white sticky w-full z-20 top-0 start-0 border-b border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              Flowbite
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
            >
              Get started
            </button>
            <button
              onClick={() => setShowDropDown((prev) => !prev)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between absolute md:static md:top-0 md:left-0 md:px-0 top-20 left-0 px-3 sm:px-10 w-full md:flex md:w-auto md:order-1 ${
              showDropDown ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  House
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                >
                  How To Book
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ImageSlider images={propertyImages} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content Area */}
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {data?.title}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{data?.name}</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{data?.description}</p>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Features & Amenities
              </h2>
              <PropertyFeatures />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Photo Gallery
              </h2>
              <ImageGallery images={galleryImages} />
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
            <div className="sticky top-8">
              <BookingForm data={data} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SinglePage;
