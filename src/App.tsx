import {
  Bath,
  Bed,
  Calendar,
  Car,
  Check,
  ChefHat,
  Coffee,
  Dumbbell,
  Heart,
  MapPin,
  Menu,
  MoreHorizontal,
  School as Pool,
  Search,
  Users,
  Wifi,
  Zap,
} from "lucide-react";

import Venmo from "./assets/venmo.svg";
import Zelle from "./assets/zelle.png";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import { GetData } from "./lib/getSinglePageContent";
import { Listing } from "./utils/types";

function App() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [ourFeaturedData, setOurFeaturedData] = useState<Listing[] | null>(
    null
  );

  useEffect(() => {
    async function getData() {
      const data = await GetData();

      setOurFeaturedData(data.data);
    }

    getData();
  }, [setOurFeaturedData]);

  console.log(ourFeaturedData);

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      {/* <nav className="bg-white py-4 px-6 flex items-center justify-between border-b">
        <div className="flex items-center space-x-8">
          <div className="text-xl font-bold">Travila</div>
        </div>

        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-yellow-400">
            Home
          </a>
          <a href="#" className="hover:text-yellow-400">
            Tours
          </a>
          <a href="#" className="hover:text-yellow-400">
            Destinations
          </a>
          <a href="#" className="hover:text-yellow-400">
            Activities
          </a>
          <a href="#" className="hover:text-yellow-400">
            Hotel
          </a>
          <a href="#" className="hover:text-yellow-400">
            Rental
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-black text-white px-4 py-2 rounded-full">
            Become Local Expert
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav> */}

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
      {/* Hero Section */}
      <div
        className="relative h-[800px] md:h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80")',
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            WEEKLY BEACH RENTALS <br />
            AT THE JERSEY SHORE
          </h1>
          <p className="text-xl mb-2">
            Located three houses from the beach. 2, 3, 4, and 6 bedroom houses
            available
          </p>

          <p className="text-xl mb-8 text-center">
            Please call or text 201-921-9969 <br /> Or email at
            seasidebeachvacations@gmail.com
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-lg p-4 w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2 border rounded-lg p-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="02 January 2024"
                  className="w-full outline-none text-gray-600"
                />
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="02 January 2024"
                  className="w-full outline-none text-gray-600"
                />
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3">
                <Users className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="2 adults, 2 children"
                  className="w-full outline-none text-gray-600"
                />
              </div>

              <div className="grid place-items-end">
                <button className="bg-black text-white px-6 py-3 rounded-full flex items-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Tours Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-3xl font-bold mb-2">Our Featured Tours</h2>
            <p className="text-gray-600">
              Favorite destinations based on customer reviews
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tour Cards */}
          {ourFeaturedData &&
            ourFeaturedData.map((item: Listing, index: number) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <div className="relative">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      index === 0
                        ? "1512917774080-9991f1c4c750"
                        : index === 1
                        ? "1580587771525-78b9dba3b914"
                        : "1600596542815-ffad4c1539a9"
                    }?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`}
                    alt="Property"
                    className="w-full h-64 object-cover"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full">
                    <Heart className="w-5 h-5" />
                  </button>
                  <div
                    className={`absolute top-4 left-4 ${
                      index === 0
                        ? "bg-purple-50 text-purple-800"
                        : index === 1
                        ? "bg-green-50 text-green-800"
                        : "bg-blue-50 text-green-800"
                    } px-3 py-1 rounded-full font-medium text-sm`}
                  >
                    {index === 0
                      ? "Top Rated"
                      : index === 1
                      ? "Best Sale"
                      : "25% Off"}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{item.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{item.num_bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{item.num_sleeps} Sleeps</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{item.num_bathrooms} Bathrooms</span>
                    </div>
                    <div className="flex items-center">
                      <ChefHat className="w-4 h-4 mr-2 text-gray-500" />
                      <span>Kitchen</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold">
                        ${item.peak_season_price}
                      </span>
                      <span className="text-gray-600"> / night</span>
                    </div>
                    <Link
                      to={item?.slug}
                      className="bg-black text-white px-4 py-2 rounded-full cursor-pointer"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Facilities Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col gap-12 justify-center items-center">
          {/* Left side - Content */}
          <div className="col-span-2 max-w-2xl text-center mx-auto">
            <h2 className="text-4xl font-bold mb-6">Features and Amenities</h2>
            <p className="text-gray-600 mb-8">
              Experience luxury and comfort with our comprehensive range of
              amenities designed to make your stay exceptional. Each facility is
              carefully maintained to ensure your complete satisfaction.
            </p>
          </div>

          {/* Right side - Facilities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-auto">
            {[
              {
                icon: (
                  <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-xl mb-3">
                    <Coffee className="w-6 h-6 text-emerald-500" />
                  </div>
                ),
                name: "Outdoor shower for when you come off beach",
              },
              {
                icon: (
                  <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-xl mb-3">
                    <Car className="w-6 h-6 text-emerald-500" />
                  </div>
                ),
                name: "Off street parking",
              },
              {
                icon: (
                  <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-xl mb-3">
                    <Wifi className="w-6 h-6 text-emerald-500" />
                  </div>
                ),
                name: "Smart TV",
              },
              {
                icon: (
                  <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-xl mb-3">
                    <Menu className="w-6 h-6 text-emerald-500" />
                  </div>
                ),
                name: "Full size kitchen fully equipped",
              },
              {
                icon: (
                  <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-xl mb-3">
                    <Zap className="w-6 h-6 text-emerald-500" />
                  </div>
                ),
                name: "Large back yard for play time",
              },
              {
                icon: (
                  <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-xl mb-3">
                    <Pool className="w-6 h-6 text-emerald-500" />
                  </div>
                ),
                name: "Fire pit for night time enjoyment",
              },
              {
                icon: (
                  <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-xl mb-3">
                    <Dumbbell className="w-6 h-6 text-emerald-500" />
                  </div>
                ),
                name: "High-speed internet connection",
              },
              {
                icon: (
                  <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-xl mb-3">
                    <MoreHorizontal className="w-6 h-6 text-emerald-500" />
                  </div>
                ),
                name: "Brand new central air conditioning",
              },
              {
                icon: (
                  <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-xl mb-3">
                    <MoreHorizontal className="w-6 h-6 text-emerald-500" />
                  </div>
                ),
                name: "Washer and dryer available",
              },
              {
                icon: (
                  <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-xl mb-3">
                    <MoreHorizontal className="w-6 h-6 text-emerald-500" />
                  </div>
                ),
                name: "Must More Feature",
              },
            ].map((facility, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {facility.icon}
                <h3 className="text-sm font-medium text-gray-800 text-opacity-60">
                  {facility.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative md:order-2">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Beach house"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8 md:order-1">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-[#0A2540]">
                Rental Note and
                <br />
                Booking Guideline
              </h1>

              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Check className="mt-1 text-blue-600" size={20} />
                  <span className="text-[#425466]">Key code entry.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="mt-1 text-blue-600" size={20} />
                  <span className="text-[#425466]">
                    All rentals are pet-friendly.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="mt-1 text-blue-600" size={20} />
                  <span className="text-[#425466]">
                    Beach badges not included with rentals.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="mt-1 text-blue-600" size={20} />
                  <span className="text-[#425466]">
                    $500 property damage security deposit for every rental.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="mt-1 text-blue-600" size={20} />
                  <span className="text-[#425466]">
                    All rentals have a $125 cleaning fee and $100 weekly utility
                    fee.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Tour Locations Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Image Grid */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="col-span-2 ">
              <img
                src="https://picsum.photos/id/243/1500/600"
                alt="Temple view"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Travelers on cliff"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Adventure jeep"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:pl-12">
            <h2 className="text-4xl font-bold mb-6">How to Book</h2>
            <p className="text-gray-600 mb-8">
              Follow those simple steps and secure your reservation.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="flex items-center space-x-3">
                {/* <div className="flex-shrink-0 w-5 h-5 text-green-500">✓</div> */}
                <Check className="w-5 h-5 flex-shrink-0 text-green-500" />
                <span>Find best house</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 flex-shrink-0 text-green-500" />
                <span>Book a reservation</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 flex-shrink-0 text-green-500" />
                <span>Pay secuirity deposit</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 flex-shrink-0 text-green-500" />
                <span>Secure your reservation</span>
              </div>
            </div>

            {/* Payment Section */}
            <div>
              <p className="text-gray-600 mb-8">
                Payment can be made by Venmo, Zelle, or by check. Deposit is due
                at the time of booking to secure your rental date. The rest of
                the rental payment will be put into a pay plan for your
                convenience. The entire rental must be paid off a month prior to
                the date of rental..
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Payment is secure and safe
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <img src={Venmo} alt="Venmo" className="w-24" />
                <img src={Zelle} alt="Zelle" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#fcfcf3]">
        <div className="max-w-7xl mx-auto px-4 py-16 space-y-10 md:space-y-5 md:py-24">
          <div className="">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-4xl font-bold text-black">
                They Love Travila
              </h2>
              <p className="text-[#959593] text-lg">
                What out clients are saying about us
              </p>
            </div>
          </div>
          <Slider />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
