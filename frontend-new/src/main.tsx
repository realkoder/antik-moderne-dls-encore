import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { ClerkProvider } from "@clerk/clerk-react";
import Home from "./templates/home.tsx";
import { AboutTemplate } from "./templates/about.tsx";
import PostersTemplate from "./templates/posters.tsx";
import Layout from "./templates/Layout.tsx";
import { GenresTemplate } from "./templates/genres.tsx";
import App from "./App.tsx";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NextThemesProvider>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<AboutTemplate />} />
              <Route path="/genres" element={<GenresTemplate />} />
              <Route path="/login" element={<App />} />
              <Route path="/posters" element={<PostersTemplate />} />
            </Route>
          </Routes>
        </ClerkProvider>
      </NextThemesProvider>
    </BrowserRouter>
  </StrictMode>
);
