import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Preloader from "./components/Preloader.tsx";
import "./index.css";
import { DataProvider } from "./lib/dataContext.tsx";
import Checkout from "./pages/Checkout.tsx";
import House from "./pages/House.tsx";
import SinglePage from "./pages/SinglePage.tsx";

const NotFound = React.lazy(() => import("./pages/NotFound.tsx"));

const routerProvider = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:id",
    element: <SinglePage />,
  },
  {
    path: "/house",
    element: <House />,
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
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <DataProvider>
    <Suspense fallback={<Preloader />}>
      <RouterProvider router={routerProvider} />
    </Suspense>
  </DataProvider>
);
