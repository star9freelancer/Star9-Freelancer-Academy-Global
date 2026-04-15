import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Search, MapPin, DollarSign, Clock, GraduationCap, Briefcase, ArrowLeft, ArrowRight, HeartPulse, Code, PenTool, Layout, PieChart, ShieldCheck, Video, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import logo from "@/assets/logo_transparent.png";
import Header from "@/components/landing/Header";

// --- Section B Data ---
const remoteCategories = [
  { label: "Programmers", icon: Code, count: "120+ roles" },
  { label: "Designers", icon: PenTool, count: "80+ roles" },
  { label: "Website Developers", icon: Layout, count: "150+ roles" },
  { label: "Data Analysts", icon: PieChart, count: "90+ roles" },
  { label: "Data Scientists", icon: MapPin, count: "50+ roles" }, // Placeholder icon
  { label: "Online Tutors/Teachers", icon: Presentation, count: "200+ roles" },
  { label: "Cybersecurity Experts", icon: ShieldCheck, count: "40+ roles" },
  { label: "Content Creators", icon: Video, count: "110+ roles" },
];

const studyPrograms = [
  { level: "Bachelor’s Degree", regions: "Global", icon: GraduationCap },
  { level: "Master’s Degree", regions: "Global", icon: GraduationCap },
  { level: "PhD Programs", regions: "Global", icon: GraduationCap },
  { level: "Germany Diploma", regions: "Europe", icon: GraduationCap },
  { level: "Certificate Programs", regions: "Global", icon: GraduationCap },
  { level: "Short Courses", regions: "Online", icon: GraduationCap },
];

