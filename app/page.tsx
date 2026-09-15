import AmbientBackground from "@/components/AmbientBackground";
import SparshaNavbar from "@/components/SparshaNavbar";
import SparshaUnifiedHero from "@/components/SparshaUnifiedHero";
import Section1EveryWoman from "@/components/sections/Section1EveryWoman";
import Section2PeriodAwareness from "@/components/sections/Section2PeriodAwareness";
import Section3MeetSparsha from "@/components/sections/Section3MeetSparsha";
import Section4InsideProtection from "@/components/sections/Section4InsideProtection";
import Section5WhyChoose from "@/components/sections/Section5WhyChoose";
import Section7EverydayLife from "@/components/sections/Section7EverydayLife";
import Section8Her28Days from "@/components/sections/Section8Her28Days";
import Section9ProductCollection from "@/components/sections/Section9ProductCollection";
import Section11OurPromise from "@/components/sections/Section11OurPromise";
import Section12MissionVision from "@/components/sections/Section12MissionVision";
import Section13FinalCta from "@/components/sections/Section13FinalCta";
import SparshaFooter from "@/components/sections/SparshaFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#fdf8f9] text-[#281920] antialiased">
      <AmbientBackground />
      <SparshaNavbar />
      <SparshaUnifiedHero />
      <Section1EveryWoman />
      <Section2PeriodAwareness />
      <Section3MeetSparsha />
      <Section4InsideProtection />
      <Section5WhyChoose />
      <Section7EverydayLife />
      <Section8Her28Days />
      <Section9ProductCollection />
      <Section11OurPromise />
      <Section12MissionVision />
      <Section13FinalCta />
      <SparshaFooter />
    </main>
  );
}


