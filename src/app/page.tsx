import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Clients from "@/components/sections/Clients";
import Tools from "@/components/sections/Tools";
import Works from "@/components/sections/Works";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 w-full">
      <Hero />
      <About />
      <Clients />
      <Tools />
      <Works />
      <Contact />
    </div>
  );
}
