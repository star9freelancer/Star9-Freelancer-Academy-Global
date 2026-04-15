import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Star, MapPin, TrendingUp, Shield, Globe2, BookOpen, Users, Zap } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

// Fade-in utility
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const heroFade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

// ── DATA ──────────────────────────────────────────────────────────────────────

const tracks = [
  {
    id: "01",
    name: "AI for Freelancers",
    price: "$100",
    summary: "Master high-income AI workflows and land your first international client.",
    duration: "8 weeks",
    features: ["AI productivity tools", "Prompt engineering", "Verified certificate"],
    highlight: false,
  },
  {
    id: "02",
    name: "Mastering Freelancing",
    price: "$250",
    summary: "The complete pipeline from zero to a thriving global freelance business.",
    duration: "12 weeks",
    features: ["AI course included", "Global Job Board access", "1-on-1 mentorship"],
    highlight: true,
  },
  {
    id: "03",
    name: "International Teacher Prep",
    price: "$300",
    summary: "Structured 3-phase programme to place you in a US or EU school.",
    duration: "Full Programme",
    features: ["Loom audition coaching", "Visa documentation support", "Priority school placement"],
    highlight: false,
  },
];

const placements = [
  { name: "Amara T.", role: "Data Analyst", location: "Toronto, CA", salary: "$4,200/mo" },
  { name: "James O.", role: "UX Writer", location: "London, UK", salary: "$3,800/mo" },
  { name: "Faith N.", role: "ESL Teacher", location: "Houston, TX", salary: "$3,100/mo" },
  { name: "Kofi A.", role: "AI Consultant", location: "Berlin, DE", salary: "$5,500/mo" },
];

const testimonials = [
  {
    quote: "Went from $400/mo locally to $3,500/mo working remotely as a data analyst. Star9's structure is unmatched.",
    name: "David M.",
    location: "Lagos to Houston, TX",
    role: "Data Analyst",
    avatar: "D",
  },
  {
    quote: "The Teacher Prep programme secured my J1 Visa. I am currently teaching in Texas thanks to this platform.",
    name: "Grace O.",
    location: "Accra to Dallas, TX",
    role: "Educator",
    avatar: "G",
  },
  {
    quote: "Learning to leverage AI tools completely future-proofed my freelance career.",
    name: "Samuel K.",
    location: "Nairobi, remote",
    role: "Copywriter",
    avatar: "S",
  },
];

const pillars = [
  { icon: BookOpen, title: "Structured Learning", desc: "Mentor-led tracks built around real outcomes, not theory." },
  { icon: Shield, title: "Verified Credentials", desc: "Blockchain-backed certificates employers trust worldwide." },
  { icon: Globe2, title: "Global Job Board", desc: "Curated remote roles across North America, Europe and Asia." },
  { icon: Users, title: "Alumni Network", desc: "2,500+ graduates ready to refer, collaborate and mentor." },
];

const stats = [
  { value: "2,500+", label: "Graduates placed" },
  { value: "30+", label: "Countries reached" },
  { value: "$10k+", label: "Avg. remote income" },
  { value: "92%", label: "Satisfaction rate" },
];

// ── PAGE ──────────────────────────────────────────────────────────────────────

