import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Portfolio from "@/components/Portfolio/Portfolio";
import Reviews from "@/components/Reviews/Reviews";
import Booking from "@/components/Booking/Booking";
import HandTitle from "@/components/HandTitle/HandTitle";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Portfolio />
      <Reviews note={<HandTitle slot="love-notes" lines={["love notes"]} />} />
      <Booking />
    </>
  );
}
