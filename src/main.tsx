import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeProvider.js";
import { Toaster } from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
      <App />
      {/* </ThemeProvider> */}
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>,
);
