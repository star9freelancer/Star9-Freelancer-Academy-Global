import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search as SearchIcon, 
  MapPin as MapPinIcon, 
  DollarSign as DollarSignIcon, 
  Clock as ClockIcon, 
  GraduationCap as GraduationCapIcon, 
  Briefcase as BriefcaseIcon, 
  ArrowRight as ArrowRightIcon, 
  HeartPulse as HeartPulseIcon, 
  Code as CodeIcon, 
  PenTool as PenToolIcon, 
  Layout as LayoutIcon, 
  PieChart as PieChartIcon, 
  ShieldCheck as ShieldCheckIcon, 
  Video as VideoIcon, 
  Presentation as PresentationIcon, 
  Globe as GlobeIcon, 
  Users as UsersIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/landing/Header";
import { supabase } from "@/lib/supabase";

// ── DATA ─────────────────────────────────────────────────────────────────────

const remoteCategories = [
  { label: "Programmers",            icon: CodeIcon,         count: "120+ roles", slug: "programmers" },
  { label: "Designers",              icon: PenToolIcon,      count: "80+ roles",  slug: "designers" },
  { label: "Website Developers",     icon: LayoutIcon,       count: "150+ roles", slug: "web-developers" },
  { label: "Data Analysts",          icon: PieChartIcon,     count: "90+ roles",  slug: "data-analysts" },
  { label: "Data Scientists",        icon: GlobeIcon,        count: "50+ roles",  slug: "data-scientists" },
  { label: "Online Tutors/Teachers", icon: PresentationIcon, count: "200+ roles", slug: "tutors" },
  { label: "Cybersecurity Experts",  icon: ShieldCheckIcon,  count: "40+ roles",  slug: "cybersecurity" },
  { label: "Content Creators",       icon: VideoIcon,        count: "110+ roles", slug: "content-creators" },
];

const studyPrograms = [
  { level: "Bachelor's Degree", regions: "Global" },
  { level: "Master's Degree",   regions: "Global" },
  { level: "PhD Programs",      regions: "Global" },
  { level: "Diploma",          regions: "Europe" },
  { level: "Certificate Programs", regions: "Global" },
  { level: "Short Courses",     regions: "Online" },
];

