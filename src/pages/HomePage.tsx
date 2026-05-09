import { HomeHero }        from "@/components/home/HomeHero";
import { ServicesGrid }    from "@/components/home/ServicesGrid";
import { Testimonials }    from "@/components/home/Testimonials";
import { TrustBar }        from "@/components/home/TrustBar";
import { StatsBand }       from "@/components/home/StatsBand";
import { WhyChoose }       from "@/components/home/WhyChoose";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { FounderSection }  from "@/components/home/FounderSection";
import { FaqSection }      from "@/components/home/FaqSection";
import { HomeContact }     from "@/components/home/HomeContact";

export default function HomePage() {
  return (
    <main>
      <HomeHero />

      {/* Section 1 — Services & overall offerings (per client brief) */}
      <ServicesGrid />

      {/* Section 2 — Testimonials & credibility (per client brief) */}
      <Testimonials />

      {/* Remaining sections — open for collaborative refinement */}
      <TrustBar />
      <StatsBand />
      <WhyChoose />
      <ProcessTimeline />
      <FounderSection />
      <FaqSection />
      <HomeContact />
    </main>
  );
}
