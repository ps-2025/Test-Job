import React from "react";
import ErrorBoundary from "@components/ErrorBoundary";
import { createRoot } from "react-dom/client";
import App from "./App";
import { FavoriteProjectsProvider } from "@provider/FavoriteProjectProvider";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <FavoriteProjectsProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </FavoriteProjectsProvider>
  </React.StrictMode>
);
