import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import BackgroundMusic from "@/components/BackgroundMusic";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Artists from "@/components/sections/Artists";
import Album from "@/components/sections/Album";
import Tours from "@/components/sections/Tours";
import News from "@/components/sections/News";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <BackgroundMusic />
      <SmoothScroll>
        <Nav />
        <main>
          <Hero />
          <About />
          <News />
          <Services />
          <Artists />
          <Album />
          <Tours />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
