import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { GetData } from "./lib/getSinglePageContent.ts";
import Checkout from "./pages/Checkout.tsx";
import { Listing } from "./utils/types.ts";

// Lazy-loaded components
const App = lazy(() => import("./App.tsx"));
const SinglePage = lazy(() => import("./pages/SinglePage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Loader function to handle route validation
const validateRoute = async ({ params }: { params: { id: string } }) => {
  try {
    const data = await GetData();
    const matchingItem = data.data.find(
      (item: Listing) => item.slug === params.id
    );

    if (!matchingItem) {
      throw new Response("Not Found", { status: 404 });
    }

    return matchingItem; // Return the matching item to be used in the component
  } catch (error) {
    throw new Response("Failed to load data", { status: 500 });
  }
};

// Define the routes
const routerProvider = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    ),
  },
  {
    path: "/:id",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SinglePage />
      </Suspense>
    ),
    loader: validateRoute,
  },
  {
    path: "/checkout",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Checkout />
      </Suspense>
    ),
  },
  {
    path: "*", // Catch-all for any unmatched routes
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
] as RouteObject[]);

// Set up the root component
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routerProvider} />
  </StrictMode>
);
