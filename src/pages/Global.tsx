import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Search, Filter, MapPin, DollarSign, Clock, GraduationCap, Briefcase, ArrowLeft, Bell, BookmarkPlus, ChevronDown, Star, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import logo from "@/assets/logo_transparent.png";

const jobs = [
  { title: "Senior UI/UX Designer", company: "TechNova Inc.", salary: "$60k - $85k", type: "Full-time", level: "Senior", skills: ["Figma", "Design Systems", "Prototyping"], location: "Remote (Global)", description: "Lead product design for a growing SaaS company. You'll own the design system and mentor junior designers." },
  { title: "Technical Writer", company: "ContentLab", salary: "$40k - $55k", type: "Contract", level: "Mid", skills: ["Documentation", "Copywriting", "SEO"], location: "Remote (Africa)", description: "Create developer documentation and user guides for API products." },
  { title: "Full-Stack Developer", company: "BuildStack", salary: "$70k - $100k", type: "Full-time", level: "Senior", skills: ["React", "Node.js", "AWS"], location: "Remote (Global)", description: "Build and maintain scalable web applications serving 100k+ users." },
  { title: "Virtual Assistant", company: "ScaleOps", salary: "$25k - $35k", type: "Part-time", level: "Entry", skills: ["Admin", "Scheduling", "CRM"], location: "Remote (Global)", description: "Provide administrative support to executives. Manage calendars and communications." },
  { title: "Data Analyst", company: "InsightAnalytics", salary: "$50k - $70k", type: "Full-time", level: "Mid", skills: ["Python", "SQL", "Tableau"], location: "Remote (Europe/Africa)", description: "Analyze datasets to drive business decisions. Create dashboards and reports." },
  { title: "Social Media Manager", company: "BrandForge", salary: "$35k - $50k", type: "Contract", level: "Mid", skills: ["Content Strategy", "Analytics", "Canva"], location: "Remote (Global)", description: "Manage social media presence across platforms. Create content calendars and drive engagement." },
  { title: "Customer Success Lead", company: "SaaSly", salary: "$45k - $65k", type: "Full-time", level: "Mid", skills: ["CRM", "Onboarding", "Communication"], location: "Remote (US/Africa)", description: "Drive product adoption and retention. Onboard new enterprise clients." },
];

const universities = [
  { name: "University of Cape Town", country: "South Africa", flag: "za", program: "Computer Science", deadline: "Mar 2026", rating: 4.8, tuition: "Free (Scholarships)", url: "#" },
  { name: "Technical University of Munich", country: "Germany", flag: "de", program: "Data Science & Analytics", deadline: "Apr 2026", rating: 4.9, tuition: "Free (No Tuition)", url: "#" },
  { name: "University of Toronto", country: "Canada", flag: "ca", program: "Business Analytics", deadline: "May 2026", rating: 4.7, tuition: "CAD $6,100/yr", url: "#" },
  { name: "National University of Singapore", country: "Singapore", flag: "sg", program: "Information Systems", deadline: "Jun 2026", rating: 4.8, tuition: "SGD $8,000/yr", url: "#" },
  { name: "University of Edinburgh", country: "United Kingdom", flag: "gb", program: "Machine Learning Concepts", deadline: "Apr 2026", rating: 4.6, tuition: "Scholarships Available", url: "#" },
  { name: "KAIST", country: "South Korea", flag: "kr", program: "Software Engineering", deadline: "May 2026", rating: 4.9, tuition: "Full Scholarship", url: "#" },
  { name: "University of Nairobi", country: "Kenya", flag: "ke", program: "Information Technology", deadline: "Jul 2026", rating: 4.3, tuition: "KES 120,000/yr", url: "#" },
  { name: "EPFL", country: "Switzerland", flag: "ch", program: "Digital Humanities", deadline: "Apr 2026", rating: 4.9, tuition: "CHF 730/semester", url: "#" },
];

