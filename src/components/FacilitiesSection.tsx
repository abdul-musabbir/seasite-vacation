import {
  Car,
  Coffee,
  Dumbbell,
  Menu,
  MoreHorizontal,
  School as Pool,
  Wifi,
  Zap,
} from "lucide-react";

export default function FacilitiesSection() {
  return (
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
  );
}
