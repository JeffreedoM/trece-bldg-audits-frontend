import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeProvider.js";
import { Toaster } from "@/components/ui/toaster";
import { BuildingsContextProvider } from "./contexts/BuildingsContext.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BuildingsContextProvider>
        {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
        <App />
        {/* </ThemeProvider> */}
        <Toaster />
      </BuildingsContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
