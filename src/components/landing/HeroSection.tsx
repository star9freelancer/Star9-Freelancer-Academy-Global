import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Briefcase, Globe2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const floatingCards = [
  { icon: GraduationCap, label: "Certified Courses", x: "10%", y: "20%", delay: 0 },
  { icon: Briefcase, label: "Remote Jobs", x: "75%", y: "15%", delay: 0.2 },
  { icon: Globe2, label: "30+ Countries", x: "85%", y: "65%", delay: 0.4 },
  { icon: Award, label: "Top Rated", x: "5%", y: "70%", delay: 0.6 },
];

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center pt-24 pb-20 overflow-hidden bg-background">
      {/* Animated gradient orbs */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </motion.div>

      {/* Dot pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      {/* Floating cards - hidden on mobile */}
      <div className="hidden lg:block">
        {floatingCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + card.delay, type: "spring", bounce: 0.4 }}
            className="absolute z-20"
            style={{ left: card.x, top: card.y }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              className="px-4 py-3 rounded-2xl bg-background/40 dark:bg-card/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] flex items-center gap-3"
            >
              <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-xl text-primary">
                <card.icon className="size-5" />
              </div>
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">{card.label}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="container relative z-10 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
            </span>
            Now enrolling for 2026 cohort
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground"
          >
            Your skills deserve a{" "}
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary">
                global stage.
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute -bottom-1 left-0 right-0 h-3 bg-secondary/15 rounded-full origin-left -z-10"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Star9 Academy trains professionals in AI, freelancing, and education
            with structured workflows leading directly to high-paying global placements.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Button size="lg" className="h-14 px-10 font-semibold text-sm group w-full sm:w-auto shadow-lg shadow-primary/20" asChild>
              <Link to="/auth" className="gap-3 flex items-center justify-center">
                Start Learning Free
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-10 font-semibold text-sm w-full sm:w-auto" asChild>
              <Link to="/academy" className="gap-3 flex items-center justify-center">
                Explore Courses
              </Link>
            </Button>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-center gap-6 pt-6"
          >
            <div className="flex -space-x-2">
              {["A", "D", "G", "K", "M"].map((letter, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: `hsl(${213 + i * 30}, 60%, ${45 + i * 5}%)`, color: "white" }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-secondary">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="size-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">2,500+ learners across Africa</p>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { value: "3", label: "Premium Tracks", suffix: "" },
            { value: "60", label: "Strategic Modules", suffix: "+" },
            { value: "30", label: "Countries Reached", suffix: "+" },
            { value: "5", label: "Commission Fee", suffix: "%" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="text-center p-6 rounded-3xl bg-background/30 dark:bg-card/20 backdrop-blur-lg border border-white/20 dark:border-white/5 shadow-xl hover:bg-background/50 transition-colors"
            >
              <p className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                {stat.value}<span className="text-primary">{stat.suffix}</span>
              </p>
              <p className="text-sm font-medium text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
