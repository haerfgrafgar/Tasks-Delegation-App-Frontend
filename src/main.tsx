import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
