import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BirthdayProvider } from "./context/BirthdayContext";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Annuaire from "./pages/Annuaire";
import Personne from "./pages/Personne";
import Reglages from "./pages/Reglages";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BirthdayProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/annuaire" element={<Annuaire />} />
            <Route path="/personne/:id" element={<Personne />} />
            <Route path="/reglages" element={<Reglages />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BirthdayProvider>
  </StrictMode>,
);