const Global = () => {
  const [tab, setTab] = useState<"work" | "study" | "applications">("work");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState<Set<string>>(new Set());
  const [levelFilter, setLevelFilter] = useState<Set<string>>(new Set());
  const [regionFilter, setRegionFilter] = useState<Set<string>>(new Set());
  const [applications, setApplications] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        setUser(user);
        const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (profileData) setProfile(profileData);
      }
    });
  }, []);

  const toggleFilter = (set: Set<string>, value: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const toggleSave = (index: number) => {
    setSavedJobs(prev => {
      const next = new Set(prev);
      if (next.has(index)) { next.delete(index); toast.info("Removed from saved"); }
      else { next.add(index); toast.success("Job saved!"); }
      return next;
    });
  };

  const handleApply = (title: string, company: string, type: "Remote Work" | "Study Abroad") => {
    setApplications(prev => [...prev, {
      title: `${title} @ ${company}`,
      type,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Submitted"
    }]);
    toast.success("Application submitted!", { description: `Your application for ${title} has been recorded.` });
  };

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = searchQuery === "" ||
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter.size === 0 || typeFilter.has(j.type);
    const matchesLevel = levelFilter.size === 0 || levelFilter.has(j.level);
    return matchesSearch && matchesType && matchesLevel;
  });

  const filteredUnis = universities.filter(u => {
    const matchesSearch = searchQuery === "" ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b bg-card/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Star9" className="h-10 w-auto object-contain" />
          </Link>
          <div className="h-6 w-px bg-border" />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/academy" className="gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-3" /> Academy
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm overflow-hidden">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span>{profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}</span>
            )}
          </div>
        </div>
      </header>

      <div className="container py-8 space-y-8 max-w-6xl">
        {/* Hero */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Global Opportunities</h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Remote jobs and international academic programs curated for African talent.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-xl border bg-muted p-1 gap-1">
            {[
              { key: "work", label: "Remote Work", icon: Briefcase },
              { key: "study", label: "Study Abroad", icon: GraduationCap },
              { key: "applications", label: "My Applications", icon: FileText },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key as any); setSearchQuery(""); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  tab === t.key ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <t.icon className="size-4" /> {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search + Filters */}
        {tab !== "applications" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 max-w-2xl mx-auto">
              <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border bg-card">
                <Search className="size-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder={tab === "work" ? "Search jobs, skills, companies..." : "Search universities, programs..."}
                  className="bg-transparent outline-none text-sm w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2 shrink-0">
                <Filter className="size-4" /> Filters <ChevronDown className={`size-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </Button>
            </div>

            {showFilters && (
              <div className="max-w-2xl mx-auto rounded-xl border bg-card p-4">
                {tab === "work" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold mb-2 text-muted-foreground">Role Type</p>
                      {["Full-time", "Contract", "Part-time"].map(t => (
                        <label key={t} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                          <input type="checkbox" className="rounded border-border" checked={typeFilter.has(t)} onChange={() => toggleFilter(typeFilter, t, setTypeFilter)} /> {t}
                        </label>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-2 text-muted-foreground">Experience</p>
                      {["Entry", "Mid", "Senior"].map(t => (
                        <label key={t} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                          <input type="checkbox" className="rounded border-border" checked={levelFilter.has(t)} onChange={() => toggleFilter(levelFilter, t, setLevelFilter)} /> {t}
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-semibold mb-2 text-muted-foreground">Region</p>
                    <div className="flex flex-wrap gap-2">
                      {["Africa", "Europe", "Asia", "Americas"].map(t => (
                        <label key={t} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                          <input type="checkbox" className="rounded border-border" checked={regionFilter.has(t)} onChange={() => toggleFilter(regionFilter, t, setRegionFilter)} /> {t}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        {tab !== "applications" && (
          <div className="flex justify-center gap-8 text-center">
            {tab === "work" ? (
              <>
                <div><p className="text-xl font-bold text-primary">{filteredJobs.length}</p><p className="text-xs text-muted-foreground">Open Roles</p></div>
                <div className="border-l pl-8"><p className="text-xl font-bold">{savedJobs.size}</p><p className="text-xs text-muted-foreground">Saved</p></div>
                <div className="border-l pl-8"><p className="text-xl font-bold text-secondary">{applications.filter(a => a.type === "Remote Work").length}</p><p className="text-xs text-muted-foreground">Applied</p></div>
              </>
            ) : (
              <>
                <div><p className="text-xl font-bold text-primary">{filteredUnis.length}</p><p className="text-xs text-muted-foreground">Programs</p></div>
                <div className="border-l pl-8"><p className="text-xl font-bold">{new Set(universities.map(u => u.country)).size}</p><p className="text-xs text-muted-foreground">Countries</p></div>
              </>
            )}
          </div>
        )}

        {/* Job Listings */}
        {tab === "work" && (
          <div className="grid gap-4">
            {filteredJobs.map((job, i) => (
              <div key={i} className="rounded-xl border bg-card p-6 hover:border-primary/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{job.company.charAt(0)}</div>
                      <div>
                        <h3 className="font-bold text-lg">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                      <button onClick={() => toggleSave(i)} className={`ml-auto p-2 rounded-lg hover:bg-muted transition-colors ${savedJobs.has(i) ? "text-secondary" : "text-muted-foreground"}`}>
                        <BookmarkPlus className="size-4" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map(s => (
                        <span key={s} className="text-xs px-2.5 py-1 rounded-md border bg-muted text-muted-foreground font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3 shrink-0 md:min-w-[180px]">
                    <span className="text-sm font-bold text-secondary">{job.salary}</span>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {job.type}</span>
                      <span className="flex items-center gap-1"><MapPin className="size-3" /> {job.location}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">{job.level}</Badge>
                    <Button size="sm" className="w-full md:w-auto mt-1" onClick={() => handleApply(job.title, job.company, "Remote Work")}>
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredJobs.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Briefcase className="size-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No jobs match your filters</p>
                <p className="text-sm">Try adjusting your search or clearing filters.</p>
              </div>
            )}
          </div>
        )}

        {/* Study Abroad */}
        {tab === "study" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUnis.map((uni, i) => (
              <div key={i} className="rounded-xl border bg-card p-6 hover:border-primary/30 transition-all flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden border">
                    <img src={`https://flagcdn.com/w40/${uni.flag}.png`} alt={uni.country} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="size-3 fill-secondary text-secondary" /> {uni.rating}
                  </div>
                </div>
                <h3 className="font-bold text-lg leading-tight mb-1">{uni.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{uni.country}</p>
                <p className="text-sm font-medium text-primary mb-2">{uni.program}</p>
                <p className="text-xs text-muted-foreground mb-4">{uni.tuition}</p>
                <div className="mt-auto pt-4 border-t space-y-3">
                  <p className="text-xs text-muted-foreground">Deadline: {uni.deadline}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => handleApply(uni.program, uni.name, "Study Abroad")}>Apply</Button>
                    <Button size="sm" variant="outline">Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Applications */}
        {tab === "applications" && (
          <div className="space-y-6">
            {applications.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <FileText className="size-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No applications yet</p>
                <p className="text-sm">Apply to jobs or programs to track them here.</p>
              </div>
            ) : (
              <div className="rounded-xl border bg-card overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-xs text-muted-foreground border-b">
                    <tr>
                      <th className="px-6 py-4">Opportunity</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Date Applied</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {applications.map((app, i) => (
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 font-medium">{app.title}</td>
                        <td className="px-6 py-4"><Badge variant="outline">{app.type}</Badge></td>
                        <td className="px-6 py-4 text-muted-foreground">{app.date}</td>
                        <td className="px-6 py-4"><Badge className="bg-blue-500/20 text-blue-500">{app.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Global;
