import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, MapPin, DollarSign, Clock, GraduationCap, Briefcase, ArrowLeft, Bell, BookmarkPlus, ChevronDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_transparent.png";

const jobs = [
  { title: "Senior UI/UX Designer", company: "TechNova Inc.", salary: "$60k - $85k", type: "Full-time", level: "Senior", skills: ["Figma", "Design Systems", "Prototyping"], location: "Remote (Global)", saved: false },
  { title: "Technical Writer", company: "ContentLab", salary: "$40k - $55k", type: "Contract", level: "Mid", skills: ["Documentation", "Copywriting", "SEO"], location: "Remote (Africa)", saved: true },
  { title: "Full-Stack Developer", company: "BuildStack", salary: "$70k - $100k", type: "Full-time", level: "Senior", skills: ["React", "Node.js", "AWS"], location: "Remote (Global)", saved: false },
  { title: "Virtual Assistant", company: "ScaleOps", salary: "$25k - $35k", type: "Part-time", level: "Entry", skills: ["Admin", "Scheduling", "CRM"], location: "Remote (Global)", saved: false },
  { title: "Data Analyst", company: "InsightAnalytics", salary: "$50k - $70k", type: "Full-time", level: "Mid", skills: ["Python", "SQL", "Tableau"], location: "Remote (Europe/Africa)", saved: false },
];

const universities = [
  { name: "University of Cape Town", country: "South Africa", flag: "za", program: "Computer Science", deadline: "Mar 2026", rating: 4.8 },
  { name: "Technical University of Munich", country: "Germany", flag: "de", program: "Data Science & Analytics", deadline: "Apr 2026", rating: 4.9 },
  { name: "University of Toronto", country: "Canada", flag: "ca", program: "Business Analytics", deadline: "May 2026", rating: 4.7 },
  { name: "National University of Singapore", country: "Singapore", flag: "sg", program: "Information Systems", deadline: "Jun 2026", rating: 4.8 },
  { name: "University of Edinburgh", country: "United Kingdom", flag: "gb", program: "Machine Learning Concepts", deadline: "Apr 2026", rating: 4.6 },
  { name: "KAIST", country: "South Korea", flag: "kr", program: "Software Engineering", deadline: "May 2026", rating: 4.9 },
];

