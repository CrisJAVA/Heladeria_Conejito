import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhatToFind from "./components/WhatToFind";
import Location from "./components/Location";
import PreOrder from "./components/PreOrder";
import Loyalty from "./components/Loyalty";
import Social from "./components/Social";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <WhatToFind />
        <Location />
        <PreOrder />
        <Loyalty />
        <Testimonials />
        <Social />
      </main>
      <Footer />
    </div>
  );
}