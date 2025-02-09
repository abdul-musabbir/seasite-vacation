import Venmo from "./assets/venmo.svg";
import Zelle from "./assets/zelle.png";

import React, { Suspense } from "react";

// Lazy-load components
const HeroSection = React.lazy(() => import("./components/HeroSection"));
const OurFeaturedTours = React.lazy(
  () => import("./components/OurFeaturedTours")
);
const FacilitiesSection = React.lazy(
  () => import("./components/FacilitiesSection")
);
const BookingGuideline = React.lazy(
  () => import("./components/BookingGuideline")
);
const HowToBook = React.lazy(() => import("./components/HowToBook"));
const TesnimonialsSection = React.lazy(
  () => import("./components/TesnimonialsSection")
);
const Footer = React.lazy(() => import("./components/Footer"));
const Header = React.lazy(() => import("./components/Header"));

function App() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <Header />
        <HeroSection />
        <OurFeaturedTours />
        <FacilitiesSection />
        <BookingGuideline />
        <HowToBook Venmo={Venmo} Zelle={Zelle} />
        <TesnimonialsSection />
        <Footer />
      </Suspense>
    </div>
  );
}

export default React.memo(App); // Wrap App with React.memo for optimization
