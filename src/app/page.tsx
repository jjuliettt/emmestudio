import Hero from "@/components/Hero/Hero";
import AboutTeaser from "@/components/About/AboutTeaser";
import Portfolio from "@/components/Portfolio/Portfolio";
import Reviews from "@/components/Reviews/Reviews";
import Booking from "@/components/Booking/Booking";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <Portfolio />
      <Reviews />
      <Booking />
    </>
  );
}
