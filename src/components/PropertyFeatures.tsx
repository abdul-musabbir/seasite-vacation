import {
  Car,
  Flame,
  ShowerHead as Shower,
  Trees,
  Tv,
  UtensilsCrossed,
  WashingMachine as Washing,
  Wifi,
  Wind,
} from "lucide-react";

const features = [
  { icon: Shower, text: "Outdoor shower for beach days" },
  { icon: Car, text: "Off-street parking" },
  { icon: Tv, text: "Smart TV" },
  { icon: UtensilsCrossed, text: "Full-size equipped kitchen" },
  { icon: Trees, text: "Large backyard" },
  { icon: Flame, text: "Fire pit" },
  { icon: Wifi, text: "High-speed internet" },
  { icon: Wind, text: "Central air conditioning" },
  { icon: Washing, text: "Washer and dryer" },
];

export default function PropertyFeatures() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div key={index} className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">{feature.text}</span>
          </div>
        );
      })}
    </div>
  );
}