const Global = () => {
  const [tab, setTab] = useState<"work" | "study">("work");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set([1]));
  const [showFilters, setShowFilters] = useState(false);

  const toggleSave = (index: number) => {
    setSavedJobs(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const filteredJobs = jobs.filter(j =>
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredUnis = universities.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-20 border-b bg-card sticky top-0 z-40 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Star9" className="h-[56px] w-auto object-contain" />
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="gap-1 text-muted-foreground font-mono text-xs uppercase tracking-widest">
              <ArrowLeft className="!size-3" /> Exit Dashboard
            </Link>
          </Button>
          <div className="h-6 w-px bg-border mx-2" />
          <Button variant="outline" size="sm" asChild className="border-primary/50 text-primary hover:bg-primary/10">
            <Link to="/academy" className="gap-2 font-mono text-xs uppercase tracking-widest">
              Switch to Academy <GraduationCap className="!size-3" />
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-muted relative">
            <Bell className="size-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full" />
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-border/50">
            <img src="https://i.pravatar.cc/150?u=esther" alt="Esther N." className="w-8 h-8 rounded-full border border-border shrink-0 object-cover" />
          </div>
        </div>
      </header>

      <div className="container py-8 space-y-8">
        {/* Hero */}
        <div className="text-center space-y-4">
          <p className="font-mono text-xs font-semibold tracking-widest text-secondary uppercase">Star9 Ecosystem</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Global Network</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-medium">
            Premium remote opportunities and international academic programs, curated for exceptional talent.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-xl border bg-muted p-1">
            <button
              onClick={() => { setTab("work"); setSearchQuery(""); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-md text-xs font-mono font-bold uppercase tracking-widest transition-all ${
                tab === "work" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
              }`}
            >
              <Briefcase className="size-4" /> Remote Work
            </button>
            <button
              onClick={() => { setTab("study"); setSearchQuery(""); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-md text-xs font-mono font-bold uppercase tracking-widest transition-all ${
                tab === "study" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
              }`}
            >
              <GraduationCap className="size-4" /> Study Abroad
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-center gap-6 text-center">
          {tab === "work" ? (
            <>
              <div className="px-4">
                <p className="text-xl font-bold text-primary">{filteredJobs.length}</p>
                <p className="text-xs text-muted-foreground">Open Roles</p>
              </div>
              <div className="px-4 border-l">
                <p className="text-xl font-bold">{savedJobs.size}</p>
                <p className="text-xs text-muted-foreground">Saved Jobs</p>
              </div>
              <div className="px-4 border-l">
                <p className="text-xl font-bold text-secondary">12</p>
                <p className="text-xs text-muted-foreground">New This Week</p>
              </div>
            </>
          ) : (
            <>
              <div className="px-4">
                <p className="text-xl font-bold text-primary">{filteredUnis.length}</p>
                <p className="text-xs text-muted-foreground">Programs</p>
              </div>
              <div className="px-4 border-l">
                <p className="text-xl font-bold">6</p>
                <p className="text-xs text-muted-foreground">Countries</p>
              </div>
              <div className="px-4 border-l">
                <p className="text-xl font-bold text-secondary">3</p>
                <p className="text-xs text-muted-foreground">Closing Soon</p>
              </div>
            </>
          )}
        </div>

        {/* Search */}
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
          <Button
            variant="outline"
            size="default"
            className="gap-2 shrink-0"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="!size-4" /> Filters <ChevronDown className={`!size-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="max-w-2xl mx-auto rounded-xl border bg-card p-4">
            {tab === "work" ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-semibold mb-2 text-muted-foreground uppercase">Role Type</p>
                  {["Full-time", "Contract", "Part-time"].map(t => (
                    <label key={t} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                      <input type="checkbox" className="rounded border-border" /> {t}
                    </label>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold mb-2 text-muted-foreground uppercase">Experience</p>
                  {["Entry", "Mid", "Senior"].map(t => (
                    <label key={t} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                      <input type="checkbox" className="rounded border-border" /> {t}
                    </label>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold mb-2 text-muted-foreground uppercase">Salary</p>
                  {["$25k+", "$50k+", "$75k+"].map(t => (
                    <label key={t} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                      <input type="checkbox" className="rounded border-border" /> {t}
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold mb-2 text-muted-foreground uppercase">Region</p>
                  {["Africa", "Europe", "Asia", "Americas"].map(t => (
                    <label key={t} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                      <input type="checkbox" className="rounded border-border" /> {t}
                    </label>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold mb-2 text-muted-foreground uppercase">Program</p>
                  {["Computer Science", "AI & Data", "Business"].map(t => (
                    <label key={t} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                      <input type="checkbox" className="rounded border-border" /> {t}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        {tab === "work" ? (
          <div className="grid gap-4 max-w-4xl mx-auto">
            {filteredJobs.map((job, i) => (
              <div key={i} className="rounded-md border bg-card p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-xl uppercase tracking-tight">{job.title}</h3>
                      <button
                        onClick={() => toggleSave(i)}
                        className={`p-1 rounded hover:bg-muted transition-colors ${savedJobs.has(i) ? "text-secondary" : "text-muted-foreground"}`}
                      >
                        <BookmarkPlus className="size-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1 pb-1">
                      <div className="flex items-center gap-2 mr-4">
                        <div className="w-6 h-6 rounded border border-border bg-accent flex items-center justify-center font-bold text-[10px] uppercase">{job.company.substring(0, 1)}</div>
                        <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {job.skills.map((s) => (
                        <span key={s} className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm border bg-accent/30 text-muted-foreground font-bold">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                    <div className="flex items-center gap-1 text-sm font-mono font-bold tracking-widest text-secondary">
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {job.type}</span>
                      <span className="flex items-center gap-1"><MapPin className="size-3" /> {job.location}</span>
                    </div>
                    <Button size="sm" className="mt-2 font-mono text-xs font-bold tracking-widest uppercase rounded-sm w-full md:w-auto">Apply Now</Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredJobs.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg font-medium">No jobs found</p>
                <p className="text-sm">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {filteredUnis.map((uni, i) => (
              <div key={i} className="rounded-md border bg-card p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-sm bg-secondary/10 flex items-center justify-center overflow-hidden border border-secondary/20 relative">
                    <img src={`https://flagcdn.com/w40/${uni.flag}.png`} alt={uni.country} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-secondary/10 mix-blend-multiply" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-muted-foreground">
                    <Star className="size-3 fill-secondary text-secondary" /> {uni.rating}
                  </div>
                </div>
                <h3 className="font-bold text-xl uppercase tracking-tight leading-tight mb-2">{uni.name}</h3>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">{uni.country}</p>
                <p className="text-sm font-medium text-primary mb-4">{uni.program}</p>
                <div className="mt-auto pt-4 border-t">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Deadline: {uni.deadline}</p>
                  <div className="flex gap-3">
                    <Button size="sm" className="flex-1 font-mono text-xs font-bold tracking-widest uppercase rounded-sm">Apply</Button>
                    <Button size="sm" variant="outline" className="font-mono text-xs font-bold tracking-widest uppercase rounded-sm">Details</Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredUnis.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <p className="text-lg font-medium">No programs found</p>
                <p className="text-sm">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Global;
