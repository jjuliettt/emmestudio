import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Portfolio from "@/components/Portfolio/Portfolio";
import Reviews from "@/components/Reviews/Reviews";
import Booking from "@/components/Booking/Booking";
import { heroSlides } from "@/lib/heroSlides";

export default function Home() {
  return (
    <>
      {/* lo slideshow: tutte le foto orizzontali del portfolio */}
      <Hero slides={heroSlides()} />
      <About />
      <Portfolio />
      <Reviews />
      {/* dopo la fascia beige delle recensioni */}
      <Booking after="beige" />
    </>
  );
}