const workAbroadCountries = [
  { name: "United States", flag: "https://flagcdn.com/w160/us.png", code: "us" },
  { name: "United Kingdom", flag: "https://flagcdn.com/w160/gb.png", code: "gb" },
  { name: "Canada",         flag: "https://flagcdn.com/w160/ca.png", code: "ca" },
  { name: "Germany",        flag: "https://flagcdn.com/w160/de.png", code: "de" },
  { name: "China",          flag: "https://flagcdn.com/w160/cn.png", code: "cn" },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

const Global = () => {
  const [categorySearch, setCategorySearch] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const filteredCategories = remoteCategories.filter(c =>
    c.label.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute hidden md:block top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute hidden md:block bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] -z-10" />

      <Header />

      <div className="container pt-32 pb-16 space-y-24 max-w-7xl mx-auto px-4">

        {/* ── PAGE HERO ──────────────────────────────────────────────────── */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
            Global Marketplace
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Your Pathway to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Global Success
            </span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Discover elite opportunities in international placement, remote work, and prestigious academic programmes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button size="lg" className="h-12 gap-2" asChild>
              <Link to={user ? "/academy" : "/auth"}>
                {user ? "View My Dashboard" : "Create Free Account"} <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 gap-2" asChild>
              <Link to="/academy">Browse Courses</Link>
            </Button>
          </div>
        </div>

        {/* ── SECTION A: THE FREELANCER HUB ─────────────────────────────── */}
        <section className="space-y-16" id="freelancers">
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-[0.2em]">
               Global Career Pathways
            </div>
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter">
              The <span className="text-primary italic">Freelancer</span> Hub
            </h2>
            <p className="text-muted-foreground text-lg">
              Whether you're looking for international placement or high-paying remote roles, our hub connects you to the elite global economy.
            </p>
          </div>

          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-border/50" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary font-bold">1. Specialised Placement Tracks</span>
              <div className="h-px flex-1 bg-border/50" />
            </div>

            {/* Countries strip */}
            <div className="flex flex-wrap justify-center gap-3">
              {workAbroadCountries.map(c => (
                <div key={c.code} className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm font-medium">
                  <img src={c.flag} className="h-4 w-6 rounded-sm object-cover" alt={c.name} />
                  {c.name}
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Teacher Placement */}
              <div className="glass p-8 rounded-3xl space-y-6 border-white/10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <GraduationCapIcon className="size-32" />
                </div>
                <Badge className="bg-primary hover:bg-primary/90 text-white border-0 px-3 py-1">Featured</Badge>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Teacher Preparation and Placement</h3>
                  <p className="text-sm text-muted-foreground italic">Comprehensive training followed by dedicated placement pipeline to the US, UK, Canada, and Germany.</p>
                </div>

                <div className="flex flex-wrap gap-4 py-2 border-y border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase text-zinc-500">Duration</span>
                    <span className="text-sm font-bold">12 Weeks</span>
                  </div>
                  <div className="w-px bg-white/5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase text-zinc-500">Format</span>
                    <span className="text-sm font-bold">Hybrid (Online + Placement)</span>
                  </div>
                  <div className="w-px bg-white/5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase text-zinc-500">Price</span>
                    <span className="text-sm font-bold text-primary">$1500</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { step: "1", title: "Phase 1: Preparation", desc: "Documentation, Resume Tailoring & Certification Review" },
                    { step: "2", title: "Phase 2: Audition", desc: "Loom Video Pitch & Live Interview Placements" },
                    { step: "3", title: "Phase 3: Relocation", desc: "Visa Sponsorship & Study-Work Logistics Support" },
                  ].map(p => (
                    <div key={p.step} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">{p.step}</div>
                      <div>
                        <h4 className="font-semibold text-foreground">{p.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full h-14 shadow-xl shadow-primary/20 gap-2 rounded-2xl text-base font-bold" asChild>
                  <Link to={user ? "/academy" : "/auth"}>
                    {user ? "Enroll in Programme" : "Start 3-Phase Process"} <ArrowRightIcon className="size-4" />
                  </Link>
                </Button>
              </div>

              {/* Caregivers */}
              <div className="glass p-8 rounded-3xl space-y-6 border-white/10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <HeartPulseIcon className="size-32" />
                </div>
                <Badge variant="outline" className="px-3 py-1">High Demand</Badge>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Caregiver & Healthcare Placements</h3>
                  <p className="text-sm text-muted-foreground">Connecting compassionate professionals with facilities in America and Europe.</p>
                </div>

                <div className="grid gap-4 mt-6">
                  <div className="p-4 rounded-2xl bg-card/40 border border-white/5 flex items-center gap-4">
                    <MapPinIcon className="size-6 text-primary" />
                    <div>
                      <h4 className="font-semibold">America & Europe Hubs</h4>
                      <p className="text-xs text-muted-foreground">Sponsorship options available</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-card/40 border border-white/5 flex items-center gap-4">
                    <ClockIcon className="size-6 text-secondary" />
                    <div>
                      <h4 className="font-semibold">Flexible Models</h4>
                      <p className="text-xs text-muted-foreground">On-site and hybrid transition roles</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-card/40 border border-white/5 flex items-center gap-4">
                    <DollarSignIcon className="size-6 text-emerald-400" />
                    <div>
                      <h4 className="font-semibold">5% Placement Commission</h4>
                      <p className="text-xs text-muted-foreground">Flat $1,000 for contracts exceeding $10k over 6 months</p>
                    </div>
                  </div>
                </div>

                <Button variant="secondary" className="w-full h-12 gap-2" asChild>
                  <Link to={user ? "/academy" : "/auth"}>
                    {user ? "Submit Profile" : "Apply as Caregiver"} <ArrowRightIcon className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-border/50" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary font-bold">2. Remote Work Marketplace</span>
              <div className="h-px flex-1 bg-border/50" />
            </div>

            <div className="space-y-10">
              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  value={categorySearch}
                  onChange={e => setCategorySearch(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filteredCategories.map((cat, i) => (
                  <Link
                    key={i}
                    to="/auth"
                    className="glass p-6 rounded-3xl text-center hover:bg-white/5 transition-all cursor-pointer group shadow-xl block"
                  >
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                      <cat.icon className="size-7" />
                    </div>
                    <h3 className="font-bold text-sm md:text-base leading-tight mb-2">{cat.label}</h3>
                    <p className="text-xs font-semibold text-secondary">{cat.count}</p>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
                      Browse roles <ArrowRightIcon className="size-3" />
                    </p>
                  </Link>
                ))}
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Access to all job listings requires a free account.
                </p>
                <Button className="gap-2" asChild>
                  <Link to="/auth"><UsersIcon className="size-4" /> Create Free Account</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION C: STUDY ABROAD ────────────────────────────────────── */}
        <section className="space-y-10" id="study-abroad">
          <div className="glass rounded-3xl p-8 md:p-12 border-white/10 shadow-2xl relative overflow-hidden text-center md:text-left">
            <div className="absolute hidden md:block right-[-10%] top-[-20%] w-[60%] h-[150%] bg-secondary/5 rounded-full blur-[80px] -z-10" />

            <div className="md:flex items-center justify-between gap-12">
              <div className="space-y-6 flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider">
                  Academic Directory
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Study Abroad Programmes</h2>
                <p className="text-muted-foreground text-lg">
                  Secure your future with world-class education. We provide guidance for admissions, scholarships, and visas across multiple disciplines.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  {studyPrograms.map((prog, i) => (
                    <div key={i} className="flex flex-col gap-1 text-left p-4 rounded-xl hover:bg-card/40 transition-colors border border-transparent hover:border-white/5">
                      <span className="font-semibold text-sm">{prog.level}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPinIcon className="size-3" /> {prog.regions}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="h-12 px-8 gap-2 shadow-xl" asChild>
                    <Link to="/auth">Apply for Guidance <ArrowRightIcon className="size-4" /></Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-8" asChild>
                    <Link to="/auth">Explore Directory</Link>
                  </Button>
                </div>
              </div>

              <div className="hidden md:block flex-1 relative mt-8 md:mt-0">
                <div className="aspect-square rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center backdrop-blur-3xl border border-white/10 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {workAbroadCountries.slice(0, 4).map(c => (
                      <div key={c.code} className="aspect-square rounded-2xl bg-card border shadow-lg flex items-center justify-center overflow-hidden">
                        <img src={c.flag} className="opacity-80 w-full h-full object-cover" alt={c.name} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── REFERRAL CTA BANNER ────────────────────────────────────────── */}
        <section className="rounded-3xl p-8 md:p-12 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border border-primary/20 text-center space-y-6">
          <h2 className="text-3xl font-bold">Earn by Referring Others</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Share your referral link and earn commissions on every successful enrolment. $10 for AI for Freelancers, $15 for Mastering Freelancing or International Teacher Preparation.
          </p>
          <Button size="lg" className="h-12 px-8 gap-2 shadow-xl" asChild>
            <Link to={user ? "/academy" : "/auth"}>
              {user ? "View Referral Stats" : "Get Your Referral Link"} <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </section>

      </div>
    </div>
  );
};

export default Global;
