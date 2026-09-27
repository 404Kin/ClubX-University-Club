import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ClubDiscovery from "./components/ClubDiscovery";
import CampusPulse from "./components/CampusPulse";
import Announcements from "./components/Announcements";
import Mission from "./components/Mission";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ClubDetails from "./pages/ClubDetails";
import EventsPage from "./pages/EventsPage";   
import IntroScreen from "./components/IntroScreen";
import useReveal from "./hooks/useReveal";

import EventDetail from "./pages/EventDetail";

import "./App.css";
import "./styles/home.css";

function Home() {
  useReveal();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ClubDiscovery />
        <CampusPulse />
        <Announcements />
        <Mission />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const t = setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isInput = el.tagName === "INPUT";
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: isInput ? "center" : "start" });
      if (isInput) el.focus({ preventScroll: true });
    }, 60);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <BrowserRouter basename="/ClubX-University-Club/">
      <IntroScreen />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clubs/:slug" element={<ClubDetails />} />
        <Route path="/events" element={<EventsPage />} />  
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;