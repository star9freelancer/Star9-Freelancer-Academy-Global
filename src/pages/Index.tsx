import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Star, Play, MapPin, TrendingUp, Shield, Globe2, BookOpen, Users } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

// ─── FLAME CANVAS BACKGROUND ────────────────────────────────────────────────
const CandleBackground = () => {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#080604] overflow-hidden">
      {/* Primary warm glow — follows cursor */}
      <div
        className="absolute rounded-full blur-[180px] opacity-30 transition-all duration-[2000ms] ease-out"
        style={{
          width: "60vmax",
          height: "60vmax",
          left: `${mouse.x - 30}%`,
          top: `${mouse.y - 30}%`,
          background: "radial-gradient(circle, #D97706 0%, #92400e 40%, transparent 75%)",
        }}
      />
      {/* Static deep amber pool — bottom left */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.28, 0.18] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-1/4 -left-1/4 w-[80vmin] h-[80vmin] rounded-full blur-[160px]"
        style={{ background: "radial-gradient(circle, #b45309 0%, transparent 70%)" }}
      />
      {/* Ember flicker — top right */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -top-1/4 right-0 w-[50vmin] h-[50vmin] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}
      />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial-at-center" style={{
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, #080604 100%)"
      }} />
    </div>
  );
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const tracks = [
  {
    number: "01",
    title: "AI for Freelancers",
    price: "$100",
    tagline: "Automation as your competitive edge.",
    duration: "8 weeks",
    unlocks: ["High-income AI workflows", "Prompt engineering mastery", "Verified certificate"],
  },
  {
    number: "02",
    title: "Mastering Freelancing",
    price: "$250",
    tagline: "From local hustle to global pipeline.",
    duration: "12 weeks",
    unlocks: ["Full AI course included", "Global Job Board lifetime access", "Direct mentorship"],
    featured: true,
  },
  {
    number: "03",
    title: "International Teacher Prep",
    price: "$300",
    tagline: "Certified. Placed. Relocated.",
    duration: "Full Pipeline",
    unlocks: ["Loom audition coaching", "Visa documentation", "US/EU school placement"],
  },
];

const testimonials = [
  {
    quote: "Went from $400/mo locally to $3,500/mo working remotely as a data analyst. Star9's pacing is unmatched.",
    author: "David M.",
    location: "Lagos, Nigeria → Houston, TX",
    avatar: "D",
  },
  {
    quote: "The Teacher Prep pipeline secured my J1 Visa. I am currently teaching in Texas thanks to this ecosystem.",
    author: "Grace O.",
    location: "Accra, Ghana → Dallas, TX",
    avatar: "G",
  },
  {
    quote: "Learning to leverage AI tools completely shielded my freelance career from obsolescence.",
    author: "Samuel K.",
    location: "Nairobi, Kenya → Remote",
    avatar: "S",
  },
];

