import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeProvider.js";
import { Toaster } from "@/components/ui/toaster";
import { BuildingsContextProvider } from "./contexts/BuildingsContext.js";
import { BuildingContextProvider } from "./contexts/BuildingContext.js";
import { AuthContextProvider } from "./contexts/AuthContext.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <BuildingsContextProvider>
          <BuildingContextProvider>
            {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
            <App />
            {/* </ThemeProvider> */}
            {/* <Toaster /> */}
          </BuildingContextProvider>
        </BuildingsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
