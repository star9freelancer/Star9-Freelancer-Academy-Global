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
    gradient: "from-amber-600/10 via-amber-900/5 to-transparent",
    border: "border-t-amber-500/30 border-x-white/5 border-b-white/5",
    iconColor: "text-amber-400",
  },
  {
    icon: Briefcase,
    title: "Global Marketplace",
    description: "Direct paths to remote jobs & visas.",
    colSpan: "md:col-span-1",
    delay: 0.2,
    gradient: "from-orange-500/10 via-orange-900/5 to-transparent",
    border: "border-t-orange-500/30 border-x-white/5 border-b-white/5",
    iconColor: "text-orange-400",
  },
  {
    icon: ShieldCheck,
    title: "Verified Talent",
    description: "Every graduate receives an audited, verifiable blockchain-ready credential.",
    colSpan: "md:col-span-1",
    delay: 0.3,
    gradient: "from-yellow-500/10 via-yellow-900/5 to-transparent",
    border: "border-t-yellow-500/30 border-x-white/5 border-b-white/5",
    iconColor: "text-yellow-400",
  },
  {
    icon: Globe2,
    title: "Borderless Opportunities",
    description: "Active placements spanning North America, Europe, and Asia for top-tier African professionals.",
    colSpan: "md:col-span-2",
    delay: 0.4,
    gradient: "from-amber-500/10 via-amber-900/5 to-transparent",
    border: "border-t-amber-500/30 border-x-white/5 border-b-white/5",
    iconColor: "text-amber-400",
  },
];

