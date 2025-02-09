import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Checkout from "./pages/Checkout.tsx";
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

if (process.env.NODE_ENV !== "production") {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={routerProvider} />
    </StrictMode>
  );
} else {
  createRoot(document.getElementById("root")!).render(
    <RouterProvider router={routerProvider} />
  );
}
