import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/home/Hero";
import { TopFlavours } from "@/components/sections/home/TopFlavours";
import { About } from "@/components/sections/home/About";
import { TodaysMenuAndEvents } from "@/components/sections/home/TodaysMenuAndEvents";
import { GoogleReviews } from "@/components/sections/home/GoogleReviews";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TopFlavours />
        <About />
        <TodaysMenuAndEvents />
        <GoogleReviews />
      </main>
      <Footer />
    </div>
  );
}

