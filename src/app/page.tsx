import { client } from "@/sanity/lib/client";
import { PROFILE_QUERY, TOOLS_QUERY, CLIENTS_QUERY, WORKS_QUERY } from "@/sanity/lib/queries";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Clients from "@/components/sections/Clients";
import Tools from "@/components/sections/Tools";
import Works from "@/components/sections/Works";
import Contact from "@/components/sections/Contact";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const profile = await client.fetch(PROFILE_QUERY);
  const tools = await client.fetch(TOOLS_QUERY);
  const clients = await client.fetch(CLIENTS_QUERY);
  const works = await client.fetch(WORKS_QUERY);

  return (
    <div className="flex flex-col gap-0 w-full">
      <Hero profile={profile} />
      <About profile={profile} />
      <Clients clients={clients} />
      <Tools tools={tools} />
      <Works works={works} />
      <Contact profile={profile} />
    </div>
  );
}
