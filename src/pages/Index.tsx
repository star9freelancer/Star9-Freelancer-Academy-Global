import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, GraduationCap, Briefcase, Globe2, Sparkles, ChevronRight, CheckCircle2, Star, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

// --- Data Models ---
const bentoFeatures = [
  {
    icon: GraduationCap,
    title: "Star9 Academy",
    description: "Intensive 8-week tracks in AI, Freelancing, and Global Teacher verification.",
    colSpan: "md:col-span-2",
    delay: 0.1,
    gradient: "from-blue-500/20 via-primary/5 to-transparent",
    border: "border-blue-500/20",
    iconColor: "text-blue-500",
  },
  {
    icon: Briefcase,
    title: "Global Marketplace",
    description: "Direct paths to remote jobs & visas.",
    colSpan: "md:col-span-1",
    delay: 0.2,
    gradient: "from-amber-500/20 via-secondary/5 to-transparent",
    border: "border-amber-500/20",
    iconColor: "text-amber-500",
  },
  {
    icon: ShieldCheck,
    title: "Verified Talent",
    description: "Every graduate receives an audited, verifiable blockchain-ready credential.",
    colSpan: "md:col-span-1",
    delay: 0.3,
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-500",
  },
  {
    icon: Globe2,
    title: "Borderless Opportunities",
    description: "Active placements spanning North America, Europe, and Asia for top-tier African professionals.",
    colSpan: "md:col-span-2",
    delay: 0.4,
    gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    border: "border-purple-500/20",
    iconColor: "text-purple-500",
  },
];

const pricingTiers = [
  {
    name: "Starter Learner",
    price: "$5",
    period: "/mo",
    description: "Base access to our asynchronous learning environments and entry-level groups.",
    features: ["All Free Modules", "Community Discord", "Basic Career Advice"],
    highlight: false,
  },
  {
    name: "Global Professional",
    price: "$15",
    period: "/mo",
    description: "The complete pipeline. Direct mentorship, fast-track applications, and visa support.",
    features: ["1-on-1 Mentorship", "Priority Job Apply", "Unlimited Course Access", "Resume Rewrites"],
    highlight: true,
  }
];

