import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight as ArrowRightIcon, 
  BookOpen as BookOpenIcon, 
  Briefcase as BriefcaseIcon, 
  Globe as GlobeIcon, 
  GraduationCap as GraduationCapIcon, 
  Star as StarIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_highres.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center pt-24 pb-16 overflow-hidden bg-background">

      {/* Background glow orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute hidden md:block top-[15%] right-[5%] w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[120px]" />
        <div className="absolute hidden md:block bottom-[0%] left-[0%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── LEFT: Text ──────────────────────────────────────────────── */}
          <div className="space-y-7">

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground"
            >
              Freelancing with
              <br />
              heart and{" "}
              <span className="text-secondary">skill.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              We empower African youth and women with in-demand skills, remote work, study abroad, and work abroad opportunities — equipping you to earn globally and build sustainable careers beyond borders.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button size="lg" className="h-12 px-8 font-semibold text-sm group shadow-lg shadow-primary/20" asChild>
                <Link to="/academy" className="flex items-center gap-2">
                  Academy
                  <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 font-semibold text-sm" asChild>
                <Link to="/global">Global</Link>
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-center gap-4 pt-2"
            >
              <div className="flex -space-x-2.5">
                {["A", "D", "G", "K", "M"].map((l, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: `hsl(${213 + i * 28}, 60%, ${44 + i * 5}%)` }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="size-3 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">2,500+ learners across Africa</p>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Preview card ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, type: "spring", bounce: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <div
                className="rounded-2xl border border-border/60 overflow-hidden shadow-2xl"
                style={{ background: "hsl(var(--card))" }}
              >
                {/* Card header */}
                <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-md bg-primary/15 flex items-center justify-center">
                      <GraduationCapIcon className="size-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">Quick Access</span>
                  </div>
                  <span className="text-xs text-muted-foreground bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-medium">Premium</span>
                </div>

                {/* Track listings */}
                <div className="p-5 space-y-3">
                  {[
                    { icon: StarIcon,     label: "AI for Freelancers",         sub: "8-week programme · $50",    progress: 72, color: "text-primary" },
                    { icon: BriefcaseIcon, label: "Mastering Freelancing",       sub: "12-week · $100 + Global access", progress: 45, color: "text-secondary" },
                  ].map((item, i) => (
                    <Link 
                      key={i} 
                      to="/academy"
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-background/60 border border-border/40 hover:bg-background/90 transition-colors cursor-pointer group block"
                    >
                      <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className={`size-4 ${item.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                        <div className="mt-2 h-1 rounded-full bg-border overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                      <ArrowRightIcon className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>

                {/* Stats row */}
                <div className="px-5 pb-5 grid grid-cols-3 gap-3">
                  {[
                    { value: "3",   label: "Courses" },
                    { value: "5",   label: "Countries" },
                    { value: "5%",  label: "Commission" },
                  ].map((s, i) => (
                    <div key={i} className="text-center p-3 rounded-xl bg-background/40 border border-border/30">
                      <p className="text-lg font-bold text-foreground">{s.value}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-6 px-4 py-2.5 rounded-xl bg-card border border-border shadow-xl flex items-center gap-2.5"
              >
                <div className="size-7 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <BookOpenIcon className="size-3.5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">60+ Modules</p>
                  <p className="text-[11px] text-muted-foreground">Across all tracks</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
