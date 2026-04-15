import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight, GraduationCap, Briefcase, Globe2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScroll, useTransform } from "framer-motion";
import Header from "@/components/landing/Header";
import DualBrandSection from "@/components/landing/DualBrandSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const floatingCards = [
  { icon: GraduationCap, label: "Certified Courses", x: "8%",  y: "22%", delay: 0 },
  { icon: Briefcase,     label: "Remote Jobs",       x: "74%", y: "14%", delay: 0.2 },
  { icon: Globe2,        label: "30+ Countries",     x: "83%", y: "62%", delay: 0.4 },
  { icon: Award,         label: "Top Rated",         x: "4%",  y: "68%", delay: 0.6 },
];

const stats = [
  { value: "3",   suffix: "",  label: "Premium Tracks" },
  { value: "60",  suffix: "+", label: "Strategic Modules" },
  { value: "30",  suffix: "+", label: "Countries Reached" },
  { value: "5",   suffix: "%", label: "Commission Fee" },
];

const Index = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={ref} className="relative min-h-[100vh] flex items-center pt-24 pb-20 overflow-hidden bg-background">

        {/* Parallax gradient orbs */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[8%] left-[12%] w-[520px] h-[520px] bg-primary/12 rounded-full blur-[110px] animate-pulse" />
          <div className="absolute bottom-[8%] right-[8%] w-[420px] h-[420px] bg-secondary/12 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: "1.2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-primary/4 rounded-full blur-[130px]" />
        </motion.div>

        {/* Dot grid */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Floating badges — desktop only */}
        <div className="hidden lg:block">
          {floatingCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + card.delay, type: "spring", bounce: 0.35 }}
              className="absolute z-20"
              style={{ left: card.x, top: card.y }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
                className="px-4 py-3 rounded-2xl bg-background/50 dark:bg-card/40 backdrop-blur-xl border border-white/15 dark:border-white/8 shadow-xl flex items-center gap-3"
              >
                <div className="bg-primary/10 p-2 rounded-xl text-primary">
                  <card.icon className="size-5" />
                </div>
                <span className="text-sm font-semibold text-foreground whitespace-nowrap">{card.label}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Main hero content */}
        <div className="container relative z-10 max-w-5xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-8">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-secondary/10 border border-secondary/25 text-secondary text-sm font-semibold"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
              </span>
              Now enrolling — 2026 cohort
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.06] tracking-tight text-foreground"
            >
              Your skills deserve a{" "}
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/85 to-secondary">
                  global stage.
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.55, delay: 0.85 }}
                  className="absolute -bottom-1 left-0 right-0 h-2.5 bg-secondary/15 rounded-full origin-left -z-10"
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.32 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            >
              Star9 Academy trains African professionals in AI, freelancing, and education with structured programmes that lead directly to high-paying global placements.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.48 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            >
              <Button size="lg" className="h-13 px-9 font-semibold text-sm group w-full sm:w-auto shadow-lg shadow-primary/20" asChild>
                <Link to="/auth" className="flex items-center gap-2.5">
                  Start Learning Free
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-13 px-9 font-semibold text-sm w-full sm:w-auto" asChild>
                <Link to="/academy">Explore Courses</Link>
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.66 }}
              className="flex items-center justify-center gap-6 pt-4"
            >
              <div className="flex -space-x-2.5">
                {["A", "D", "G", "K", "M"].map((l, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: `hsl(${213 + i * 28}, 60%, ${44 + i * 5}%)` }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-0.5 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="size-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">2,500+ learners across Africa</p>
              </div>
            </motion.div>
          </div>

          {/* Stats strip */}
          <motion.div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.88 }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="text-center p-6 rounded-3xl bg-background/30 dark:bg-card/20 backdrop-blur-lg border border-white/20 dark:border-white/5 shadow-xl hover:bg-background/50 transition-colors"
              >
                <p className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                  {s.value}<span className="text-primary">{s.suffix}</span>
                </p>
                <p className="text-sm font-medium text-muted-foreground mt-2">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTIONS ─────────────────────────────────────────────────────── */}
      <DualBrandSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
