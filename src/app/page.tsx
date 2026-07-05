import PasswordGate from "@/components/PasswordGate";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Schedule from "@/components/Schedule";
import HotelTravel from "@/components/HotelTravel";
import Explore from "@/components/Explore";
import Registry from "@/components/Registry";
import Rsvp from "@/components/Rsvp";
import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <PasswordGate>
      <Navbar />
      <main>
        <Hero />
        <Schedule />
        <HotelTravel />
        <Explore />
        <Registry />
        <Rsvp />
        <Faqs />
        <Footer />
      </main>
    </PasswordGate>
  );
}
