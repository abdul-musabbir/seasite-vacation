import Venmo from "./assets/venmo.svg";
import Zelle from "./assets/zelle.png";
type GetPriceLabel = (
  priceType: string,
  price: number,
  minStay: number
) => string;

import React, { Suspense, useCallback, useEffect, useState } from "react";
import { GetData } from "./lib/getSinglePageContent";
import { Listing } from "./utils/types";

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
  const [ourFeaturedData, setOurFeaturedData] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true); // Loading state to handle component loading

  const fetchData = useCallback(async () => {
    setLoading(true); // Set loading to true when starting to fetch data
    try {
      const data = await GetData();

      if (Array.isArray(data)) {
        setOurFeaturedData(data);
      } else {
        setOurFeaturedData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setOurFeaturedData([]);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getPriceLabel: GetPriceLabel = useCallback(
    (priceType: string, price: number, minStay: number) => {
      let priceLabel = "";

      if (priceType === "normal") {
        if (minStay === 7) {
          priceLabel = `$${price.toFixed(2)} per week`;
        } else {
          priceLabel = `$${price.toFixed(2)} per night`;
        }
      } else {
        if (minStay === 7) {
          priceLabel = `$${price.toFixed(2)} per week`;
        } else if (minStay > 1) {
          priceLabel = `$${price.toFixed(2)} per ${minStay} nights`;
        } else {
          priceLabel = `$${price.toFixed(2)} per night`;
        }
      }

      return priceLabel;
    },
    []
  );

  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <Header />
        <HeroSection />
        <OurFeaturedTours
          getPriceLabel={getPriceLabel}
          ourFeaturedData={ourFeaturedData}
          loading={loading} // Pass loading state to the featured tours component
        />
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