const pricingTiers = [
  {
    name: "AI for Freelancers",
    price: "$100",
    period: "one-time",
    description: "Launch your modern freelancing career. Learn high-income skills powered by AI.",
    features: ["8-week intensive modules", "Access to community groups", "Verified Certificate"],
    highlight: false,
  },
  {
    name: "Mastering Freelancing",
    price: "$250",
    period: "one-time",
    description: "The complete global pipeline. Secures free lifetime access to the Global Job Board.",
    features: ["Everything in AI course", "Global Job Board Unlocked", "Direct Mentorship & Portfolio Review"],
    highlight: true,
  },
  {
    name: "International Teacher Prep",
    price: "$300",
    period: "one-time",
    description: "Comprehensive 3-phase application, vetting, and visa relocation pipeline to the West.",
    features: ["Loom Audition Prep", "Visa Documentation Support", "Priority School Placement in US/EU"],
    highlight: false,
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
    <div ref={containerRef} className="min-h-screen bg-black text-white selection:bg-amber-500/40 overflow-hidden font-sans">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center pt-24 pb-16 px-4 md:px-8">
        {/* Dynamic Candle-Lit Background Glows */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none opacity-80"
          style={{ y: backgroundY }}
        >
           <div 
             className="absolute w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[140px] mix-blend-screen opacity-40 transition-all duration-1000 ease-out"
             style={{ 
               background: "radial-gradient(circle, rgba(245,158,11,0.2) 0%, rgba(217,119,6,0.05) 50%, rgba(0,0,0,0) 80%)",
               left: `${Math.max(5, mousePosition.x - 30)}%`,
               top: `${Math.max(5, mousePosition.y - 30)}%`
             }} 
           />
           <div className="absolute top-[30%] right-[20%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[120px] mix-blend-screen opacity-20"
                style={{ background: "radial-gradient(circle, rgba(234,88,12,0.15) 0%, rgba(0,0,0,0) 70%)" }}
           />
           
           {/* Subtle Noise Texture for atmosphere instead of rigid grid */}
           <div className="absolute inset-0 opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>

        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-amber-500/20 text-xs md:text-sm font-light tracking-widest text-amber-200/80 mb-4 backdrop-blur-xl"
          >
            <Sparkles className="size-4 text-amber-500" /> Now onboarding cohort
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-[6.5rem] font-light tracking-tight leading-[1.05] max-w-5xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2 }}
              className="text-white/90"
            >
              Elevate your craft.{" "}
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5 }}
              className="font-serif italic text-white/70 block mt-2"
            >
              Command the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 font-sans not-italic font-medium">global stage.</span>
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.8 }}
            className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto font-light leading-relaxed tracking-wide"
          >
            Star9 bridges the gap between African excellence and global demand. Master high-income skills, acquire verified credentials, and land remote roles worldwide.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
          >
            <Button size="lg" className="h-14 px-8 rounded-full bg-amber-500/10 text-amber-100 hover:bg-amber-500/20 border border-amber-500/30 transition-all duration-500 shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] group w-full sm:w-auto text-sm tracking-widest uppercase font-semibold backdrop-blur-md" asChild>
              <Link to="/auth">
                Enter the Ecosystem <ArrowRight className="ml-3 size-4 group-hover:translate-x-1 opacity-70 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="h-14 px-8 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all duration-500 w-full sm:w-auto text-sm tracking-widest uppercase font-medium" asChild>
              <Link to="/global">
                Explore Marketplaces
              </Link>
            </Button>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-amber-500/30"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Discover</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-amber-500/20 to-transparent relative overflow-hidden">
            <motion.div 
              animate={{ top: ["-100%", "100%"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-amber-200/50 to-transparent" 
            />
          </div>
        </motion.div>
      </section>

      {/* --- BENTO BOX ECOSYSTEM --- */}
      <section className="py-24 md:py-32 px-4 relative z-10 w-full bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-6">
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-white/90">The <span className="font-serif italic text-amber-200/80">Complete</span> Pipeline.</h2>
             <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto tracking-wide font-light">Everything required to build a borderless career, intimately synthesized into one platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bentoFeatures.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: feat.delay }}
                className={`relative group overflow-hidden rounded-[2rem] border ${feat.border} bg-white/[0.02] backdrop-blur-3xl p-8 hover:bg-white/[0.04] transition-all duration-700 min-h-[280px] flex flex-col justify-end ${feat.colSpan}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-1000 ease-out`} />
                <div className="absolute top-8 right-8 mix-blend-screen">
                  <feat.icon className={`size-10 ${feat.iconColor} opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out`} />
                </div>
                <div className="relative z-10 mt-auto">
                  <h3 className="text-xl font-medium tracking-wide mb-3 text-white/90">{feat.title}</h3>
                  <p className="text-white/40 leading-relaxed text-sm max-w-[90%] font-light">{feat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DYNAMIC PROOF & TESTIMONIALS --- */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div 
             initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
             className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center"
          >
             <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] mb-10 text-white/90">Forged in <br/><span className="font-serif italic text-amber-200/70">Quiet Excellence.</span></h2>
                <div className="space-y-6">
                   {[
                     { stat: "92%", label: "Placement Rate", icon: Zap, color: "text-amber-400" },
                     { stat: "$10k+", label: "Avg. Starting Placed Income", icon: Star, color: "text-amber-200" },
                     { stat: "30+", label: "Hiring Countries", icon: Globe2, color: "text-orange-300" }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-6 p-6 rounded-2xl border-t border-t-white/10 border-x border-x-white/5 border-b border-b-transparent bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] transition-colors duration-500">
                        <div className="size-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                           <item.icon className={`size-5 ${item.color} opacity-80`} />
                        </div>
                        <div>
                           <p className="text-2xl font-light tracking-wider text-white/90">{item.stat}</p>
                           <p className="text-white/40 text-xs tracking-widest uppercase mt-1">{item.label}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="relative h-[600px] flex items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/5 bg-black/50 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 pointer-events-none" />
                <div className="flex flex-col gap-6 animate-marquee py-8 absolute top-0 w-full px-6 md:px-8">
                   {[...testimonials, ...testimonials].map((t, i) => (
                     <div key={i} className="card-glass p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
                        <p className="text-white/70 leading-relaxed font-serif italic mb-6 text-lg">"{t.text}"</p>
                        <div className="flex justify-between items-end">
                           <div>
                              <p className="font-medium tracking-wide text-white/90 text-sm">{t.author}</p>
                              <p className="text-xs text-amber-500/70 uppercase tracking-widest mt-1">{t.role}</p>
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
      <section className="py-24 md:py-32 px-4 relative bg-black">
         <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
         
         <div className="max-w-6xl mx-auto mt-10">
            <div className="text-center mb-20">
               <p className="text-xs uppercase tracking-[0.3em] text-amber-500/80 font-semibold mb-6">Invest In Mastery</p>
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-6 text-white/90">Global Standard <span className="font-serif italic text-amber-100/60">Access.</span></h2>
               <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">Priced to unlock the African continent. Scaled to equip you for remote capabilities worldwide.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
               {pricingTiers.map((tier, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1, delay: i * 0.2 }}
                     className={`relative p-10 rounded-[2.5rem] flex flex-col bg-white/[0.02] backdrop-blur-2xl transition-all duration-700 ${
                        tier.highlight 
                        ? "border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.1)] scale-100 md:scale-105 z-10"
                        : "border border-white/5 hover:border-white/10"
                     }`}
                  >
                     {tier.highlight && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_20px_rgba(245,158,11,0.8)]" />
                     )}
                     
                     <div className="mb-10">
                        <p className="text-amber-200/50 text-xs uppercase tracking-widest font-semibold mb-4">{tier.name}</p>
                        <div className="flex items-baseline gap-2">
                           <span className="text-5xl font-light tracking-tight text-white/90">{tier.price}</span>
                           <span className="text-white/30 text-sm font-medium tracking-wide">{tier.period}</span>
                        </div>
                        <p className="text-sm text-white/50 mt-6 leading-relaxed font-light min-h-[60px]">{tier.description}</p>
                     </div>

                     <ul className="space-y-5 mb-12 flex-1">
                        {tier.features.map((f, idx) => (
                           <li key={idx} className="flex items-start gap-4">
                              <CheckCircle2 className={`size-4 shrink-0 mt-0.5 ${tier.highlight ? "text-amber-500/80" : "text-white/30"}`} />
                              <span className="text-white/70 text-sm font-light leading-snug">{f}</span>
                           </li>
                        ))}
                     </ul>

                     <Button className={`w-full h-14 rounded-2xl text-xs uppercase tracking-widest font-semibold transition-all duration-500 ${tier.highlight ? "bg-amber-500/10 text-amber-100 hover:bg-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] border border-amber-500/30" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/90 border border-white/10"}`} asChild>
                        <Link to="/auth">{tier.highlight ? "Accelerate Your Career" : "Enroll Now"}</Link>
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
