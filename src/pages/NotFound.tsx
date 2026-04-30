import { Link } from "react-router-dom";
import { OButton } from "@/components/ui/OButton";
import { GridTexture } from "@/components/ui/GridTexture";
import { OrbBackground } from "@/components/ui/OrbBackground";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy text-white">
      <GridTexture />
      <OrbBackground />
      <div className="relative text-center px-6">
        <p className="font-display italic text-sky-light text-[180px] leading-none">404</p>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">Page not found.</h1>
        <p className="mt-5 font-body text-sm text-sky-pale/60 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-8 flex justify-center">
          <Link to="/"><OButton variant="sky">Back to Home →</OButton></Link>
        </div>
      </div>
    </main>
  );
}
