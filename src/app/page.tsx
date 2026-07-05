import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Rooms from "@/components/Rooms";
import Gallery from "@/components/Gallery";
import Attractions from "@/components/Attractions";
import Availability from "@/components/Availability";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Rooms />
        <Gallery />
        <Attractions />
        <Availability />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