const Global = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const handleGate = () => {
    if (!user) {
      toast.error("Authentication Required", { description: "Please log in or sign up to access this feature." });
      navigate("/auth");
      return false;
    }
    return true;
  };

  const attemptAction = (actionName: string) => {
    if (handleGate()) {
      toast.success(`${actionName} Initiated!`);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] -z-10" />

      <Header />

      <div className="container pt-32 pb-16 space-y-24 max-w-7xl mx-auto">
        {/* Page Hero */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
             Global Marketplace
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Your Pathway to <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Global Success</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Discover elite opportunities in international placement, remote work, and prestigious academic programs.
          </p>
        </div>

        {/* Section A: Work Abroad */}
        <section className="space-y-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold flex items-center gap-3"><Briefcase className="text-primary size-8" /> Work Abroad (International Placements)</h2>
            <p className="text-muted-foreground">End-to-end placement assistance for high-demand international roles.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Teacher Placement */}
            <div className="glass p-8 rounded-3xl space-y-6 border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <GraduationCap className="size-32" />
              </div>
              <Badge className="bg-primary hover:bg-primary/90 text-white border-0 px-3 py-1">Featured</Badge>
              <div>
                <h3 className="text-2xl font-bold mb-2">International Teacher Placement</h3>
                <p className="text-sm text-muted-foreground">Dedicated placement to the US, UK, Canada, China, and Germany.</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Phase 1: Preparation</h4>
                    <p className="text-xs text-muted-foreground mt-1">Documentation, Resume Tailoring & Certification Review</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Phase 2: Audition</h4>
                    <p className="text-xs text-muted-foreground mt-1">Loom Video Pitch & Live Interview Placements</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Phase 3: Relocation</h4>
                    <p className="text-xs text-muted-foreground mt-1">Visa Sponsorship & Travel Logistics Support</p>
                  </div>
                </div>
              </div>
              <Button className="w-full h-12 shadow-md shadow-primary/20 gap-2" onClick={() => attemptAction("Teacher Placement Application")}>Start 3-Phase Process <ArrowRight className="size-4" /></Button>
            </div>

            {/* Caregivers */}
            <div className="glass p-8 rounded-3xl space-y-6 border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <HeartPulse className="size-32" />
              </div>
              <Badge variant="outline" className="px-3 py-1">High Demand</Badge>
              <div>
                <h3 className="text-2xl font-bold mb-2">Caregiver & Healthcare Placements</h3>
                <p className="text-sm text-muted-foreground">Connecting compassionate professionals with facilities in America and Europe.</p>
              </div>
              
              <div className="grid gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-card/40 border border-white/5 flex items-center gap-4">
                  <MapPin className="size-6 text-primary" />
                  <div>
                    <h4 className="font-semibold">America & Europe Hubs</h4>
                    <p className="text-xs text-muted-foreground">Sponsorship options available</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-card/40 border border-white/5 flex items-center gap-4">
                  <Clock className="size-6 text-secondary" />
                  <div>
                    <h4 className="font-semibold">Flexible Models</h4>
                    <p className="text-xs text-muted-foreground">On-site and Hybrid transition roles</p>
                  </div>
                </div>
              </div>
              <Button variant="secondary" className="w-full h-12 mt-4 gap-2" onClick={() => attemptAction("Caregiver Application")}>Apply as Caregiver <ArrowRight className="size-4" /></Button>
            </div>
          </div>
        </section>

        {/* Section B: Remote Work */}
        <section className="space-y-10">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-3">Remote Work Marketplace</h2>
            <p className="text-muted-foreground">Access verified, high-paying remote roles tailored for 8 core disciplines.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {remoteCategories.map((cat, i) => (
              <div key={i} className="glass p-6 rounded-3xl text-center hover:bg-white/5 transition-all cursor-pointer group shadow-xl" onClick={() => attemptAction(`Browse ${cat.label}`)}>
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <cat.icon className="size-7" />
                </div>
                <h3 className="font-bold text-sm md:text-base leading-tight mb-2">{cat.label}</h3>
                <p className="text-xs font-semibold text-secondary">{cat.count}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section C: Study Abroad */}
        <section className="space-y-10">
          <div className="glass rounded-3xl p-8 md:p-12 border-white/10 shadow-2xl relative overflow-hidden text-center md:text-left">
            <div className="absolute right-[-10%] top-[-20%] w-[60%] h-[150%] bg-secondary/5 rounded-full blur-[80px] -z-10" />
            
            <div className="md:flex items-center justify-between gap-12">
              <div className="space-y-6 flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider">
                  Academic Directory
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Study Abroad Programs</h2>
                <p className="text-muted-foreground text-lg">Secure your future with world-class education. We provide guidance for admissions, scholarships, and visas across multiple disciplines.</p>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {studyPrograms.map((prog, i) => (
                    <div key={i} className="flex flex-col gap-1 text-left p-4 rounded-xl hover:bg-card/40 transition-colors border border-transparent hover:border-white/5">
                      <span className="font-semibold text-sm">{prog.level}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="size-3" /> {prog.regions}</span>
                    </div>
                  ))}
                </div>
                
                <Button size="lg" className="h-14 px-8 w-full md:w-auto shadow-xl" onClick={() => attemptAction("Study Abroad Inquiry")}>
                  Explore Directory
                </Button>
              </div>
              
              <div className="hidden md:block flex-1 relative">
                <div className="aspect-square rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center backdrop-blur-3xl border border-white/10 shadow-2xl relative z-10">
                   <div className="grid grid-cols-2 gap-4 w-full">
                     <div className="aspect-square rounded-2xl bg-card border shadow-lg flex items-center justify-center overflow-hidden"><img src="https://flagcdn.com/w160/us.png" className="opacity-80" alt="US" /></div>
                     <div className="aspect-square rounded-2xl bg-card border shadow-lg flex items-center justify-center overflow-hidden"><img src="https://flagcdn.com/w160/gb.png" className="opacity-80" alt="UK" /></div>
                     <div className="aspect-square rounded-2xl bg-card border shadow-lg flex items-center justify-center overflow-hidden"><img src="https://flagcdn.com/w160/de.png" className="opacity-80" alt="Germany" /></div>
                     <div className="aspect-square rounded-2xl bg-card border shadow-lg flex items-center justify-center overflow-hidden"><img src="https://flagcdn.com/w160/ca.png" className="opacity-80" alt="Canada" /></div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Global;