const stats = [
  { value: "2,500+", label: "Graduates placed" },
  { value: "30+", label: "Countries reached" },
  { value: "$10k+", label: "Avg. remote income" },
  { value: "92%", label: "Satisfaction rate" },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────
const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen text-white font-sans antialiased">
      <CandleBackground />
      <Header />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-24 overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="flex flex-col items-center gap-8 max-w-4xl mx-auto">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-400/20 bg-amber-400/5 text-amber-300/70 text-xs tracking-[0.2em] uppercase"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
            </span>
            Now enrolling — 2026 cohort
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight font-light"
          >
            <span className="block text-white/90">Your craft.</span>
            <span className="block mt-2 font-serif italic"
              style={{ backgroundImage: "linear-gradient(135deg, #fde68a 0%, #f59e0b 40%, #d97706 70%, #a16207 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              The world's stage.
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-white/40 font-light max-w-2xl leading-relaxed"
          >
            Star9 equips African professionals with the skills, credentials, and global connections to command premium remote income worldwide.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              to="/auth"
              className="group inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full text-sm tracking-widest uppercase font-medium transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, rgba(217,119,6,0.25) 0%, rgba(180,83,9,0.15) 100%)",
                border: "1px solid rgba(217,119,6,0.35)",
                boxShadow: "0 0 30px rgba(217,119,6,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(217,119,6,0.35), inset 0 1px 0 rgba(255,255,255,0.08)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(217,119,6,0.15), inset 0 1px 0 rgba(255,255,255,0.05)";
              }}
            >
              <span className="text-amber-100">Begin your journey</span>
              <ArrowRight className="size-4 text-amber-400 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/global"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full text-sm tracking-widest uppercase font-medium text-white/40 hover:text-white/70 border border-white/8 hover:border-white/15 transition-all duration-500 hover:bg-white/5"
            >
              <Play className="size-3.5 fill-current" />
              Watch our story
            </Link>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.9 }}
            className="flex items-center gap-6 pt-4 border-t border-white/8 w-full max-w-md mx-auto justify-center"
          >
            <div className="flex -space-x-2.5">
              {["#c2410c", "#b45309", "#92400e", "#78350f"].map((color, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#080604] flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: color }}>
                  {["D", "G", "S", "K"][i]}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="size-3 fill-amber-400 text-amber-400" />)}</div>
              <p className="text-xs text-white/35 mt-0.5">2,500+ graduates across Africa</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-400/0 via-amber-400/40 to-transparent" />
            <motion.div
              animate={{ top: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-8 bg-gradient-to-b from-transparent via-amber-300/60 to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* ── STATS BAND ────────────────────────────────────────────────────── */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 border-y border-white/5" />
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-light tracking-tight"
                  style={{ backgroundImage: "linear-gradient(135deg, #fde68a, #d97706)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  {s.value}
                </p>
                <p className="text-xs text-white/30 tracking-widest uppercase mt-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ───────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs tracking-[0.25em] text-amber-400/60 uppercase mb-6">The ecosystem</p>
              <h2 className="text-4xl md:text-5xl font-light leading-[1.1] text-white/90 mb-8">
                Built for the professional who refuses to be <span className="font-serif italic text-amber-300/70">contained.</span>
              </h2>
              <p className="text-white/40 font-light leading-relaxed text-lg">
                The global economy is accessible. But only if you know how to navigate it. Star9 is the bridge — from where you are to where your talent deserves to be paid.
              </p>
              <div className="mt-12 space-y-5">
                {[
                  { icon: BookOpen, text: "Structured, mentor-led learning tracks" },
                  { icon: Shield, text: "Blockchain-verified credentials employers trust" },
                  { icon: Globe2, text: "Direct access to a global hiring network" },
                  { icon: Users, text: "A community of ambitious African professionals" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-5"
                  >
                    <div className="size-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(217,119,6,0.1)", border: "1px solid rgba(217,119,6,0.2)" }}>
                      <item.icon className="size-4 text-amber-400/70" />
                    </div>
                    <span className="text-white/60 font-light">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Visual panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden p-8"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 0 60px rgba(180,83,9,0.08)",
                }}>
                {/* Amber top-glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent)" }} />
                
                <div className="space-y-4">
                  <p className="text-xs tracking-[0.2em] text-amber-400/40 uppercase">Live placements</p>
                  {[
                    { name: "Amara T.", role: "Data Analyst", location: "Toronto, CA", salary: "$4,200/mo" },
                    { name: "James O.", role: "UX Writer", location: "London, UK", salary: "$3,800/mo" },
                    { name: "Faith N.", role: "ESL Teacher", location: "Houston, TX", salary: "$3,100/mo" },
                    { name: "Kofi A.", role: "AI Consultant", location: "Berlin, DE", salary: "$5,500/mo" },
                  ].map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0"
                    >
                      <div className="size-9 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0"
                        style={{ background: `hsl(${30 + i * 12}, 60%, ${30 + i * 5}%)` }}>
                        {p.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white/80">{p.name}</p>
                        <p className="text-xs text-white/35 flex items-center gap-1 mt-0.5">
                          <MapPin className="size-3" />{p.location} · {p.role}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-medium text-amber-400/80">{p.salary}</p>
                        <p className="text-[10px] text-white/25 mt-0.5">remote</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 px-5 py-3 rounded-2xl text-sm"
                style={{
                  background: "linear-gradient(135deg, rgba(180,83,9,0.4), rgba(120,53,15,0.4))",
                  border: "1px solid rgba(245,158,11,0.25)",
                  backdropFilter: "blur(12px)",
                }}>
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="size-4 text-amber-400" />
                  <span className="text-white/70 font-light text-sm">8× avg salary increase</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRACKS / PRICING ──────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.25em] text-amber-400/60 uppercase mb-5">Choose your path</p>
            <h2 className="text-4xl md:text-5xl font-light text-white/90 leading-tight">
              Three tracks. One <span className="font-serif italic text-amber-300/70">destination.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {tracks.map((track, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col rounded-[2rem] p-8 group cursor-pointer transition-all duration-700"
                style={{
                  background: track.featured
                    ? "linear-gradient(145deg, rgba(180,83,9,0.15) 0%, rgba(120,53,15,0.08) 100%)"
                    : "linear-gradient(145deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)",
                  border: track.featured
                    ? "1px solid rgba(245,158,11,0.25)"
                    : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: track.featured ? "0 0 50px rgba(180,83,9,0.12)" : "none",
                }}
              >
                {/* Top rim light */}
                <div className="absolute top-0 left-8 right-8 h-px"
                  style={{
                    background: track.featured
                      ? "linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)"
                      : "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)"
                  }} />

                {track.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-amber-100 font-medium"
                    style={{ background: "rgba(180,83,9,0.6)", border: "1px solid rgba(245,158,11,0.3)" }}>
                    Most popular
                  </div>
                )}

                <div className="flex-1">
                  <span className="text-5xl font-light text-white/10 tracking-tighter">{track.number}</span>
                  <h3 className="text-xl font-medium text-white/90 mt-3 mb-2">{track.title}</h3>
                  <p className="text-sm text-white/35 font-light italic mb-8">{track.tagline}</p>

                  <div className="space-y-3 mb-10">
                    {track.unlocks.map((u, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <CheckCircle2 className={`size-4 shrink-0 mt-0.5 ${track.featured ? "text-amber-400/70" : "text-white/20"}`} />
                        <span className="text-sm text-white/50 font-light">{u}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-end justify-between mt-auto pt-6 border-t border-white/8">
                  <div>
                    <p className="text-3xl font-light text-white/90">{track.price}</p>
                    <p className="text-xs text-white/25 tracking-wide mt-1">{track.duration} · one-time</p>
                  </div>
                  <Link
                    to="/auth"
                    className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full transition-all duration-500 group-hover:gap-3"
                    style={{
                      background: track.featured ? "rgba(217,119,6,0.2)" : "rgba(255,255,255,0.05)",
                      border: track.featured ? "1px solid rgba(217,119,6,0.3)" : "1px solid rgba(255,255,255,0.1)",
                      color: track.featured ? "#fde68a" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    Enroll <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 px-6 relative">
        <div className="absolute inset-0 border-y border-white/5" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.25em] text-amber-400/60 uppercase mb-5">Their words</p>
            <h2 className="text-4xl md:text-5xl font-light text-white/90">
              Lives already <span className="font-serif italic text-amber-300/70">changed.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-8 rounded-[2rem]"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Top rim */}
                <div className="absolute top-0 left-8 right-8 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)" }} />

                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="size-3 fill-amber-500/60 text-amber-500/60" />)}
                </div>
                <p className="text-white/60 font-serif italic leading-relaxed text-base mb-8">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-white/8">
                  <div className="size-9 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0"
                    style={{ background: `hsl(${28 + i * 8}, 55%, ${28 + i * 4}%)` }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">{t.author}</p>
                    <p className="text-xs text-white/30 flex items-center gap-1">
                      <MapPin className="size-3" />{t.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmax] h-[60vmax] rounded-full blur-[200px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(180,83,9,0.15) 0%, transparent 65%)" }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-3xl mx-auto"
        >
          <p className="text-xs tracking-[0.25em] text-amber-400/60 uppercase mb-8">Your next chapter</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95] text-white/90 mb-6">
            The world is
            <span className="block font-serif italic mt-2"
              style={{ backgroundImage: "linear-gradient(135deg, #fde68a 0%, #d97706 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              hiring.
            </span>
          </h2>
          <p className="text-lg text-white/35 font-light max-w-xl mx-auto mb-12 leading-relaxed">
            Don't let geography limit your ambition. Join Star9 and step into the global economy — with the skills, credentials, and community to back you.
          </p>
          <Link
            to="/auth"
            className="group inline-flex items-center gap-4 h-16 px-10 rounded-full text-sm tracking-widest uppercase font-medium transition-all duration-700"
            style={{
              background: "linear-gradient(135deg, rgba(217,119,6,0.3) 0%, rgba(180,83,9,0.2) 100%)",
              border: "1px solid rgba(217,119,6,0.4)",
              boxShadow: "0 0 40px rgba(217,119,6,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
              color: "#fde68a",
            }}
          >
            Start for free
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </section>

      <Footer />

      <style>{`
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        .animate-ping { animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>
    </div>
  );
};

export default Index;