const Index = () => {
  return (
    <div className="min-h-screen antialiased text-white" style={{ background: "#0a0907" }}>

      {/* Global ambient warm tint -- very subtle, not theatrical */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 60% 0%, rgba(180,83,9,0.07) 0%, transparent 70%), " +
            "radial-gradient(ellipse 50% 40% at 10% 100%, rgba(120,53,15,0.06) 0%, transparent 60%)",
        }}
      />

      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-28 pb-20">
        <motion.div {...heroFade(0)} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-8 text-xs tracking-widest uppercase"
          style={{ background: "rgba(180,83,9,0.12)", border: "1px solid rgba(217,119,6,0.2)", color: "rgba(253,230,138,0.7)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
          Now enrolling the 2026 cohort
        </motion.div>

        <motion.h1 {...heroFade(0.1)} className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight max-w-4xl">
          <span className="text-white">Your skills deserve</span>
          <br />
          <span style={{ backgroundImage: "linear-gradient(100deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
            a global audience.
          </span>
        </motion.h1>

        <motion.p {...heroFade(0.22)} className="mt-6 text-lg text-white/45 max-w-2xl leading-relaxed font-normal">
          Star9 trains African professionals in AI, freelancing and education, then connects them directly to verified remote opportunities worldwide.
        </motion.p>

        <motion.div {...heroFade(0.32)} className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/auth"
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg text-sm font-semibold transition-all duration-300 group"
            style={{ background: "linear-gradient(135deg, #d97706, #b45309)", color: "#fff", boxShadow: "0 0 24px rgba(180,83,9,0.35)" }}>
            Start for free
            <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link to="/global"
            className="inline-flex items-center justify-center h-12 px-7 rounded-lg text-sm font-medium text-white/50 hover:text-white/80 transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.03)" }}>
            Browse opportunities
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div {...heroFade(0.42)} className="mt-14 flex items-center gap-4 justify-center">
          <div className="flex -space-x-2">
            {["#92400e", "#a16207", "#b45309", "#c2410c"].map((c, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold"
                style={{ backgroundColor: c, borderColor: "#0a0907" }}>
                {["D", "G", "S", "K"][i]}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} className="size-3 fill-amber-400 text-amber-400" />)}</div>
          <span className="text-xs text-white/30">Trusted by 2,500+ graduates across Africa</span>
        </motion.div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="py-12" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={i} {...fade(i * 0.08)} className="text-center">
              <p className="text-3xl font-semibold tracking-tight" style={{ color: "#fbbf24" }}>{s.value}</p>
              <p className="text-xs text-white/30 uppercase tracking-widest mt-1.5">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PILLARS ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade()} className="mb-16">
            <p className="text-xs text-amber-400/60 uppercase tracking-widest mb-3">Why Star9</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white/90 max-w-lg leading-tight">
              Everything you need to work globally, in one place.
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p, i) => (
              <motion.div key={i} {...fade(i * 0.1)}
                className="p-6 rounded-xl group hover:bg-white/[0.03] transition-colors duration-300"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="size-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(180,83,9,0.12)", border: "1px solid rgba(217,119,6,0.15)" }}>
                  <p.icon className="size-4 text-amber-500/80" />
                </div>
                <h3 className="text-sm font-semibold text-white/85 mb-2">{p.title}</h3>
                <p className="text-sm text-white/35 leading-relaxed font-normal">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE PLACEMENTS ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fade()}>
            <p className="text-xs text-amber-400/60 uppercase tracking-widest mb-3">Real outcomes</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white/90 leading-tight mb-6">
              From local talent to global income.
            </h2>
            <p className="text-white/40 text-base leading-relaxed mb-10">
              Star9 graduates are currently working remotely at an average of 8x their previous income. The pipeline works.
            </p>
            <div className="space-y-4">
              {[
                { icon: Zap, text: "92% of graduates placed within 3 months" },
                { icon: TrendingUp, text: "Average earnings increase of 8x post-graduation" },
                { icon: Globe2, text: "Active placements across 30+ countries" },
              ].map((item, i) => (
                <motion.div key={i} {...fade(i * 0.1)} className="flex items-center gap-3">
                  <div className="size-8 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: "rgba(180,83,9,0.1)", border: "1px solid rgba(217,119,6,0.12)" }}>
                    <item.icon className="size-3.5 text-amber-500/70" />
                  </div>
                  <span className="text-sm text-white/50">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Placements card */}
          <motion.div {...fade(0.15)} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs text-white/30 uppercase tracking-widest">Live placements</p>
            </div>
            <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              {placements.map((p, i) => (
                <motion.div key={i} {...fade(0.2 + i * 0.08)} className="flex items-center gap-4 px-6 py-4">
                  <div className="size-8 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0"
                    style={{ background: `hsl(${25 + i * 10}, 55%, ${28 + i * 5}%)` }}>
                    {p.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/80">{p.name}</p>
                    <p className="text-xs text-white/30 mt-0.5 flex items-center gap-1">
                      <MapPin className="size-3 shrink-0" />{p.location} · {p.role}
                    </p>
                  </div>
                  <p className="text-sm font-semibold shrink-0" style={{ color: "#fbbf24" }}>{p.salary}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade()} className="mb-16">
            <p className="text-xs text-amber-400/60 uppercase tracking-widest mb-3">Programmes</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white/90 max-w-lg leading-tight">
              Invest once. Earn globally.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {tracks.map((t, i) => (
              <motion.div key={i} {...fade(i * 0.12)}
                className="relative flex flex-col rounded-2xl p-7 transition-all duration-300"
                style={{
                  background: t.highlight ? "rgba(180,83,9,0.07)" : "rgba(255,255,255,0.02)",
                  border: t.highlight ? "1px solid rgba(217,119,6,0.22)" : "1px solid rgba(255,255,255,0.07)",
                }}>
                {/* Highlighted top rule */}
                {t.highlight && (
                  <div className="absolute top-0 inset-x-12 h-px rounded-full"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent)" }} />
                )}
                {t.highlight && (
                  <span className="absolute -top-3 left-6 text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-semibold"
                    style={{ background: "rgba(180,83,9,0.5)", border: "1px solid rgba(217,119,6,0.3)", color: "#fde68a" }}>
                    Most popular
                  </span>
                )}

                <div className="flex-1">
                  <p className="text-[11px] text-white/25 font-mono uppercase tracking-widest mb-4">{t.id}</p>
                  <h3 className="text-lg font-semibold text-white/90 mb-2">{t.name}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-6 font-normal">{t.summary}</p>
                  <ul className="space-y-2.5">
                    {t.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-white/50">
                        <CheckCircle2 className={`size-3.5 shrink-0 ${t.highlight ? "text-amber-500/80" : "text-white/20"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 flex items-end justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <div>
                    <p className="text-2xl font-semibold text-white/90">{t.price}</p>
                    <p className="text-xs text-white/25 mt-0.5">{t.duration} · one-time</p>
                  </div>
                  <Link to="/auth"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-300 group"
                    style={t.highlight
                      ? { background: "linear-gradient(135deg, #d97706, #b45309)", color: "#fff" }
                      : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" }}>
                    Enroll now
                    <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade()} className="mb-16">
            <p className="text-xs text-amber-400/60 uppercase tracking-widest mb-3">Graduate stories</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white/90 max-w-lg leading-tight">
              Life-changing results, not just certificates.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} {...fade(i * 0.1)}
                className="p-7 rounded-2xl flex flex-col"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="size-3 fill-amber-500/60 text-amber-500/60" />)}
                </div>
                <p className="text-sm text-white/60 leading-relaxed flex-1 mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="size-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: `hsl(${25 + i * 9}, 55%, ${28 + i * 5}%)` }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">{t.name}</p>
                    <p className="text-xs text-white/30 flex items-center gap-1 mt-0.5">
                      <MapPin className="size-3" />{t.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <motion.div {...fade()} className="max-w-2xl mx-auto">
          <p className="text-xs text-amber-400/60 uppercase tracking-widest mb-5">Get started today</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white/90 leading-tight mb-6">
            Ready to earn on the world stage?
          </h2>
          <p className="text-base text-white/40 leading-relaxed mb-10">
            Join thousands of African professionals already working remotely. Sign up free and pick your track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/auth"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-sm font-semibold transition-all duration-300 group"
              style={{ background: "linear-gradient(135deg, #d97706, #b45309)", color: "#fff", boxShadow: "0 0 28px rgba(180,83,9,0.4)" }}>
              Create a free account
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/academy"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg text-sm font-medium text-white/50 hover:text-white/75 transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.03)" }}>
              View the curriculum
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
