import { HomeHero }        from "@/components/home/HomeHero";
import { TrustBar }        from "@/components/home/TrustBar";
import { ServicesGrid }    from "@/components/home/ServicesGrid";
import { StatsBand }       from "@/components/home/StatsBand";
import { WhyChoose }       from "@/components/home/WhyChoose";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { Testimonials }    from "@/components/home/Testimonials";
import { FounderSection }  from "@/components/home/FounderSection";
import { FaqSection }      from "@/components/home/FaqSection";
import { HomeContact }     from "@/components/home/HomeContact";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <TrustBar />
      <ServicesGrid />
      <StatsBand />
      <WhyChoose />
      <ProcessTimeline />
      <Testimonials />
      <FounderSection />
      <FaqSection />
      <HomeContact />
    </main>
  );
}
