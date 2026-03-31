import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, MapPin, DollarSign, Clock, GraduationCap, Briefcase, ArrowLeft, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const jobs = [
  { title: "Senior UI/UX Designer", company: "TechNova Inc.", salary: "$60k – $85k", type: "Full-time", level: "Senior", skills: ["Figma", "Design Systems", "Prototyping"], location: "Remote – Global" },
  { title: "AI Content Specialist", company: "ContentLab", salary: "$40k – $55k", type: "Contract", level: "Mid", skills: ["ChatGPT", "Copywriting", "SEO"], location: "Remote – Africa" },
  { title: "Full-Stack Developer", company: "BuildStack", salary: "$70k – $100k", type: "Full-time", level: "Senior", skills: ["React", "Node.js", "AWS"], location: "Remote – Global" },
  { title: "Virtual Assistant", company: "ScaleOps", salary: "$25k – $35k", type: "Part-time", level: "Entry", skills: ["Admin", "Scheduling", "CRM"], location: "Remote – Global" },
  { title: "Data Analyst", company: "InsightAI", salary: "$50k – $70k", type: "Full-time", level: "Mid", skills: ["Python", "SQL", "Tableau"], location: "Remote – Europe/Africa" },
];

const universities = [
  { name: "University of Cape Town", country: "🇿🇦 South Africa", program: "Computer Science", deadline: "Mar 2026" },
  { name: "Technical University of Munich", country: "🇩🇪 Germany", program: "Data Science & AI", deadline: "Apr 2026" },
  { name: "University of Toronto", country: "🇨🇦 Canada", program: "Business Analytics", deadline: "May 2026" },
  { name: "National University of Singapore", country: "🇸🇬 Singapore", program: "Information Systems", deadline: "Jun 2026" },
  { name: "University of Edinburgh", country: "🇬🇧 United Kingdom", program: "Artificial Intelligence", deadline: "Apr 2026" },
  { name: "KAIST", country: "🇰🇷 South Korea", program: "Software Engineering", deadline: "May 2026" },
];

const Global = () => {
  const [tab, setTab] = useState<"work" | "study">("work");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b bg-card sticky top-0 z-40 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Star9" className="h-8 w-auto" />
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="gap-1 text-muted-foreground">
              <ArrowLeft className="!size-3" /> Back
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-muted relative">
            <Bell className="size-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
            EN
          </div>
        </div>
      </header>

      <div className="container py-8 space-y-8">
        {/* Hero */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold">Star9 Global</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Premium remote opportunities and international academic programs, curated for global talent.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-xl border bg-muted p-1">
            <button
              onClick={() => setTab("work")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === "work" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
              }`}
            >
              <Briefcase className="size-4" /> Remote Work
            </button>
            <button
              onClick={() => setTab("study")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === "study" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
              }`}
            >
              <GraduationCap className="size-4" /> Study Abroad
            </button>
          </div>
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
          <Button variant="outline" size="default" className="gap-2 shrink-0">
            <Filter className="!size-4" /> Filters
          </Button>
        </div>

        {/* Content */}
        {tab === "work" ? (
          <div className="grid gap-4 max-w-4xl mx-auto">
            {jobs.filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))).map((job, i) => (
              <div key={i} className="rounded-xl border bg-card p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((s) => (
                        <span key={s} className="text-xs px-2 py-1 rounded-md bg-accent text-accent-foreground font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                    <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                      <DollarSign className="size-4" /> {job.salary}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {job.type}</span>
                      <span className="flex items-center gap-1"><MapPin className="size-3" /> {job.location}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{job.level}</span>
                    <Button size="sm" className="mt-1">Apply Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {universities.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.program.toLowerCase().includes(searchQuery.toLowerCase())).map((uni, i) => (
              <div key={i} className="rounded-xl border bg-card p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
                <div className="text-2xl mb-3">{uni.country.split(" ")[0]}</div>
                <h3 className="font-semibold mb-1">{uni.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{uni.country}</p>
                <p className="text-sm font-medium text-primary mb-1">{uni.program}</p>
                <p className="text-xs text-muted-foreground mb-4">Deadline: {uni.deadline}</p>
                <Button size="sm" className="mt-auto self-start">Apply Now</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Global;