const testimonials = [
  { text: "Went from $400/mo locally to $3,500/mo working remotely as a data analyst. Star9's pacing is unmatched.", author: "David M.", role: "Data Analyst" },
  { text: "The Teacher Prep pipeline secured my J1 Visa. I am currently teaching in Texas thanks to this ecosystem.", author: "Grace O.", role: "Educator" },
  { text: "Learning to leverage AI tools completely shielded my freelance career from obsolescence.", author: "Samuel K.", role: "Copywriter" },
];

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-primary/40 overflow-hidden font-sans">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center pt-20 px-4">
        {/* Dynamic Background Glows */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none opacity-60"
          style={{ y: backgroundY }}
        >
           <div 
             className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] mix-blend-screen opacity-50 transition-all duration-1000 ease-out"
             style={{ 
               background: "radial-gradient(circle, rgba(27,93,171,0.4) 0%, rgba(247,148,29,0.1) 100%)",
               left: `${Math.max(10, mousePosition.x - 20)}%`,
               top: `${Math.max(10, mousePosition.y - 20)}%`
             }} 
           />
           <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-secondary/20 rounded-full blur-[100px] mix-blend-screen animate-pulse-glow" />
           
           {/* Grid Pattern */}
           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
        </motion.div>

        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light border border-white/10 text-xs md:text-sm font-medium tracking-wide mb-4"
          >
            <Sparkles className="size-4 text-secondary" /> Now onboarding cohort 2026
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter leading-[1.05]">
            <motion.span 
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="block"
            >
              Elevate your craft.
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40"
            >
              Command the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">global stage.</span>
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Star9 bridges the gap between African excellence and global demand. Master high-income skills, acquire verified credentials, and land remote roles worldwide.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Button size="lg" className="h-14 px-8 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.2)] group w-full sm:w-auto text-base" asChild>
              <Link to="/auth">
                Enter the Ecosystem <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-white/20 hover:bg-white/5 bg-transparent w-full sm:w-auto text-base backdrop-blur-md" asChild>
              <Link to="/global">
                Explore Marketplaces
              </Link>
            </Button>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
        >
          <span className="text-xs uppercase tracking-widest font-semibold">Discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent relative overflow-hidden">
            <motion.div 
              animate={{ top: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-1/2 bg-white" 
            />
          </div>
        </motion.div>
      </section>

      {/* --- BENTO BOX ECOSYSTEM --- */}
      <section className="py-32 px-4 relative z-10 w-full bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
             <h2 className="text-4xl md:text-6xl font-bold tracking-tight">The <span className="italic font-light text-zinc-400">Complete</span> Pipeline.</h2>
             <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">Everything required to build a borderless career, synthesized into one platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bentoFeatures.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: feat.delay }}
                className={`relative group overflow-hidden rounded-[2rem] border ${feat.border} bg-zinc-950/50 backdrop-blur-xl p-8 hover:bg-zinc-900/80 transition-all duration-500 min-h-[300px] flex flex-col justify-end ${feat.colSpan}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="absolute top-8 right-8">
                  <feat.icon className={`size-12 ${feat.iconColor} opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500`} />
                </div>
                <div className="relative z-10 mt-auto">
                  <h3 className="text-2xl font-bold mb-3">{feat.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm md:text-base max-w-[80%]">{feat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DYNAMIC PROOF & TESTIMONIALS --- */}
      <section className="py-32 relative bg-zinc-950/30 overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
             initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
             className="grid lg:grid-cols-2 gap-16 items-center"
          >
             <div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">Built for <br/><span className="text-zinc-500">Excellence.</span></h2>
                <div className="space-y-6">
                   {[
                     { stat: "92%", label: "Completion Rate", icon: Zap },
                     { stat: "$10k+", label: "Avg. Placed Income", icon: Star },
                     { stat: "30+", label: "Hiring Countries", icon: Globe2 }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-6 p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md">
                        <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                           <item.icon className="size-6 text-primary" />
                        </div>
                        <div>
                           <p className="text-3xl font-black text-white">{item.stat}</p>
                           <p className="text-zinc-400 text-sm">{item.label}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="relative h-[600px] flex items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] z-10" />
                <div className="flex flex-col gap-4 animate-marquee py-4 absolute top-0 w-full px-4">
                   {[...testimonials, ...testimonials].map((t, i) => (
                     <div key={i} className="card-glass p-6 rounded-2xl border border-white/10 bg-zinc-950/80">
                        <p className="text-zinc-300 italic mb-4">"{t.text}"</p>
                        <div className="flex justify-between items-end">
                           <div>
                              <p className="font-bold text-white">{t.author}</p>
                              <p className="text-xs text-secondary">{t.role}</p>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section className="py-32 px-4 relative">
         <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Simple, transparent pricing.</h2>
               <p className="text-zinc-400 text-lg">No hidden fees. Full access to world-class pipelines.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
               {pricingTiers.map((tier, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.6, delay: i * 0.2 }}
                     className={`relative p-8 rounded-[2rem] border bg-zinc-950/80 backdrop-blur-xl flex flex-col ${
                        tier.highlight 
                        ? "border-primary/50 shadow-[0_0_50px_rgba(27,93,171,0.15)] scale-105 z-10"
                        : "border-white/10 hover:border-white/30"
                     }`}
                  >
                     {tier.highlight && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-3/4 bg-gradient-to-r from-transparent via-primary to-transparent rounded-b-full shadow-[0_0_20px_rgba(27,93,171,0.8)]" />
                     )}
                     
                     <div className="mb-8">
                        <p className="text-zinc-400 font-medium mb-4">{tier.name}</p>
                        <div className="flex items-baseline gap-1">
                           <span className="text-5xl font-black">{tier.price}</span>
                           <span className="text-zinc-500">{tier.period}</span>
                        </div>
                        <p className="text-sm text-zinc-400 mt-4 leading-relaxed">{tier.description}</p>
                     </div>

                     <ul className="space-y-4 mb-10 flex-1">
                        {tier.features.map((f, idx) => (
                           <li key={idx} className="flex items-center gap-3">
                              <CheckCircle2 className={`size-5 ${tier.highlight ? "text-primary" : "text-zinc-600"}`} />
                              <span className="text-zinc-200 font-medium">{f}</span>
                           </li>
                        ))}
                     </ul>

                     <Button className={`w-full py-6 rounded-xl ${tier.highlight ? "bg-white text-black hover:bg-zinc-200" : "bg-zinc-800 text-white hover:bg-zinc-700"} transition-all`} asChild>
                        <Link to="/auth">{tier.highlight ? "Accelerate Your Career" : "Start For Free"}</Link>
                     </Button>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer />

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .card-glass {
          background: rgba(20, 20, 20, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
      `}</style>
    </div>
  );
};

export default Index;
