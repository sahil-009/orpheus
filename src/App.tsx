import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScrollProvider, useLenis } from "./lib/lenisContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { PageTransition } from "./components/layout/PageTransition";
import { setupGsap } from "./lib/gsapSetup";
import { WhatsAppChat } from "./components/interactive/WhatsAppChat";
import { DesignInspector } from "./components/interactive/DesignInspector";

// Lazy-loaded pages for better bundle sizes and page speeds
const HomePage = React.lazy(() => import("./pages/HomePage"));
const ServicesPage = React.lazy(() => import("./pages/ServicesPage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const BlogPage = React.lazy(() => import("./pages/BlogPage"));
const BlogPostPage = React.lazy(() => import("./pages/BlogPostPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

setupGsap();
const queryClient = new QueryClient();

// Smooth scroll to element hashes (anchor links) using Lenis if active
function ScrollToHash() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Wait briefly for route transition and Lenis layout recalculation
        const timer = setTimeout(() => {
          if (lenis) {
            lenis.scrollTo(element, { offset: -100, immediate: true });
          } else {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 350); // Matches transition timelines
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, hash, lenis]);

  return null;
}

// Fallback loader while dynamic pages are fetching
const LoadingFallback = () => (
  <div className="min-h-[50vh] w-full flex items-center justify-center bg-transparent">
    <div className="flex flex-col items-center gap-4">
      <div 
        className="h-10 w-10 rounded-full border-t-2 border-l-2 animate-spin" 
        style={{ borderColor: "#D4AF37" }}
      />
      <span className="font-display text-[9px] uppercase tracking-[3px]" style={{ color: "rgba(255,255,255,0.4)" }}>
        Loading advisory desk...
      </span>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SmoothScrollProvider>
          <ScrollToHash />
          <Navbar />
          <PageTransition>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageTransition>
          <Footer />
          <WhatsAppChat />
          <DesignInspector />
        </SmoothScrollProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
